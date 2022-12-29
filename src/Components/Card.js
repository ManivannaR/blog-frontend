import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, description, url, title, img, setID }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (url) {
      window.location.href = url;
    } else {
      setID(e.target.id);
      navigate("/view");
    }
  };
  return (
    <div className="col-md-4 gy-3">
      <div className="card">
        <img
          className="card-img-top"
          src={img}
          alt="Unavailable"
          id={id}
          onClick={handleClick}
        />
        <div className="card-body" id={id} onClick={handleClick}>
          <h5 className="card-title" id={id} onClick={handleClick}>
            {title}
          </h5>
          <p className="card-text" id={id} onClick={handleClick}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
