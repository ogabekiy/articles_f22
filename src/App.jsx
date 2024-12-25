import React, { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import { useDispatch } from "react-redux";
import { setArticles } from "./redux/slices/articleSlice";
import { Route, Routes } from "react-router-dom";
import { ArticleDetails } from "./components/ArticleDetails";
import CreateActicle from "./components/CreateActicle";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
export default function App() {
  const dispatch = useDispatch();
  const { data } = useFetch("/articles/");
  console.log(data);

  useEffect(() => {
    dispatch(setArticles(data));
  }, [data]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/article/:id" element={<ArticleDetails />}></Route>
        <Route path="/create" element={<CreateActicle />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}
