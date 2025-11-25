import Icons from '@/lib/icons';
import { Event, Friend, NotificationItem, Story, StoryItem, SuggestedPerson } from '@/types';

export const PROFILE_DROPDOWN = [
  {
    id: 'se1',
    title: 'Settings',
    href: '/settings',
    icon: Icons.Settings,
    rightIcon: Icons.ChevronRight,
  },
  {
    id: 'he2',
    title: 'Help & Support',
    href: '/help',
    icon: Icons.Help,
    rightIcon: Icons.ChevronRight,
  },
];

export const FRIENDS: Friend[] = [
  {
    id: '1',
    name: 'Steve Jobs',
    title: 'CEO of Apple',
    image: '/images/people1.png',
    isOnline: false,
    lastSeen: '5 minute ago',
  },
  {
    id: '2',
    name: 'Ryan Roslansky',
    title: 'CEO of Linkedin',
    image: '/images/people2.png',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Dylan Field',
    title: 'CEO of Figma',
    image: '/images/people3.png',
    isOnline: true,
  },
];

export const STORIES: Story[] = [
  { id: '1', name: 'Your Story', image: '/images/card_ppl1.png', isYours: true },
  { id: '2', name: 'Ryan Roslansky', image: '/images/card_ppl2.png' },
  { id: '3', name: 'Ryan Roslansky', image: '/images/card_ppl3.png' },
  { id: '4', name: 'Ryan Roslansky', image: '/images/card_ppl4.png' },
];

export const STORY_MOBILE: StoryItem[] = [
  {
    id: 'your-story',
    name: 'Your Story',
    image: '/images/mobile_story_img.png',
    type: 'your',
  },
  {
    id: 'story-1',
    name: 'Ryan',
    image: '/images/mobile_story_img1.png',
    type: 'active',
  },
  {
    id: 'story-2',
    name: 'Jibon',
    image: '/images/mobile_story_img2.png',
    type: 'inactive',
  },
  {
    id: 'story-3',
    name: 'Shakil',
    image: '/images/mobile_story_img1.png',
    type: 'active',
  },
  {
    id: 'story-4',
    name: 'Kobir',
    image: '/images/mobile_story_img2.png',
    type: 'inactive',
  },
  {
    id: 'story-5',
    name: 'Limon',
    image: '/images/mobile_story_img2.png',
    type: 'inactive',
  },
  {
    id: 'story-6',
    name: 'Shohid',
    image: '/images/mobile_story_img2.png',
    type: 'inactive',
  },
  {
    id: 'story-7',
    name: 'Lokman',
    image: '/images/mobile_story_img2.png',
    type: 'inactive',
  },
  {
    id: 'story-8',
    name: 'Rasel',
    image: '/images/mobile_story_img2.png',
    type: 'inactive',
  },
  {
    id: 'story-9',
    name: 'Tarek',
    image: '/images/mobile_story_img2.png',
    type: 'inactive',
  },
];

export const EXPLORE_MENU = [
  {
    title: 'Learning',
    href: '#',
    icon: Icons.Learning,
    badge: 'New',
  },
  {
    title: 'Insights',
    href: '#',
    icon: Icons.Insights,
  },
  {
    title: 'Find friends',
    href: '/find-friends',
    icon: Icons.FindFriends,
  },
  {
    title: 'Bookmarks',
    href: '#',
    icon: Icons.Bookmark,
  },
  {
    title: 'Group',
    href: '/group',
    icon: Icons.Group,
  },
  {
    title: 'Gaming',
    href: '#',
    icon: Icons.Gaming,
    badge: 'New',
  },
  {
    title: 'Settings',
    href: '#',
    icon: Icons.SettingsAlt,
  },
  {
    title: 'Save post',
    href: '#',
    icon: Icons.SavePost,
  },
];

export const SUGGESTE_PEOPLE: SuggestedPerson[] = [
  { id: '1', name: 'Steve Jobs', title: 'CEO of Apple', image: '/images/people1.png' },
  { id: '2', name: 'Ryan Roslansky', title: 'CEO of Linkedin', image: '/images/people2.png' },
  { id: '3', name: 'Dylan Field', title: 'CEO of Figma', image: '/images/people3.png' },
];

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'No more terrorism no more cry',
    date: '10',
    month: 'Jul',
    peopleGoing: 17,
    image: '/images/feed_event1.png',
  },
  {
    id: '2',
    title: 'No more terrorism no more cry',
    date: '10',
    month: 'Jul',
    peopleGoing: 17,
    image: '/images/feed_event1.png',
  },
];

export const NOTIFICATION: NotificationItem[] = [
  {
    id: '1',
    image: '/images/friend-req.png',
    message: 'Steve Jobs posted a link in your timeline.',
    time: '42 minutes ago',
    isRead: false,
  },
  {
    id: '2',
    image: '/images/profile-1.png',
    message: 'An admin changed the name of the group Freelancer usa to Freelancer usa',
    time: '42 minutes ago',
    isRead: false,
  },
];

export const NAVBAR_MENU = [
  {
    id: 'home',
    href: '/feed',
    icon: Icons.Home2,
  },
  {
    id: 'friend-requests',
    href: '/friend-request',
    icon: Icons.Friends2,
  },
  {
    id: 'notifications',
    href: null,
    badge: 6,
    dropdown: true,
    icon: Icons.Notification2,
  },
  {
    id: 'chat',
    href: '/chat',
    badge: 2,
    icon: Icons.Chat2,
  },
];

export const SHAPES = [
  {
    id: 1,
    shape: {
      src: '/images/shape1.svg',
      width: 176,
      height: 540,
    },
    darkShape: {
      src: '/images/dark_shape.svg',
      width: 176,
      height: 540,
    },
    containerClass: '_shape_one',
    darkClass: '',
  },
  {
    id: 2,
    shape: {
      src: '/images/shape2.svg',
      width: 568,
      height: 400,
    },
    darkShape: {
      src: '/images/dark_shape1.svg',
      width: 576,
      height: 408,
    },
    containerClass: '_shape_two',
    darkClass: '_dark_shape_opacity',
  },
  {
    id: 3,
    shape: {
      src: '/images/shape3.svg',
      width: 568,
      height: 548,
    },
    darkShape: {
      src: '/images/dark_shape2.svg',
      width: 568,
      height: 548,
    },
    containerClass: '_shape_three',
    darkClass: '_dark_shape_opacity',
  },
];
