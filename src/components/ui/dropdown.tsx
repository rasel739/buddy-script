'use client';

import { PROFILE_DROPDOWN } from '@/constrants';
import Icons from '@/lib/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const HeaderDropDown = () => {
  const [isDropShow, setIsDropShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropShow(false);
      }
    };

    if (isDropShow) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropShow]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropShow(false);
      }
    };

    if (isDropShow) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDropShow]);

  const toggleDropdown = () => {
    setIsDropShow((prev) => !prev);
  };

  return (
    <div className='_header_nav_profile' ref={dropdownRef}>
      <div className='_header_nav_profile_image'>
        <Image
          src='/images/profile.png'
          width={40}
          height={40}
          alt='Profile'
          className='_nav_profile_img'
        />
      </div>
      <div className='_header_nav_dropdown'>
        <span className='_header_nav_para'>Dylan Field</span>
        <button
          id='_profile_drop_show_btn'
          className='_header_nav_dropdown_btn _dropdown_toggle'
          type='button'
          onClick={toggleDropdown}
          aria-label='Toggle profile dropdown'
          aria-expanded={isDropShow}
        >
          <Icons.ChevronDown className='text-dark' />
        </button>
      </div>
      <div
        id='_prfoile_drop'
        className={`_nav_profile_dropdown _profile_dropdown${isDropShow ? ' show' : ''}`}
      >
        <div className='_nav_profile_dropdown_info'>
          <div className='_nav_profile_dropdown_image'>
            <Image
              src='/images/profile.png'
              width={40}
              height={40}
              alt='Profile'
              className='_nav_drop_img'
            />
          </div>
          <div className='_nav_profile_dropdown_info_txt'>
            <h4 className='_nav_dropdown_title'>Dylan Field</h4>
            <Link
              href='/profile'
              className='_nav_drop_profile text-decoration-none'
              onClick={() => setIsDropShow(false)}
            >
              View Profile
            </Link>
          </div>
        </div>
        <hr />
        <ul className='_nav_dropdown_list'>
          {PROFILE_DROPDOWN.map((item) => (
            <li key={item.id} className='_nav_dropdown_list_item'>
              <Link
                href={item.href}
                className='_nav_dropdown_link text-decoration-none'
                onClick={() => setIsDropShow(false)}
              >
                <div className='_nav_drop_info'>
                  <span>
                    <item.icon className='text-dark' />
                  </span>
                  {item.title}
                </div>
                <button type='submit' className='_nav_drop_btn_link'>
                  <item.rightIcon className='text-dark' />
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderDropDown;
