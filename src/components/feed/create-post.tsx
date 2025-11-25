'use client';
import { FC, useState, useRef } from 'react';
import Button from '../ui/button';
import Icons from '@/lib/icons';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createPost } from '@/redux/features/postSlice';
import toast from 'react-hot-toast';

const CreatePost: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.post);

  const [postContent, setPostContent] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePost = async () => {
    if (!postContent.trim() && !selectedImage) {
      toast.error('Please write something or select an image');
      return;
    }

    try {
      const result = await dispatch(
        createPost({
          content: postContent,
          isPrivate: false,
          image: selectedImage || undefined,
        })
      );

      if (createPost.fulfilled.match(result)) {
        toast.success('Post created successfully!');
        setPostContent('');
        setSelectedImage(null);
        setImagePreview(null);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create post';
      toast.error(errorMessage);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleVideoClick = () => {
    toast('Video upload coming soon!');
  };

  const handleEventClick = () => {
    toast('Event creation coming soon!');
  };

  const handleArticleClick = () => {
    toast('Article creation coming soon!');
  };

  const actionArray = [
    {
      id: 'photo',
      icon: <Icons.Photo />,
      label: 'Photo',
      onClick: () => handlePhotoClick,
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
            src={'/images/txt_img.png'}
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
            disabled={isLoading}
          />
          <label className='_feed_textarea_label' htmlFor='floatingTextarea'>
            Write something ...
            <Icons.Pen />
          </label>
        </div>
      </div>

      {imagePreview && (
        <div className='position-relative _mar_t16'>
          <Image src={imagePreview} alt='Preview' width={600} height={400} className='_time_img' />
          <button
            type='button'
            onClick={removeImage}
            className='position-absolute top-0 end-0 m-2 btn btn-danger btn-sm'
          >
            Remove
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Desktop */}
      <div className='_feed_inner_text_area_bottom'>
        <div className='_feed_inner_text_area_item'>
          {actionArray.map((item) => (
            <div key={item.id} className={`_feed_inner_text_area_bottom_${item.id} _feed_common`}>
              <Button
                variant='link'
                icon={item.icon}
                iconPosition='left'
                onClick={item.onClick}
                className='_feed_inner_text_area_bottom_photo_link'
                disabled={isLoading}
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
            loading={isLoading}
            disabled={isLoading}
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
            {actionArray.map((item) => (
              <div key={item.id} className={`_feed_inner_text_area_bottom_${item.id} _feed_common`}>
                <Button
                  variant='link'
                  icon={item.icon}
                  iconPosition='left'
                  onClick={item.onClick}
                  className='_feed_inner_text_area_bottom_photo_link'
                  disabled={isLoading}
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
              loading={isLoading}
              disabled={isLoading}
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
