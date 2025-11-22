'use client';

import { FC } from 'react';
import StoryCarousel from './story-carousel';
import CreatePost from './create-post';
import PostCard from './post-card';
import { Post } from '@/types';

const FeedContent: FC = () => {
  const posts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Karim Saif',
        image: '/images/post_img.png',
      },
      timeAgo: '5 minute ago',
      privacy: 'Public',
      title: '-Healthy Tracking App',
      image: '/images/timeline_img.png',
      reactions: {
        count: 9,
        types: ['haha', 'like', 'love'],
      },
      comments: 12,
      shares: 122,
    },
    {
      id: '2',
      author: {
        name: 'Karim Saif',
        image: '/images/post_img.png',
      },
      timeAgo: '5 minute ago',
      privacy: 'Public',
      title: '-Healthy Tracking App',
      image: '/images/timeline_img.png',
      reactions: {
        count: 9,
        types: ['haha', 'like', 'love'],
      },
      comments: 12,
      shares: 122,
    },
  ];

  return (
    <div className='_layout_middle_wrap'>
      <div className='_layout_middle_inner'>
        <StoryCarousel />
        <CreatePost />
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeedContent;
