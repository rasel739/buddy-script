'use client';
import { FC, useState } from 'react';
import Image from 'next/image';
import Icons from '@/lib/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateComment, deleteComment, toggleCommentLike } from '@/redux/features/commentSlice';
import toast from 'react-hot-toast';
import Reply from './reply';
import moment from 'moment';

interface CommentSectionProps {
  comment: {
    id: string;
    content: string;
    postId: string;
    author: {
      id: string;
      fullName: string;
      email: string;
      image?: string;
    };
    likesCount: number;
    repliesCount: number;
    isLiked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

const CommentSection: FC<CommentSectionProps> = ({ comment }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { replies } = useAppSelector((state) => state.reply);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showReplies, setShowReplies] = useState(false);

  const commentReplies = replies[comment.id] || [];
  const totalReplies = commentReplies.length || comment.repliesCount;

  const handleUpdate = async () => {
    if (!editContent.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    try {
      const result = await dispatch(
        updateComment({
          commentId: comment.id,
          content: editContent,
        })
      );

      if (updateComment.fulfilled.match(result)) {
        toast.success('Comment updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update comment';
      toast.error(errorMessage);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      const result = await dispatch(
        deleteComment({
          commentId: comment.id,
          postId: comment.postId,
        })
      );

      if (deleteComment.fulfilled.match(result)) {
        toast.success('Comment deleted successfully');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update comment';
      toast.error(errorMessage);
    }
  };

  const handleToggleLike = async () => {
    try {
      await dispatch(
        toggleCommentLike({
          commentId: comment.id,
          postId: comment.postId,
        })
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to toggle like';
      toast.error(errorMessage);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const toggleRepliesVisibility = () => {
    setShowReplies(!showReplies);
  };

  return (
    <div className='_comment_wrapper' style={{ marginBottom: '24px' }}>
      <div className='_comment_main'>
        <div className='_comment_image'>
          <Image
            src={'/images/txt_img.png'}
            alt={comment.author.fullName}
            className='_comment_img1'
            width={52}
            height={52}
          />
        </div>
        <div className='_comment_area'>
          <div className='_comment_details'>
            <div className='_comment_details_top'>
              <div className='_comment_name'>
                <h4 className='_comment_name_title'>{comment.author.fullName}</h4>
              </div>
            </div>

            {isEditing ? (
              <div style={{ marginTop: '8px' }}>
                <textarea
                  className='form-control _comment_textarea'
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={3}
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
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='btn btn-sm btn-primary'
                    onClick={handleUpdate}
                    disabled={!editContent.trim()}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className='_comment_status'>
                <p className='_comment_status_text'>
                  <span>{comment.content}</span>
                </p>
              </div>
            )}

            {comment.likesCount > 0 && (
              <div className='_total_reactions'>
                <div className='_total_react'>
                  <span className='_reaction_like'>
                    <Icons.Like />
                  </span>
                </div>
                <span className='_total'>{comment.likesCount}</span>
              </div>
            )}

            <div className='mt-2'>
              <ul className='list-inline d-flex flex-wrap gap-3 mb-0 small text-secondary'>
                <li className='list-inline-item'>
                  <button
                    onClick={handleToggleLike}
                    className={`btn btn-link p-0 text-decoration-none ${
                      comment.isLiked ? 'text-primary fw-semibold' : 'text-secondary'
                    }`}
                  >
                    {comment.isLiked ? 'Liked' : 'Like'}
                  </button>
                </li>

                <li className='list-inline-item'>
                  <button
                    onClick={toggleRepliesVisibility}
                    className='btn btn-link p-0 text-decoration-none text-secondary'
                  >
                    Reply {totalReplies > 0 && `(${totalReplies})`}
                  </button>
                </li>

                {user?.id === comment.author.id && (
                  <>
                    <li className='list-inline-item'>
                      <button
                        onClick={() => setIsEditing(true)}
                        className='btn btn-link p-0 text-decoration-none text-secondary'
                      >
                        Edit
                      </button>
                    </li>

                    <li className='list-inline-item'>
                      <button
                        onClick={handleDelete}
                        className='btn btn-link p-0 text-decoration-none text-danger'
                      >
                        Delete
                      </button>
                    </li>
                  </>
                )}

                <li className='list-inline-item text-muted'>
                  {moment(comment.createdAt).fromNow()}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Reply commentId={comment.id} showReplies={showReplies} />
    </div>
  );
};

export default CommentSection;
