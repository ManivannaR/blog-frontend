import React, { useState, useEffect } from "react";
import Header from "../Layouts/Header";
import Article from "../Components/Article";
import { useSelector } from "react-redux";

const ViewArticle = ({ setTopic, ID }) => {
  const [articleData, setArticleData] = useState({});
  const [string, setString] = useState("");
  let token = useSelector((state) => state.token);

  useEffect(() => {
    const getArticle = async () => {
      const response = await fetch(`http://localhost:3001/user/posts/${ID}`, {
        headers: {
          authorization: token,
        },
      });
      const responseData = await response.json();
      const base64String = base64ArrayBuffer(responseData.data.image.data.data);
      setString(base64String);
      setArticleData(responseData.data);
    };
    getArticle();
  }, [ID]);

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

  return (
    <>
      <Header setTopic={setTopic} />
      <Article
        content={articleData.content}
        date={articleData.date}
        description={articleData.description}
        name={articleData.name}
        title={articleData.title}
        email={articleData.email}
        image={`data:image/png;base64,${string}`}
      />
    </>
  );
};

export default ViewArticle;
