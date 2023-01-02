import React, { useState, useEffect } from "react";
import Header3 from "../Layouts/Header3";
import Card from "../Components/Card";
import LoginRedirect from "../Pages/LoginRedirect";
import { useSelector } from "react-redux";

const YourPosts = ({ setTopic, setID }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(
    "Please wait, your posts are loading."
  );
  let token = useSelector((state) => state.token);

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
    let api = "http://localhost:3001/user/posts";
    const getArticles = async () => {
      const response = await fetch(api, {
        headers: {
          authorization: token,
        },
      });
      const data = await response.json();
      if (data.data.length > 0) {
        setLoading("");
        setArticles(data.data);
      } else {
        setLoading(
          <p className="h3" style={{ marginTop: "20px", textAlign: "center" }}>
            Start adding posts.
          </p>
        );
      }
    };
    getArticles();
  }, []);
  return (
    <>
      {token ? (
        <div>
          <Header3 />
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
        </div>
      ) : (
        <LoginRedirect />
      )}
    </>
  );
};

export default YourPosts;
