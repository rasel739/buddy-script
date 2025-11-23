'use client';
import { FC, useState } from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import Image from 'next/image';
import Icons from '@/lib/icons';
import TimelineDropdown from '../ui/timeline-dropdown';
import TotalReaction from './total-react';
import ReactionButtonList from './reaction-button-list';

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const [reacted, setReacted] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');

  const handleReaction = () => {
    setReacted(!reacted);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      console.log('Comment:', commentText);
      setCommentText('');
    }
  };

  const handleShare = () => {
    console.log('Share clicked');
  };

  return (
    <div className='_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16'>
      <div className='_feed_inner_timeline_content _padd_r24 _padd_l24'>
        <div className='_feed_inner_timeline_post_top'>
          <div className='_feed_inner_timeline_post_box'>
            <div className='_feed_inner_timeline_post_box_image'>
              <Image
                src={post.author.image}
                alt={post.author.name}
                className='_post_img'
                width={1200}
                height={790}
              />
            </div>
            <div className='_feed_inner_timeline_post_box_txt'>
              <h4 className='_feed_inner_timeline_post_box_title'>{post.author.name}</h4>
              <p className='_feed_inner_timeline_post_box_para'>
                {post.timeAgo} .<Link href='#'>{post.privacy}</Link>
              </p>
            </div>
          </div>
          <TimelineDropdown />
        </div>

        {/* Post Content */}
        {post.title && <h4 className='_feed_inner_timeline_post_title'>{post.title}</h4>}
        {post.image && (
          <div className='_feed_inner_timeline_image'>
            <Image
              src={post.image}
              alt='Post content'
              className='_time_img'
              width={1200}
              height={790}
            />
          </div>
        )}
      </div>

      {/* Reactions Summary */}
      <div className='_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26'>
        <TotalReaction count={post.reactions.count} />
        <div className='_feed_inner_timeline_total_reacts_txt'>
          <p className='_feed_inner_timeline_total_reacts_para1'>
            <Link href='#' className='text-decoration-none'>
              <span>{post.comments}</span> Comment
            </Link>
          </p>
          <p className='_feed_inner_timeline_total_reacts_para2'>
            <span>{post.shares}</span> Share
          </p>
        </div>
      </div>

      {/* Reaction Buttons */}
      <ReactionButtonList
        handleReaction={handleReaction}
        handleShare={handleShare}
        handleComment={handleComment}
        reacted={reacted}
      />

      {/* Comment Section */}
      <div className='_feed_inner_timeline_cooment_area'>
        <div className='_feed_inner_comment_box'>
          <form className='_feed_inner_comment_box_form' onSubmit={(e) => e.preventDefault()}>
            <div className='_feed_inner_comment_box_content'>
              <div className='_feed_inner_comment_box_content_image'>
                <Image
                  src='/images/comment_img.png'
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
                />
              </div>
            </div>
            <div className='_feed_inner_comment_box_icon'>
              <button className='_feed_inner_comment_box_icon_btn' type='button'>
                <Icons.Voice />
              </button>
              <button className='_feed_inner_comment_box_icon_btn' type='button'>
                <Icons.Photo2 />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Previous Comments */}
      <div className='_timline_comment_main'>
        <div className='_previous_comment'>
          <button type='button' className='_previous_comment_txt'>
            View 4 previous comments
          </button>
        </div>
        <div className='_comment_main'>
          <div className='_comment_image'>
            <Link href='/profile' className='_comment_image_link'>
              <Image
                src='/images/txt_img.png'
                alt='Profile'
                className='_comment_img1'
                width={52}
                height={52}
              />
            </Link>
          </div>
          <div className='_comment_area'>
            <div className='_comment_details'>
              <div className='_comment_details_top'>
                <div className='_comment_name'>
                  <Link href='/profile' className='text-decoration-none'>
                    <h4 className='_comment_name_title'>Radovan SkillArena</h4>
                  </Link>
                </div>
              </div>
              <div className='_comment_status'>
                <p className='_comment_status_text'>
                  <span>
                    It is a long established fact that a reader will be distracted by the readable
                    content of a page when looking at its layout.
                  </span>
                </p>
              </div>
              <div className='_total_reactions'>
                <div className='_total_react'>
                  <span className='_reaction_like'>
                    <Icons.Like />
                  </span>
                  <span className='_reaction_heart'>
                    <Icons.Love />
                  </span>
                </div>
                <span className='_total'>198</span>
              </div>
              <div className='_comment_reply'>
                <div className='_comment_reply_num'>
                  <ul className='_comment_reply_list'>
                    <li>
                      <span>Like.</span>
                    </li>
                    <li>
                      <span>Reply.</span>
                    </li>
                    <li>
                      <span>Share</span>
                    </li>
                    <li>
                      <span className='_time_link'>.21m</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
