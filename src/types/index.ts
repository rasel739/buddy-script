export interface LoginType {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
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

export interface StoryItem {
  id: string;
  name: string;
  image: string;
  type: 'your' | 'active' | 'inactive';
}

export type ReactionType = 'like' | 'comment' | 'share';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export type CreatePostInput = {
  content: string;
  isPrivate?: boolean;
  image?: File | null;
};

export type UpdatePostInput = {
  content?: string;
  isPrivate?: boolean;
};
