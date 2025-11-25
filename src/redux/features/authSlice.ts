import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/axios';
import { AuthState, LoginType, RegisterFormData } from '@/types';
import Cookies from 'js-cookie';
const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? (Cookies.get('accessToken') as string) : null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterFormData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/auth/register', {
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      });
      Cookies.set('accessToken', response.data.data.accessToken);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Registration failed');
    }
  }
);
export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginType, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/auth/login', data);
      Cookies.set('accessToken', response.data.data.accessToken);
      return response;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Login failed');
    }
  }
);
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/auth/user');
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(axiosError.response?.data?.message || 'Failed to get user');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  Cookies.remove('accessToken');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
