'use client';

import Image from 'next/image';

const reactionImages = [
  { src: '/images/react_img1.png', className: '_react_img1' },
  { src: '/images/react_img2.png', className: '_react_img' },
  { src: '/images/react_img3.png', className: '_react_img _rect_img_mbl_none' },
  { src: '/images/react_img4.png', className: '_react_img _rect_img_mbl_none' },
  { src: '/images/react_img5.png', className: '_react_img _rect_img_mbl_none' },
];

export default function TotalReaction({ count }: { count: number }) {
  return (
    <div className='_feed_inner_timeline_total_reacts_image'>
      {reactionImages.map((item, index) => (
        <Image
          key={index}
          src={item.src}
          alt='Reaction'
          width={64}
          height={64}
          className={item.className}
        />
      ))}

      <p className='_feed_inner_timeline_total_reacts_para'>{count}+</p>
    </div>
  );
}
