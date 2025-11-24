'use client';

import Icons from '@/lib/icons';
import { FC, useState, useRef, useEffect } from 'react';

interface TimelineDropdownProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const TimelineDropdown: FC<TimelineDropdownProps> = ({ onEdit, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownList = [
    {
      id: 'd1',
      label: 'Save Post',
      icon: <Icons.BookmarkEmpty />,
      action: () => {},
    },
    {
      id: 'd2',
      label: 'Turn On Notification',
      icon: <Icons.Notification3 />,
      action: () => {},
    },
    {
      id: 'd3',
      label: 'Hide',
      icon: <Icons.Hide />,
      action: () => {},
    },
    {
      id: 'd4',
      label: 'Edit Post',
      icon: <Icons.Edit />,
      action: onEdit,
    },
    {
      id: 'd5',
      label: 'Delete Post',
      icon: <Icons.Delete />,
      action: onDelete,
    },
  ];

  return (
    <div className='_feed_inner_timeline_post_box_dropdown' ref={dropRef}>
      <button
        className='_feed_timeline_post_dropdown_link'
        onClick={() => setShowDropdown((prev) => !prev)}
        aria-label='Post options'
      >
        <Icons.ThreeDots />
      </button>

      {showDropdown && (
        <div className='_feed_timeline_dropdown _timeline_dropdown show'>
          <ul className='_feed_timeline_dropdown_list'>
            {dropdownList.map((item) => (
              <li key={item.id} className='_feed_timeline_dropdown_item'>
                <button
                  className='_feed_timeline_dropdown_link'
                  type='button'
                  style={{ background: 'none', border: 'none' }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TimelineDropdown;
