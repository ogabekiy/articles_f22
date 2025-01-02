import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from './slices/articleSlice'
const store = configureStore({
  reducer: {
    articles:articlesSlice , 
  },
});

export default store;
