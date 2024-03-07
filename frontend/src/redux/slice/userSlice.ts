import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")!),
    selectedChat: {},
    userChats: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userInfo = action.payload;
    },

    removeUserData: (state) => {
      state.userInfo = {};
    },

    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },

    setUserChats: (state, action) => {
      state.userChats = action.payload;
    },
  },
});

export const { setUserData, removeUserData, setSelectedChat, setUserChats } =
  userSlice.actions;
export default userSlice.reducer;
