import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import SearchArticle from "./Pages/SearchArticle";
import AddPost from "./Pages/AddPost";
import YourPosts from "./Pages/YourPosts";
import ViewArticle from "./Pages/ViewArticle";

function App() {
  const [topic, setTopic] = useState("");
  const [ID, setID] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
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
