import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import postReducer from './features/postSlice';
import commentReducer from './features/commentSlice';
import replyReducer from './features/replySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comment: commentReducer,
    reply: replyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
