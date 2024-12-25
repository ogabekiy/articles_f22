import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { createArticle } from "../redux/slices/articleSlice";

export default function CreateArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", "user");

      if (image) {
        formData.append("image", image);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      const parsedToken = JSON.parse(token);

      const response = await axios.post(
        "https://mustafocoder.pythonanywhere.com/api/articles/create/",
        formData,
        {
          headers: {
            Authorization: `Token ${parsedToken.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to create article");
      }
      const newArticle = response.data;
      dispatch(createArticle(newArticle));

      setTitle("");
      setContent("");
      setImage(null);
      setPreview("");

      navigate("/");
    } catch (err) {
      console.log("err", err);
      setError(
        err.response ? err.response.data.detail || err.message : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Article</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>
        )}

        <div>
          <label className="block mb-2 font-medium">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter article title"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Content *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your article content"
            rows={6}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 max-h-48 rounded"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "Creating Article..." : "Create Article"}
        </button>
      </form>
    </div>
  );
}
