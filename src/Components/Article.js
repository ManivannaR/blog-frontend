import React from "react";

const Article = ({ content, date, name, title, desription, image, email }) => {
  return (
    <>
      <div className="container-fluid" style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col-md-10">
            <h1 className="h1">{title}</h1>
            <img src={image} className="img-fluid" alt="Unavailable" />
            <br />
            <br />
            <p class="h5">
              By {name}
              <span className="h5"> ({date})</span>
            </p>
            <br />
            <p className="h5" style={{ fontWeight: "400" }}>
              {content}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
