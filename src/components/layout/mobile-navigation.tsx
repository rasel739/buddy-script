'use client';
import { FC } from 'react';
import Link from 'next/link';
import Icons from '@/lib/icons';

const MobileNavigation: FC = () => {
  return (
    <div className='_mobile_navigation_bottom_wrapper'>
      <div className='_mobile_navigation_bottom_wrap'>
        <div className='conatiner'>
          <div className='row'>
            <div className='col-xl-12 col-lg-12 col-md-12'>
              <ul className='_mobile_navigation_bottom_list'>
                <li className='_mobile_navigation_bottom_item'>
                  <Link
                    href='/feed'
                    className='_mobile_navigation_bottom_link _mobile_navigation_bottom_link_active'
                  >
                    <Icons.Home className='_mobile_svg' />
                  </Link>
                </li>
                <li className='_mobile_navigation_bottom_item'>
                  <Link href='/friend-request' className='_mobile_navigation_bottom_link'>
                    <Icons.Friends className='_dark_svg' />
                  </Link>
                </li>
                <li className='_mobile_navigation_bottom_item'>
                  <Link href='#' className='_mobile_navigation_bottom_link'>
                    <Icons.Notification className='_dark_svg' />
                    <span className='_counting'>6</span>
                  </Link>
                </li>
                <li className='_mobile_navigation_bottom_item'>
                  <Link href='/chat' className='_mobile_navigation_bottom_link'>
                    <Icons.Chat className='_dark_svg' />
                    <span className='_counting'>2</span>
                  </Link>
                </li>
                <div className='_header_mobile_toggle'>
                  <form action='/mobileMenu'>
                    <button
                      type='submit'
                      className='_header_mobile_btn_link'
                      aria-label='Open mobile menu'
                    >
                      <Icons.Menu className='text-gray' />
                    </button>
                  </form>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
