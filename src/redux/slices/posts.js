import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchPost = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("/posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPost.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.posts.status = "loaded";
      state.posts.items = action.payload;
    },
    [fetchPost.rejected]: (state) => {
      state.posts.status = "error";
      state.posts.items = [];
    },
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.status = "loaded";
      state.tags.items = action.payload;
    },
    [fetchTags.rejected]: (state) => {
      state.tags.status = "error";
      state.tags.items = [];
    },
  },
});

export const postsReduces = postsSlice.reducer;
