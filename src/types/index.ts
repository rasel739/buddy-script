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
