import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserState, NewUser, UpdateUser } from "../types/user.types";

// base url for the api
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// initial state
const initialState : UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
};

// async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(API_URL);
      return response.data;
    } catch (err) {
      return rejectWithValue('Failed to fetch users. Please try again later.');
    }
  }
);


// async thunk for creating a new user (simulated, no actual api call)
export const addUser = createAsyncThunk(
  'users/addUser',
  async (user : NewUser, { getState }) => {
    // simulate api call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // get current users to determine next id
    const state = getState() as { users: UserState };
    const maxId = state.users.users.reduce((max, user) => Math.max(max, user.id), 0);

    // return new user with generated id
    return {...user, id : maxId + 1 };
  }
);

// async thunk for updating a user (simulated, no actual api call)
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user : UpdateUser) => {
    // simulate api call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return user;
  }
);

// async thunk for deleting a user (simulated, no actual api call)
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId : number) => {
    // sim api call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return userId;
  }
);

// user slice
const userSlice = createSlice({
  name : 'users',
  initialState,
  reducers : {
    setSelectedUser : (state, action : PayloadAction<number | null>) => {
      if (action.payload === null) {
        state.selectedUser = null;
      } else {
        state.selectedUser = state.users.find(user => user.id === action.payload) || null;
      }
    },
    clearError : (state) => {
      state.error = null;
    },
  },
  extraReducers : (builder) => {
    builder

    // fetch users cases
    .addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    // add user cases
    .addCase(addUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload as User);
    })
    .addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    // update user cases
    .addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      const updatedUser = action.payload;
      const index = state.users.findIndex(user => user.id === updatedUser.id);

      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedUser };
      }
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    // delete user cases
    .addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter(user => user.id !== action.payload);

      if (state.selectedUser && state.selectedUser.id !== action.payload) {
        state.selectedUser = null;
      }
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// export actions and reducer
export const { setSelectedUser, clearError } = userSlice.actions;
export default userSlice.reducer;
