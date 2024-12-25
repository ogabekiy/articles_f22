import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useFetch from "../hooks/useFetch";

export const ArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reloadKey, setReloadKey] = useState(0);
  const { data, loading, error } = useFetch(`/article/${id}/`, reloadKey);
  const token = localStorage.getItem("token");

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleDelete = async () => {
    if (!token) {
      alert("You are not logged in!");
      return;
    }

    const parsedToken = JSON.parse(token);

    try {
      await axios.delete(
        `https://mustafocoder.pythonanywhere.com/api/articles/${id}/delete/`,
        {
          headers: {
            Authorization: `Token ${parsedToken.token}`,
          },
        }
      );
      alert("Article deleted successfully.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete article.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You are not logged in!");
      return;
    }

    const parsedToken = JSON.parse(token);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title || data.title);
    formDataToSend.append("content", formData.content || data.content);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await axios.put(
        `https://mustafocoder.pythonanywhere.com/api/articles/${id}/update/`,
        formDataToSend,
        {
          headers: {
            Authorization: `Token ${parsedToken.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Article updated successfully.");
      setEditMode(false);
      setReloadKey((prev) => prev + 1); 
    } catch (err) {
      console.error(err);
      alert("Failed to update article.");
    }
  };

  return (
    <>
      {loading ? (
        <div className="py-20 text-center text-5xl text-gray-400 ">
          <i className="fa fa-circle-notch fa-spin"></i>
        </div>
      ) : error ? (
        <div className="py-20 text-center text-2xl text-red-400">
          Failed to load article details.
        </div>
      ) : (
        <div className="flex justify-center items-center py-20">
          <div className="w-[500px]">
            {editMode ? (
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  defaultValue={data.title}
                  onChange={handleInputChange}
                  className="w-full mb-4 p-2 border rounded"
                />
                <textarea
                  name="content"
                  placeholder="Content"
                  defaultValue={data.content}
                  onChange={handleInputChange}
                  className="w-full mb-4 p-2 border rounded"
                ></textarea>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="mb-4"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <img
                  src={
                    data.image
                      ? `https://mustafocoder.pythonanywhere.com/api${data.image}`
                      : "https://www.pallenz.co.nz/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
                  }
                  alt={data.title}
                />
                <h1 className="text-3xl font-bold my-4">{data.title}</h1>
                <p className="text-gray-500">{data.content}</p>
                {token && (
                  <div className="mt-4">
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
                    >
                      Edit Article
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      Delete Article
                    </button>
                  </div>
                )}
                <button
                  onClick={() => navigate("/")}
                  className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 mt-4"
                >
                  Back
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
  
};
