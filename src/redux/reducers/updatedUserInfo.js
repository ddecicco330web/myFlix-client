import { createSlice } from '@reduxjs/toolkit';

export const updatedUserInfoSlice = createSlice({
  name: 'updatedUserInfo',
  initialState: {
    username: '',
    password: '',
    email: '',
    birthday: ''
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setBirthday: (state, action) => {
      state.birthday = action.payload;
    }
  }
});

export const { setUsername, setPassword, setEmail, setBirthday } =
  updatedUserInfoSlice.actions;
export default updatedUserInfoSlice.reducer;
