'use client';
import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import Icons from '@/lib/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchReplies,
  createReply,
  updateReply,
  deleteReply,
  toggleReplyLike,
} from '@/redux/features/replySlice';
import toast from 'react-hot-toast';

interface ReplyProps {
  commentId: string;
  showReplies: boolean;
}

const Reply: FC<ReplyProps> = ({ commentId, showReplies }) => {
  const dispatch = useAppDispatch();
  const { replies, isLoading } = useAppSelector((state) => state.reply);
  const { user } = useAppSelector((state) => state.auth);

  const [replyText, setReplyText] = useState('');
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const commentReplies = replies[commentId] || [];

  useEffect(() => {
    if (showReplies && !replies[commentId]) {
      dispatch(fetchReplies(commentId));
    }
  }, [showReplies, commentId, dispatch, replies]);

  const handleCreateReply = async () => {
    if (!replyText.trim()) {
      toast.error('Please write a reply');
      return;
    }

    try {
      const result = await dispatch(
        createReply({
          commentId,
          content: replyText,
        })
      );

      if (createReply.fulfilled.match(result)) {
        toast.success('Reply added successfully');
        setReplyText('');
        setShowReplyForm(false);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to toggle like';
      toast.error(errorMessage);
    }
  };

  const handleUpdateReply = async (replyId: string) => {
    if (!editContent.trim()) {
      toast.error('Reply cannot be empty');
      return;
    }

    try {
      const result = await dispatch(
        updateReply({
          replyId,
          content: editContent,
          commentId,
        })
      );

      if (updateReply.fulfilled.match(result)) {
        toast.success('Reply updated successfully');
        setEditingReplyId(null);
        setEditContent('');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to toggle like';
      toast.error(errorMessage);
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    if (!window.confirm('Are you sure you want to delete this reply?')) {
      return;
    }

    try {
      const result = await dispatch(deleteReply({ replyId, commentId }));

      if (deleteReply.fulfilled.match(result)) {
        toast.success('Reply deleted successfully');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to toggle like';
      toast.error(errorMessage);
    }
  };

  const handleToggleLike = async (replyId: string) => {
    try {
      await dispatch(toggleReplyLike({ replyId, commentId }));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to toggle like';
      toast.error(errorMessage);
    }
  };

  const startEdit = (replyId: string, content: string) => {
    setEditingReplyId(replyId);
    setEditContent(content);
  };

  const cancelEdit = () => {
    setEditingReplyId(null);
    setEditContent('');
  };

  if (!showReplies) {
    return null;
  }

  return (
    <div className='_reply_section' style={{ marginLeft: '60px', marginTop: '16px' }}>
      {showReplyForm ? (
        <div className='_reply_form' style={{ marginBottom: '16px' }}>
          <div className='_feed_inner_comment_box'>
            <form className='_feed_inner_comment_box_form' onSubmit={(e) => e.preventDefault()}>
              <div className='_feed_inner_comment_box_content'>
                <div className='_feed_inner_comment_box_content_image'>
                  <Image
                    src={'/images/comment_img.png'}
                    alt='Profile'
                    className='_comment_img'
                    width={40}
                    height={40}
                  />
                </div>
                <div className='_feed_inner_comment_box_content_txt'>
                  <textarea
                    className='form-control _comment_textarea'
                    placeholder='Write a reply...'
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '8px',
                  justifyContent: 'flex-end',
                }}
              >
                <button
                  type='button'
                  className='btn btn-sm btn-secondary'
                  onClick={() => {
                    setShowReplyForm(false);
                    setReplyText('');
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-sm btn-primary'
                  onClick={handleCreateReply}
                  disabled={isLoading || !replyText.trim()}
                >
                  {isLoading ? 'Posting...' : 'Reply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          type='button'
          className='btn btn-link btn-sm'
          onClick={() => setShowReplyForm(true)}
          style={{ padding: '0', marginBottom: '16px' }}
        >
          Write a reply...
        </button>
      )}

      {isLoading && commentReplies.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading replies...</div>
      ) : (
        commentReplies.map((reply) => (
          <div key={reply.id} className='_reply_item' style={{ marginBottom: '20px' }}>
            <div className='_comment_main'>
              <div className='_comment_image'>
                <Image
                  src={'/images/txt_img.png'}
                  alt={reply.author.fullName}
                  className='_comment_img1'
                  width={40}
                  height={40}
                />
              </div>
              <div className='_comment_area'>
                <div className='_comment_details'>
                  <div className='_comment_details_top'>
                    <div className='_comment_name'>
                      <h4 className='_comment_name_title'>{reply.author.fullName}</h4>
                    </div>
                  </div>

                  {editingReplyId === reply.id ? (
                    <div style={{ marginTop: '8px' }}>
                      <textarea
                        className='form-control _comment_textarea'
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={2}
                      />
                      <div
                        style={{
                          display: 'flex',
                          gap: '8px',
                          marginTop: '8px',
                        }}
                      >
                        <button
                          type='button'
                          className='btn btn-sm btn-secondary'
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                        <button
                          type='button'
                          className='btn btn-sm btn-primary'
                          onClick={() => handleUpdateReply(reply.id)}
                          disabled={!editContent.trim()}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='_comment_status'>
                      <p className='_comment_status_text'>
                        <span>{reply.content}</span>
                      </p>
                    </div>
                  )}

                  {reply.likesCount > 0 && (
                    <div className='_total_reactions'>
                      <div className='_total_react'>
                        <span className='_reaction_like'>
                          <Icons.Like />
                        </span>
                      </div>
                      <span className='_total'>{reply.likesCount}</span>
                    </div>
                  )}

                  <div className='_comment_reply'>
                    <div className='_comment_reply_num'>
                      <ul className='_comment_reply_list'>
                        <li>
                          <span
                            onClick={() => handleToggleLike(reply.id)}
                            style={{ cursor: 'pointer', color: reply.isLiked ? '#1890FF' : '' }}
                          >
                            {reply.isLiked ? 'Liked' : 'Like'}
                          </span>
                        </li>

                        {user?.id === reply.author.id && (
                          <>
                            <li>
                              <span
                                onClick={() => startEdit(reply.id, reply.content)}
                                style={{ cursor: 'pointer' }}
                              >
                                Edit
                              </span>
                            </li>
                            <li>
                              <span
                                onClick={() => handleDeleteReply(reply.id)}
                                style={{ cursor: 'pointer' }}
                              >
                                Delete
                              </span>
                            </li>
                          </>
                        )}

                        <li>
                          <span className='_time_link'>
                            {new Date(reply.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {commentReplies.length === 0 && !isLoading && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          No replies yet. Be the first to reply!
        </div>
      )}
    </div>
  );
};

export default Reply;
