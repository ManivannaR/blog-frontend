import React from "react";
import Header from "../Layouts/Header";
import AddForm from "../Components/AddForm";

const AddPost = ({ setTopic }) => {
  return (
    <>
      <Header setTopic={setTopic} />
      <AddForm />
    </>
  );
};

export default AddPost;
