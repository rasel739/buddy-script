'use client';

import { Provider } from 'react-redux';

import { FC, ReactNode } from 'react';
import { store } from '@/redux/store';

interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
