'use client';
import Icons from '@/lib/icons';
import { StoryItem } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface StoryProps {
  item: StoryItem;
}

const StoryCard: React.FC<StoryProps> = ({ item }) => {
  const { type, image, name } = item;

  const wrapperClass =
    type === 'your'
      ? '_feed_inner_ppl_card_area_story'
      : type === 'active'
      ? '_feed_inner_ppl_card_area_story_active'
      : '_feed_inner_ppl_card_area_story_inactive';

  const imageSize = type === 'active' ? 60 : 120;

  return (
    <li className='_feed_inner_ppl_card_area_item'>
      <Link href='#0' className='_feed_inner_ppl_card_area_link text-decoration-none'>
        <div className={wrapperClass}>
          <Image
            src={image}
            alt={name}
            className={type === 'your' ? '_card_story_img' : '_card_story_img1'}
            width={imageSize}
            height={imageSize}
          />

          {/* Only for "Your Story" */}
          {type === 'your' && (
            <div className='_feed_inner_ppl_btn'>
              <button className='_feed_inner_ppl_btn_link' type='button'>
                <Icons.Plus />
              </button>
            </div>
          )}
        </div>
        <p className='_feed_inner_ppl_card_area_txt'>{name}</p>
      </Link>
    </li>
  );
};

export default StoryCard;
