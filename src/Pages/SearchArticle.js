import React, { useState, useEffect } from "react";
import Header from "../Layouts/Header";
import Card from "../Components/Card";
import LoginRedirect from "../Pages/LoginRedirect";

const SearchArticle = ({ topic, setTopic }) => {
  const [articles, setArticles] = useState([]);
  let token = localStorage.getItem("token");

  useEffect(() => {
    let api = `https://newsapi.org/v2/everything?q=${topic}&apiKey=3b4a5b86ebb64977b8f2f74d43d21a3c`;
    const getArticles = async () => {
      const response = await fetch(api);
      const data = await response.json();
      setArticles(data.articles);
    };
    getArticles();
  }, [topic]);
  return (
    <>
      {token ? (
        <div>
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
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <LoginRedirect />
      )}
    </>
  );
};

export default SearchArticle;
