import React, { useState, useEffect } from "react";
import Header from "../Layouts/Header";
import Card from "../Components/Card";

const Homepage = ({ setTopic, setID }) => {
  let api = "https://api.newscatcherapi.com/v2/search?q=india&lang=en";

  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    const response = await fetch(api, {
      headers: {
        "x-api-key": "nkpCIVtWK5kT9WGreA5-MV-GwKR0o-7t-XMGZkAqVO0",
      },
    });
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
                url={obj.link}
                content={obj.content}
                description={obj.excerpt}
                title={obj.title}
                img={obj.media}
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
