import React, { useState, useEffect } from "react";
import Header from "../Layouts/Header";
import Card from "../Components/Card";

const Homepage = ({ setTopic, setID }) => {
  let api =
    "https://newsapi.org/v2/everything?q=world&apiKey=3b4a5b86ebb64977b8f2f74d43d21a3c";

  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    const response = await fetch(api);
    const data = await response.json();
    setArticles(data.articles);
  };

  useEffect(() => {
    getArticles();
  }, []);
  return (
    <>
      <Header setTopic={setTopic} />
      <div className="container-fluid">
        <div className="row">
          {articles.map((obj) => {
            return (
              <Card
                key={Date.now() * Math.random()}
                url={obj.url}
                description={obj.description}
                title={obj.title}
                img={obj.urlToImage}
                content={obj.content}
                setID={setID}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Homepage;
