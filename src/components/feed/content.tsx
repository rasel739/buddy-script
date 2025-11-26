'use client';

import { FC, useEffect } from 'react';
import StoryCarousel from './story-carousel';
import CreatePost from './create-post';
import PostCard from './post-card';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchPosts } from '@/redux/features/postSlice';
import Button from '../ui/button';

const FeedContent: FC = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoading, hasMore, nextCursor, error } = useAppSelector((state) => state.post);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts({}));
    }
  }, [dispatch, posts.length]);

  const handleLoadMore = () => {
    if (nextCursor && hasMore && !isLoading) {
      dispatch(fetchPosts({ cursor: nextCursor }));
    }
  };

  return (
    <div className='_layout_middle_wrap'>
      <div className='_layout_middle_inner'>
        <StoryCarousel />
        <CreatePost />

        {error && posts.length === 0 && (
          <div className='_feed_inner_area _padd_24 text-center'>
            <p className='text-danger'>{error}</p>
            <Button variant='primary' onClick={() => dispatch(fetchPosts({}))} className='_mar_t16'>
              Retry
            </Button>
          </div>
        )}

        {posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            {hasMore && (
              <div className='text-center _mar_t24 _mar_b24'>
                <Button
                  variant='primary'
                  onClick={handleLoadMore}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Load More Posts'}
                </Button>
              </div>
            )}

            {!hasMore && posts.length > 0 && (
              <div className='text-center _mar_t24 _mar_b24'>
                <p className='text-muted'>{"You've reached the end of the feed"}</p>
              </div>
            )}
          </>
        ) : (
          !isLoading &&
          !error && (
            <div className='_feed_inner_area _padd_24 text-center'>
              <p className='text-muted'>No posts yet. Be the first to share something!</p>
            </div>
          )
        )}

        {isLoading && posts.length === 0 && (
          <div className='_feed_inner_area _padd_24 text-center'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
            <p className='text-muted _mar_t16'>Loading posts...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedContent;
