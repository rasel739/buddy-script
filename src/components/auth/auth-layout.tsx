'use client';
import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  image?: string;
  imageDark?: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, image, imageDark }) => {
  return (
    <section className='_social_wrapper _layout_main_wrapper'>
      {/* Shapes */}
      <div className='_shape_one'>
        <img src='/images/shape1.svg' className='_shape_img' alt='' />
        <img src='/images/dark_shape.svg' className='_dark_shape' alt='' />
      </div>
      <div className='_shape_two'>
        <img src='/images/shape2.svg' className='_shape_img' alt='' />
        <img src='/images/dark_shape1.svg' className='_dark_shape _dark_shape_opacity' alt='' />
      </div>
      <div className='_shape_three'>
        <img src='/images/shape3.svg' className='_shape_img' alt='' />
        <img src='/images/dark_shape2.svg' className='_dark_shape _dark_shape_opacity' alt='' />
      </div>

      <div className='_social_wrap'>
        <div className='container'>
          <div className='row align-items-center'>
            {/* Left side image */}
            <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
              <div className='_social_left'>
                <img src={image} alt='' className='_left_img' />
                {imageDark && <img src={imageDark} alt='' className='_left_img_dark' />}
              </div>
            </div>

            {/* Right side content */}
            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
              <div className='_social_content'>
                <div className='_logo _mar_b28'>
                  <img src='/images/logo.svg' alt='Logo' />
                </div>

                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
