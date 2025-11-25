import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/axios';

interface Comment {
  id: string;
  content: string;
  postId: string;
  author: {
    id: string;
    fullName: string;
    email: string;
  };
  likesCount: number;
  repliesCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CommentState {
  comments: Record<string, Comment[]>;
  isLoading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: {},
  isLoading: false,
  error: null,
};

export const createComment = createAsyncThunk(
  'comment/create',
  async ({ postId, content }: { postId: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/comment', { postId, content });
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to create comment');
    }
  }
);

export const fetchComments = createAsyncThunk(
  'comment/fetch',
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/comment/post/${postId}`);
      return { postId, comments: response.data.data };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch comments');
    }
  }
);

export const updateComment = createAsyncThunk(
  'comment/update',
  async ({ commentId, content }: { commentId: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/comment/${commentId}`, { content });
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to update comment');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comment/delete',
  async ({ commentId, postId }: { commentId: string; postId: string }, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/comment/${commentId}`);
      return { commentId, postId };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to delete comment');
    }
  }
);

export const toggleCommentLike = createAsyncThunk(
  'comment/toggleLike',
  async ({ commentId, postId }: { commentId: string; postId: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/comment/${commentId}/like`);
      return { commentId, postId, ...response.data.data };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to toggle like');
    }
  }
);

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const postId = action.payload.data.postId;
        if (!state.comments[postId]) {
          state.comments[postId] = [];
        }
        state.comments[postId].unshift(action.payload.data);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments[action.payload.postId] = action.payload.comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder.addCase(updateComment.fulfilled, (state, action) => {
      const postId = action.payload.data.postId;
      const commentIndex = state.comments[postId]?.findIndex(
        (c) => c.id === action.payload.data.id
      );
      if (commentIndex !== -1) {
        state.comments[postId][commentIndex] = action.payload.data;
      }
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const { postId, commentId } = action.payload;
      state.comments[postId] = state.comments[postId]?.filter((c) => c.id !== commentId);
    });

    builder.addCase(toggleCommentLike.fulfilled, (state, action) => {
      const { postId, commentId, liked } = action.payload;
      const comment = state.comments[postId]?.find((c) => c.id === commentId);
      if (comment) {
        comment.isLiked = liked;
        comment.likesCount += liked ? 1 : -1;
      }
    });
  },
});

export const { clearError } = commentSlice.actions;
export default commentSlice.reducer;
