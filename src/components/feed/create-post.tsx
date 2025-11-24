'use client';
import { FC, useState } from 'react';
import Button from '../ui/button';
import Icons from '@/lib/icons';
import Image from 'next/image';

const CreatePost: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>('');

  const handlePost = () => {
    setLoading(true);
    if (postContent.trim()) {
      console.log('Post content:', postContent);
      setPostContent('');
      setLoading(false);
    }
  };

  const handlePhotoClick = () => {
    console.log('Photo clicked');
  };

  const handleVideoClick = () => {
    console.log('Video clicked');
  };

  const handleEventClick = () => {
    console.log('Event clicked');
  };

  const handleArticleClick = () => {
    console.log('Article clicked');
  };

  const actions = [
    {
      id: 'photo',
      icon: <Icons.Photo />,
      label: 'Photo',
      onClick: handlePhotoClick,
    },
    {
      id: 'video',
      icon: <Icons.Video />,
      label: 'Video',
      onClick: handleVideoClick,
    },
    {
      id: 'event',
      icon: <Icons.Event />,
      label: 'Event',
      onClick: handleEventClick,
    },
    {
      id: 'article',
      icon: <Icons.Article />,
      label: 'Article',
      onClick: handleArticleClick,
    },
  ];

  return (
    <div className='_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16'>
      <div className='_feed_inner_text_area_box'>
        <div className='_feed_inner_text_area_box_image'>
          <Image
            src='/images/txt_img.png'
            alt='Profile'
            className='_txt_img'
            width={80}
            height={80}
          />
        </div>
        <div className='form-floating _feed_inner_text_area_box_form'>
          <textarea
            className='form-control _textarea'
            placeholder='Leave a comment here'
            id='floatingTextarea'
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <label className='_feed_textarea_label' htmlFor='floatingTextarea'>
            Write something ...
            <Icons.Pen />
          </label>
        </div>
      </div>

      {/* Desktop */}
      <div className='_feed_inner_text_area_bottom'>
        <div className='_feed_inner_text_area_item'>
          {actions.map((item) => (
            <div key={item.id} className={`_feed_inner_text_area_bottom_${item.id} _feed_common`}>
              <Button
                variant='link'
                icon={item.icon}
                iconPosition='left'
                onClick={item.onClick}
                className='_feed_inner_text_area_bottom_photo_link'
              >
                {item.label}
              </Button>
            </div>
          ))}
        </div>

        <div className='_feed_inner_text_area_btn'>
          <Button
            variant='primary'
            icon={<Icons.Send />}
            iconPosition='left'
            onClick={handlePost}
            loading={loading}
            className='_feed_inner_text_area_btn_link'
          >
            Post
          </Button>
        </div>
      </div>

      {/* Mobile */}
      <div className='_feed_inner_text_area_bottom_mobile'>
        <div className='_feed_inner_text_mobile'>
          <div className='_feed_inner_text_area_item'>
            {actions.map((item) => (
              <div key={item.id} className={`_feed_inner_text_area_bottom_${item.id} _feed_common`}>
                <Button
                  variant='link'
                  icon={item.icon}
                  iconPosition='left'
                  onClick={item.onClick}
                  className='_feed_inner_text_area_bottom_photo_link'
                />
              </div>
            ))}
          </div>

          <div className='_feed_inner_text_area_btn'>
            <Button
              variant='primary'
              icon={<Icons.Send />}
              iconPosition='left'
              onClick={handlePost}
              className='_feed_inner_text_area_btn_link'
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
