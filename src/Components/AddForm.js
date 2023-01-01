import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    content: "",
    image: "",
    date: new Date().toDateString(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const form = new FormData();
  form.append("name", formData.name);
  form.append("email", formData.email);
  form.append("title", formData.title);
  form.append("description", formData.description);
  form.append("content", formData.content);
  form.append("image", formData.image);
  form.append("date", formData.date);

  const handleForm = async () => {
    let token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/user/posts", {
      method: "POST",
      body: form,
      headers: {
        authorization: token,
      },
    });
    const data = await response.json();
    if (data.message === "Post added") {
      navigate("/posts");
    }
  };
  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: "center", marginTop: "10px" }}>
          Enter the details.
        </h1>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Please enter your name"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email address"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <textarea
                className="form-control"
                id="title"
                rows="2"
                placeholder="Enter a title for your post"
                name="title"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="2"
                placeholder="Enter a brief description for your post"
                name="description"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                className="form-control"
                id="content"
                rows="8"
                placeholder="Enter the content"
                name="content"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                className="form-control"
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
              />
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleForm}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddForm;
