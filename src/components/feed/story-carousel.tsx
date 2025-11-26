'use client';
import { STORIES, STORY_MOBILE } from '@/constrants';
import Icons from '@/lib/icons';
import Image from 'next/image';

import { FC } from 'react';
import StoryCard from './story-card';

const StoryCarousel: FC = () => {
  const handleAddStory = () => {
    console.log('Add story clicked');
  };

  return (
    <>
      {/* Desktop Story */}
      <div className='_feed_inner_ppl_card _mar_b16'>
        <div className='_feed_inner_story_arrow'>
          <button type='button' className='_feed_inner_story_arrow_btn' aria-label='Previous'>
            <Icons.ArrowRight />
          </button>
        </div>
        <div className='row'>
          <div className='col-xl-3 col-lg-3 col-md-4 col-sm-4 col'>
            <div className='_feed_inner_profile_story _b_radious6'>
              <div className='_feed_inner_profile_story_image'>
                <Image
                  src='/images/card_ppl1.png'
                  alt='Your story'
                  className='_profile_story_img'
                  width={300}
                  height={330}
                />
                <div className='_feed_inner_story_txt'>
                  <div className='_feed_inner_story_btn'>
                    <button
                      className='_feed_inner_story_btn_link'
                      onClick={handleAddStory}
                      aria-label='Add story'
                    >
                      <Icons.Plus />
                    </button>
                  </div>
                  <p className='_feed_inner_story_para'>Your Story</p>
                </div>
              </div>
            </div>
          </div>
          {STORIES.slice(1).map((story) => (
            <div key={story.id} className='col-xl-3 col-lg-3 col-md-4 col-sm-4 _custom_none'>
              <div className='_feed_inner_public_story _b_radious6'>
                <div className='_feed_inner_public_story_image'>
                  <Image
                    src={story.image}
                    alt={story.name}
                    className='_public_story_img'
                    width={300}
                    height={330}
                  />
                  <div className='_feed_inner_pulic_story_txt'>
                    <p className='_feed_inner_pulic_story_para'>{story.name}</p>
                  </div>
                  <div className='_feed_inner_public_mini'>
                    <Image
                      src='/images/mini_pic.png'
                      alt='Profile'
                      className='_public_mini_img'
                      width={56}
                      height={56}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Story */}
      <div className='_feed_inner_ppl_card_mobile _mar_b16'>
        <div className='_feed_inner_ppl_card_area'>
          <ul className='_feed_inner_ppl_card_area_list'>
            {STORY_MOBILE.map((item) => (
              <StoryCard key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default StoryCarousel;
