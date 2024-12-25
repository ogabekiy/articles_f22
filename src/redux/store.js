import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./Auth/authSlice";
import articlesSlice from './slices/articleSlice'
const store = configureStore({
  reducer: {
    articles:articlesSlice , 
  },
});

export default store;
