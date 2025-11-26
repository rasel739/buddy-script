'use client';
import { FC, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Icons from '@/lib/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updatePost } from '@/redux/features/postSlice';
import toast from 'react-hot-toast';
import PrivacyDropdown from '../auth/privacy-dropdown';

interface EditPostProps {
  post: {
    id: string;
    content?: string;
    isPrivate?: boolean;
    author: {
      id: string;
      name: string;
    };
  };
  show: boolean;
  onClose: () => void;
}

const EditPost: FC<EditPostProps> = ({ post, show, onClose }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.post);
  const { user } = useAppSelector((state) => state.auth);

  const [postContent, setPostContent] = useState(post.content || '');
  const [isPrivate, setIsPrivate] = useState(post.isPrivate || false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPostContent(post.content || '');
    setIsPrivate(post.isPrivate || false);
  }, [post]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && event.target === modalRef.current) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [show, onClose]);

  const handleUpdate = async () => {
    if (!postContent.trim()) {
      toast.error('Post content cannot be empty');
      return;
    }

    try {
      const result = await dispatch(
        updatePost({
          postId: post.id,
          data: {
            content: postContent,
            isPrivate: isPrivate,
          },
        })
      );

      if (updatePost.fulfilled.match(result)) {
        toast.success('Post updated successfully!');
        onClose();
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update post';
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    setPostContent(post.content || '');
    setIsPrivate(post.isPrivate || false);
    onClose();
  };

  if (!show) return null;

  return (
    <>
      <div
        ref={modalRef}
        className={`modal fade ${show ? 'show' : ''}`}
        style={{
          display: show ? 'block' : 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        tabIndex={-1}
        role='dialog'
        aria-labelledby='editPostModalLabel'
        aria-hidden={!show}
      >
        <div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
          <div className='modal-content' style={{ borderRadius: '12px' }}>
            <div className='modal-header' style={{ borderBottom: '1px solid #e0e0e0' }}>
              <h5 className='modal-title' id='editPostModalLabel' style={{ fontWeight: 600 }}>
                Edit Post
              </h5>
              <button
                type='button'
                className='btn-close'
                onClick={handleCancel}
                aria-label='Close'
                disabled={isLoading}
              />
            </div>

            <div className='modal-body' style={{ padding: '24px' }}>
              <div className='d-flex align-items-center mb-3'>
                <div style={{ marginRight: '12px' }}>
                  <Image
                    src={'/images/txt_img.png'}
                    alt='Profile'
                    width={48}
                    height={48}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                  />
                </div>
                <div className='grow'>
                  <h6 className='mb-0' style={{ fontWeight: 600, fontSize: '15px' }}>
                    {user?.name || post.author.name}
                  </h6>
                  <PrivacyDropdown isPrivate={post.isPrivate as boolean} postId={post.id} />
                </div>
              </div>

              <div className='mb-3'>
                <textarea
                  className='form-control'
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  disabled={isLoading}
                  rows={6}
                  style={{
                    border: 'none',
                    fontSize: '16px',
                    resize: 'none',
                    padding: '12px 0',
                  }}
                />
              </div>

              <div
                className='border rounded p-3'
                style={{
                  backgroundColor: '#f7f8fa',
                  borderColor: '#e0e0e0 !important',
                }}
              >
                <div className='d-flex justify-content-between align-items-center'>
                  <span style={{ fontWeight: 500, fontSize: '14px', color: '#050505' }}>
                    Add to your post
                  </span>
                  <div className='d-flex gap-2'>
                    <button
                      type='button'
                      className='btn btn-sm'
                      disabled
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        padding: '6px',
                        opacity: 0.5,
                        cursor: 'not-allowed',
                      }}
                      title='Photo editing not available'
                    >
                      <Icons.Photo />
                    </button>
                    <button
                      type='button'
                      className='btn btn-sm'
                      disabled
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        padding: '6px',
                        opacity: 0.5,
                        cursor: 'not-allowed',
                      }}
                      title='Video editing not available'
                    >
                      <Icons.Video />
                    </button>
                    <button
                      type='button'
                      className='btn btn-sm'
                      disabled
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        padding: '6px',
                        opacity: 0.5,
                        cursor: 'not-allowed',
                      }}
                      title='Event editing not available'
                    >
                      <Icons.Event />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className='modal-footer'
              style={{ borderTop: '1px solid #e0e0e0', padding: '16px 24px' }}
            >
              <button
                type='button'
                className='btn btn-secondary'
                onClick={handleCancel}
                disabled={isLoading}
                style={{
                  padding: '10px 24px',
                  fontWeight: 500,
                  fontSize: '15px',
                }}
              >
                Cancel
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleUpdate}
                disabled={isLoading || !postContent.trim()}
                style={{
                  padding: '10px 32px',
                  fontWeight: 500,
                  fontSize: '15px',
                  backgroundColor: '#1890FF',
                  border: 'none',
                }}
              >
                {isLoading ? (
                  <>
                    <span
                      className='spinner-border spinner-border-sm me-2'
                      role='status'
                      aria-hidden='true'
                    />
                    Updating...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
