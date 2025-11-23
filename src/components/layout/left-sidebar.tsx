'use client';
import { FC } from 'react';
import Link from 'next/link';
import { EVENTS, EXPLORE_MENU, SUGGESTE_PEOPLE } from '@/constrants';
import Image from 'next/image';

const LeftSidebar: FC = () => {
  const handleConnect = (personId: string) => {
    console.log('Connect clicked for:', personId);
  };

  return (
    <div className='_layout_left_sidebar_wrap'>
      <div className='_layout_left_sidebar_inner'>
        <div className='_left_inner_area_explore _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area'>
          <h4 className='_left_inner_area_explore_title _title5 _mar_b24'>Explore</h4>
          <ul className='_left_inner_area_explore_list'>
            {EXPLORE_MENU.map((item) => (
              <li
                key={item.title}
                className={`_left_inner_area_explore_item ${item.badge ? '_explore_item' : ''}`}
              >
                <Link
                  href={item.href}
                  className='_left_inner_area_explore_link text-decoration-none'
                >
                  <item.icon className='text-gray' />
                  {item.title}
                </Link>

                {item.badge && (
                  <span className='_left_inner_area_explore_link_txt'>{item.badge}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='_layout_left_sidebar_inner'>
        <div className='_left_inner_area_suggest _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area'>
          <div className='_left_inner_area_suggest_content _mar_b24'>
            <h4 className='_left_inner_area_suggest_content_title _title5'>Suggested People</h4>
            <span className='_left_inner_area_suggest_content_txt'>
              <Link className='_left_inner_area_suggest_content_txt_link' href='#'>
                See All
              </Link>
            </span>
          </div>
          {SUGGESTE_PEOPLE.map((person) => (
            <div key={person.id} className='_left_inner_area_suggest_info'>
              <div className='_left_inner_area_suggest_info_box'>
                <div className='_left_inner_area_suggest_info_image'>
                  <Link href='/profile' className='text-decoration-none'>
                    <Image
                      src={person.image}
                      alt={person.name}
                      className='_info_img'
                      width={40}
                      height={40}
                    />
                  </Link>
                </div>
                <div className='_left_inner_area_suggest_info_txt'>
                  <Link href='/profile' className='text-decoration-none'>
                    <h4 className='_left_inner_area_suggest_info_title'>{person.name}</h4>
                  </Link>
                  <p className='_left_inner_area_suggest_info_para'>{person.title}</p>
                </div>
              </div>
              <div className='_left_inner_area_suggest_info_link'>
                <button onClick={() => handleConnect(person.id)} className='_info_link'>
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='_layout_left_sidebar_inner'>
        <div className='_left_inner_area_event _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area'>
          <div className='_left_inner_event_content'>
            <h4 className='_left_inner_event_title _title5'>Events</h4>
            <Link href='/event' className='_left_inner_event_link'>
              See all
            </Link>
          </div>
          {EVENTS.map((event) => (
            <Link
              key={event.id}
              className='_left_inner_event_card_link text-decoration-none'
              href='/event-single'
            >
              <div className='_left_inner_event_card'>
                <div className='_left_inner_event_card_iamge'>
                  <Image
                    src={event.image}
                    alt={event.title}
                    className='_card_img'
                    width={528}
                    height={320}
                  />
                </div>
                <div className='_left_inner_event_card_content'>
                  <div className='_left_inner_card_date'>
                    <p className='_left_inner_card_date_para'>{event.date}</p>
                    <p className='_left_inner_card_date_para1'>{event.month}</p>
                  </div>
                  <div className='_left_inner_card_txt'>
                    <h4 className='_left_inner_event_card_title'>{event.title}</h4>
                  </div>
                </div>
                <hr className='_underline' />
                <div className='_left_inner_event_bottom'>
                  <p className='_left_iner_event_bottom'>{event.peopleGoing} People Going</p>
                  <button className='_left_iner_event_bottom_link'>Going</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
