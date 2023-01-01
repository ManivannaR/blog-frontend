import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Homepage,
  SearchArticle,
  AddPost,
  YourPosts,
  ViewArticle,
  SignUp,
  SignIn,
  LoginRedirect,
} from "./Pages/index";

function App() {
  const [topic, setTopic] = useState("");
  const [ID, setID] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/reir" element={<LoginRedirect />} />
          <Route
            path="/"
            element={<Homepage setTopic={setTopic} setID={setID} />}
          />
          <Route
            path="/articles"
            element={<SearchArticle topic={topic} setTopic={setTopic} />}
          />
          <Route path="/add" element={<AddPost setTopic={setTopic} />} />
          <Route
            path="/posts"
            element={<YourPosts setTopic={setTopic} setID={setID} />}
          />
          <Route
            path="/view"
            element={<ViewArticle setTopic={setTopic} ID={ID} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
