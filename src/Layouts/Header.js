import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pages.css";

const Header = ({ setTopic }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setTopic(input);
    navigate("/articles");
  };

  const handlePosts = () => {
    navigate("/posts");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/" style={{ fontWeight: "700" }}>
          Täglich Zeitung
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item" onClick={handlePosts}>
              <a className="nav-link">Your Posts</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button className="btn btn-outline-success" onClick={handleSearch}>
              Search
            </button>
            <button
              className="btn btn-outline-success"
              style={{ marginLeft: "3px" }}
              onClick={() => {
                navigate("/add");
              }}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
