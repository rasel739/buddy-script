'use client';
import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import Icons from '@/lib/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchComments, createComment } from '@/redux/features/commentSlice';
import toast from 'react-hot-toast';
import CommentSection from './comment-section';

interface CommentsListProps {
  postId: string;
  commentsCount?: number;
}

const CommentsList: FC<CommentsListProps> = ({ postId, commentsCount = 0 }) => {
  const dispatch = useAppDispatch();
  const { comments, isLoading } = useAppSelector((state) => state.comment);

  const [showComments, setShowComments] = useState(true);
  const [commentText, setCommentText] = useState('');

  const postComments = comments[postId] || [];

  useEffect(() => {
    if (showComments && !comments[postId]) {
      dispatch(fetchComments(postId));
    }
  }, [showComments, postId, dispatch, comments]);

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) {
      toast.error('Please write a comment');
      return;
    }

    try {
      const result = await dispatch(
        createComment({
          postId,
          content: commentText,
        })
      );

      if (createComment.fulfilled.match(result)) {
        toast.success('Comment added successfully');
        setCommentText('');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add comment';
      toast.error(errorMessage);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const displayCount = postComments.length || commentsCount;

  return (
    <div className='_comments_wrapper'>
      <div className='_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26'>
        <div className='_feed_inner_timeline_total_reacts_txt'>
          <p className='_feed_inner_timeline_total_reacts_para1'>
            <button
              onClick={toggleComments}
              className='text-decoration-none'
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span>{displayCount}</span> Comment{displayCount !== 1 ? 's' : ''}
            </button>
          </p>
        </div>
      </div>

      {showComments && (
        <>
          <div className='_feed_inner_timeline_cooment_area'>
            <div className='_feed_inner_comment_box'>
              <form className='_feed_inner_comment_box_form' onSubmit={handleCreateComment}>
                <div className='_feed_inner_comment_box_content'>
                  <div className='_feed_inner_comment_box_content_image'>
                    <Image
                      src={'/images/comment_img.png'}
                      alt='Profile'
                      className='_comment_img'
                      width={52}
                      height={52}
                    />
                  </div>
                  <div className='_feed_inner_comment_box_content_txt'>
                    <textarea
                      className='form-control _comment_textarea'
                      placeholder='Write a comment'
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      disabled={isLoading}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleCreateComment(e);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className='_feed_inner_comment_box_icon'>
                  <button
                    className='_feed_inner_comment_box_icon_btn'
                    type='button'
                    disabled={isLoading}
                  >
                    <Icons.Voice />
                  </button>
                  <button
                    className='_feed_inner_comment_box_icon_btn'
                    type='button'
                    disabled={isLoading}
                  >
                    <Icons.Photo2 />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className='_timline_comment_main'>
            {isLoading && postComments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>Loading comments...</div>
            ) : postComments.length > 0 ? (
              <>
                {postComments.length > 4 && (
                  <div className='_previous_comment'>
                    <button type='button' className='_previous_comment_txt'>
                      View {postComments.length - 4} previous comments
                    </button>
                  </div>
                )}
                {postComments.map((comment) => (
                  <CommentSection key={comment.id} comment={comment} />
                ))}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentsList;
