import React, { useState, useEffect } from "react";
import Header from "../Layouts/Header";
import Card from "../Components/Card";

const YourPosts = ({ setTopic, setID }) => {
  let api = "https://blog-embifi.onrender.com/post";

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(
    "Please wait, your posts are loading."
  );

  const getArticles = async () => {
    const response = await fetch(api);
    const data = await response.json();
    setArticles(data.data);
    setLoading("");
  };

  function base64ArrayBuffer(arrayBuffer) {
    let base64 = "";
    let encodings =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    let bytes = new Uint8Array(arrayBuffer);
    let byteLength = bytes.byteLength;
    let byteRemainder = byteLength % 3;
    let mainLength = byteLength - byteRemainder;

    let a, b, c, d;
    let chunk;

    for (let i = 0; i < mainLength; i = i + 3) {
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
      a = (chunk & 16515072) >> 18;
      b = (chunk & 258048) >> 12;
      c = (chunk & 4032) >> 6;
      d = chunk & 63;

      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }

    if (byteRemainder === 1) {
      chunk = bytes[mainLength];

      a = (chunk & 252) >> 2;

      b = (chunk & 3) << 4;

      base64 += encodings[a] + encodings[b] + "==";
    } else if (byteRemainder === 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

      a = (chunk & 64512) >> 10;
      b = (chunk & 1008) >> 4;

      c = (chunk & 15) << 2;

      base64 += encodings[a] + encodings[b] + encodings[c] + "=";
    }

    return base64;
  }

  useEffect(() => {
    getArticles();
  }, []);
  return (
    <>
      <Header setTopic={setTopic} />
      <div className="container-fluid">
        <div className="row">
          <p>{loading}</p>
          {articles.map((obj) => {
            const base64String = base64ArrayBuffer(obj.image.data.data);
            return (
              <Card
                key={obj._id}
                setID={setID}
                id={obj._id}
                author={obj.author}
                content={obj.content}
                description={obj.description}
                publishedAt={obj.publishedAt}
                title={obj.title}
                img={`data:image/png;base64,${base64String}`}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default YourPosts;
