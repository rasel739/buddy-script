'use client';
import { FC, useState } from 'react';

import Image from 'next/image';
import TimelineDropdown from '../ui/timeline-dropdown';
import TotalReaction from './total-react';
import ReactionButtonList from './reaction-button-list';
import CommentsList from './comment-list';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleLike, deletePost } from '@/redux/features/postSlice';
import toast from 'react-hot-toast';
import moment from 'moment';
import PrivacyDropdown from '../auth/privacy-dropdown';

interface PostCardProps {
  post: {
    id: string;
    content?: string;
    imageUrl?: string;
    isPrivate: boolean;
    author: {
      id: string;
      fullName: string;
      email: string;
    };
    likesCount: number;
    commentsCount: number;
    sharesCount?: number;
    isLiked: boolean;
    createdAt: string;
    timeAgo?: string;
    privacy?: string;
    title?: string;
    reactions?: {
      count: number;
      types: string[];
    };
    comments?: number;
    shares?: number;
  };
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [reacted, setReacted] = useState(post.isLiked);

  const handleReaction = async () => {
    setReacted(!reacted);

    try {
      await dispatch(toggleLike(post.id));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update reaction';
      setReacted(!reacted);
      toast.error(errorMessage);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this post',
          text: post.content,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.log('Share failed:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const result = await dispatch(deletePost(post.id));
      if (deletePost.fulfilled.match(result)) {
        toast.success('Post deleted successfully');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete post';
      toast.error(errorMessage);
    }
  };

  const displayReactionCount = post.likesCount || post.reactions?.count || 0;
  const displayCommentsCount = post.commentsCount || post.comments || 0;
  const displaySharesCount = post.sharesCount || post.shares || 0;

  return (
    <div className='_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16'>
      <div className='_feed_inner_timeline_content _padd_r24 _padd_l24'>
        <div className='_feed_inner_timeline_post_top'>
          <div className='_feed_inner_timeline_post_box'>
            <div className='_feed_inner_timeline_post_box_image'>
              <Image
                src={'/images/post_img.png'}
                alt={post.author.fullName}
                className='_post_img'
                width={44}
                height={44}
              />
            </div>
            <div className='_feed_inner_timeline_post_box_txt'>
              <h4 className='_feed_inner_timeline_post_box_title'>{post.author.fullName}</h4>
              <p className='_feed_inner_timeline_post_box_para d-flex align-items-center gap-1'>
                <span>{moment(post.createdAt).fromNow()} •</span>
                {user?.id === post.author.id ? (
                  <PrivacyDropdown isPrivate={post.isPrivate} postId={post.id} />
                ) : (
                  ''
                )}
              </p>
            </div>
          </div>
          <TimelineDropdown onDelete={handleDelete} userId={post.author.id} />
        </div>

        {post.content && <h4 className='_feed_inner_timeline_post_title'>{post.content}</h4>}

        {post.imageUrl && (
          <div className='_feed_inner_timeline_image'>
            <Image
              src={post.imageUrl}
              alt='Post content'
              className='_time_img'
              width={1200}
              height={790}
            />
          </div>
        )}
      </div>

      <div className='_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26'>
        <TotalReaction count={displayReactionCount} />
        <div className='_feed_inner_timeline_total_reacts_txt'>
          <p className='_feed_inner_timeline_total_reacts_para2'>
            <span>{displaySharesCount}</span> Share
          </p>
        </div>
      </div>

      <ReactionButtonList
        handleReaction={handleReaction}
        handleShare={handleShare}
        handleComment={() => {}}
        reacted={reacted}
      />

      <CommentsList postId={post.id} commentsCount={displayCommentsCount} />
    </div>
  );
};

export default PostCard;
