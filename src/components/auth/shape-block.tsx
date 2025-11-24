'use client';

import { FC } from 'react';
import Image from 'next/image';
import { SHAPES } from '@/constrants';

const ShapeBlock = () => {
  return (
    <>
      {SHAPES.map((shape) => (
        <div key={shape.id} className={shape.containerClass}>
          <Image
            src={shape.shape.src}
            alt='Shape decoration'
            className='_shape_img'
            width={shape.shape.width}
            height={shape.shape.height}
          />
          <Image
            src={shape.darkShape.src}
            alt='Dark shape decoration'
            className={`_dark_shape ${shape.darkClass}`}
            width={shape.darkShape.width}
            height={shape.darkShape.height}
          />
        </div>
      ))}
    </>
  );
};

export default ShapeBlock;
