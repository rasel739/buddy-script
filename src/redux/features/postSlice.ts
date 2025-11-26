import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/axios';
import { Post, IPostLike } from '@/types';

interface PostState {
  posts: Post[];
  postLiked: IPostLike[];
  like: boolean;
  currentPost: Post | null;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  nextCursor: string | null;
}

const initialState: PostState = {
  posts: [],
  postLiked: [],
  like: false,
  currentPost: null,
  isLoading: false,
  error: null,
  hasMore: true,
  nextCursor: null,
};

export const createPost = createAsyncThunk(
  'post/create',
  async (data: { content: string; isPrivate: boolean; image?: File }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('content', data.content);
      formData.append('isPrivate', String(data.isPrivate));
      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await apiClient.post('/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to create post');
    }
  }
);

export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async ({ cursor, limit = 20 }: { cursor?: string; limit?: number }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (cursor) params.append('cursor', cursor);
      params.append('limit', String(limit));

      const response = await apiClient.get(`/post/feed?${params.toString()}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch posts');
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'post/fetchById',
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/post/${postId}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch post');
    }
  }
);

export const updatePost = createAsyncThunk(
  'post/update',
  async (
    { postId, data }: { postId: string; data: { content?: string; isPrivate?: boolean } },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.patch(`/post/${postId}`, data);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to update post');
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/delete',
  async (postId: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/post/${postId}`);
      return postId;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to delete post');
    }
  }
);

export const toggleLike = createAsyncThunk(
  'post/toggleLike',
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/post/${postId}/like`);
      return { postId, ...response.data.data };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to toggle like');
    }
  }
);

export const getToggleLikes = createAsyncThunk(
  'post/getToggleLiked',
  async ({ postId, userId }: { postId: string; userId: string | null }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/post/${postId}/likes`);
      return { userId, postId, ...response.data };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to toggle like');
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPosts: (state) => {
      state.posts = [];
      state.nextCursor = null;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.unshift(action.payload.data);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = [...state.posts, ...action.payload.data.posts];
        state.nextCursor = action.payload.data.nextCursor;
        state.hasMore = action.payload.data.hasMore;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPost = action.payload.data;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder.addCase(updatePost.fulfilled, (state, action) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.data.id);
      if (index !== -1) {
        state.posts[index] = action.payload.data;
      }
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    });

    builder.addCase(toggleLike.fulfilled, (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        if (action.payload.liked) {
          post.likesCount++;
        } else {
          post.likesCount--;
        }
      }
    });

    builder.addCase(getToggleLikes.fulfilled, (state, action) => {
      const { userId, postId, data } = action.payload;

      state.postLiked = data;

      state.like = state.postLiked
        .filter((item) => item.user.id === userId)
        .some((post) => post.id === postId);
    });
  },
});

export const { clearError, clearPosts } = postSlice.actions;
export default postSlice.reducer;
