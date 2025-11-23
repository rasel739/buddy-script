export interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  agreeToTerms: boolean;
}

export interface Post {
  id: string;
  author: {
    name: string;
    image: string;
  };
  timeAgo: string;
  privacy: string;
  title?: string;
  image?: string;
  reactions: {
    count: number;
    types: string[];
  };
  comments: number;
  shares: number;
}

export interface Friend {
  id: string;
  name: string;
  title: string;
  image: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface Story {
  id: string;
  name: string;
  image: string;
  isYours?: boolean;
}

export interface SuggestedPerson {
  id: string;
  name: string;
  title: string;
  image: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  month: string;
  peopleGoing: number;
  image: string;
}

export interface NotificationItem {
  id: string;
  image: string;
  message: string;
  time: string;
  isRead: boolean;
}
