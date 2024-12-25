import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    createArticle: (state, action) => {
      state.articles.push(action.payload);
    },
  },
});

export const { setArticles, createArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
