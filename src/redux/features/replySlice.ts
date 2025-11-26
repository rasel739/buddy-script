import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/axios';

interface Reply {
  id: string;
  content: string;
  commentId: string;
  author: {
    id: string;
    fullName: string;
    email: string;
  };
  likesCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ReplyState {
  replies: Record<string, Reply[]>;
  isLoading: boolean;
  error: string | null;
}

const initialState: ReplyState = {
  replies: {},
  isLoading: false,
  error: null,
};

export const createReply = createAsyncThunk(
  'reply/create',
  async ({ commentId, content }: { commentId: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/reply', { commentId, content });
      return { commentId, reply: response.data.data };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to create reply');
    }
  }
);

export const fetchReplies = createAsyncThunk(
  'reply/fetch',
  async (commentId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/reply/comment/${commentId}`);
      return { commentId, replies: response.data.data };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch replies');
    }
  }
);

export const updateReply = createAsyncThunk(
  'reply/update',
  async (
    { replyId, content, commentId }: { replyId: string; content: string; commentId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.patch(`/reply/${replyId}`, { content });
      return { commentId, reply: response.data.data };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to update reply');
    }
  }
);

export const deleteReply = createAsyncThunk(
  'reply/delete',
  async ({ replyId, commentId }: { replyId: string; commentId: string }, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/reply/${replyId}`);
      return { replyId, commentId };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to delete reply');
    }
  }
);

export const toggleReplyLike = createAsyncThunk(
  'reply/toggleLike',
  async ({ replyId, commentId }: { replyId: string; commentId: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/reply/${replyId}/like`);
      return { replyId, commentId, ...response.data.data };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to toggle like');
    }
  }
);

export const getReplyLikes = createAsyncThunk(
  'reply/getLikes',
  async (replyId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/reply/${replyId}/likes`);
      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch likes');
    }
  }
);

const replySlice = createSlice({
  name: 'reply',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearReplies: (state, action) => {
      const commentId = action.payload;
      delete state.replies[commentId];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReply.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createReply.fulfilled, (state, action) => {
        state.isLoading = false;
        const { commentId, reply } = action.payload;
        if (!state.replies[commentId]) {
          state.replies[commentId] = [];
        }
        state.replies[commentId].push(reply);
      })
      .addCase(createReply.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchReplies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReplies.fulfilled, (state, action) => {
        state.isLoading = false;
        const { commentId, replies } = action.payload;
        state.replies[commentId] = replies;
      })
      .addCase(fetchReplies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder.addCase(updateReply.fulfilled, (state, action) => {
      const { commentId, reply } = action.payload;
      const replies = state.replies[commentId];
      if (replies) {
        const index = replies.findIndex((r) => r.id === reply.id);
        if (index !== -1) {
          replies[index] = reply;
        }
      }
    });

    builder.addCase(deleteReply.fulfilled, (state, action) => {
      const { commentId, replyId } = action.payload;
      const replies = state.replies[commentId];
      if (replies) {
        state.replies[commentId] = replies.filter((r) => r.id !== replyId);
      }
    });

    builder.addCase(toggleReplyLike.fulfilled, (state, action) => {
      const { replyId, commentId, liked } = action.payload;
      const replies = state.replies[commentId];
      if (replies) {
        const reply = replies.find((r) => r.id === replyId);
        if (reply) {
          reply.isLiked = liked;
          reply.likesCount += liked ? 1 : -1;
        }
      }
    });
  },
});

export const { clearError, clearReplies } = replySlice.actions;
export default replySlice.reducer;
