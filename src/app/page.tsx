'use client';
import FeedContent from '@/components/feed/content';
import Header from '@/components/layout/header';
import LeftSidebar from '@/components/layout/left-sidebar';
import MobileNavigation from '@/components/layout/mobile-navigation';
import RightSidebar from '@/components/layout/right-sidebar';
import ThemeSwitcher from '@/components/ui/theme-switcher';
import { getCurrentUser } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser());
    }
  }, [user, dispatch]);
  return (
    <div>
      <div className='_layout _layout_main_wrapper'>
        <ThemeSwitcher />

        <div className='_main_layout'>
          <Header />
          <MobileNavigation />

          <div className='container _custom_container'>
            <div className='_layout_inner_wrap'>
              <div className='row'>
                <div className='col-xl-3 col-lg-3 col-md-12 col-sm-12'>
                  <LeftSidebar />
                </div>

                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                  <FeedContent />
                </div>

                <div className='col-xl-3 col-lg-3 col-md-12 col-sm-12'>
                  <RightSidebar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
