import React from "react";
import Header4 from "../Layouts/Header4";
import AddForm from "../Components/AddForm";
import LoginRedirect from "../Pages/LoginRedirect";

const AddPost = () => {
  let token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <div>
          <Header4 />
          <AddForm />
        </div>
      ) : (
        <LoginRedirect />
      )}
    </>
  );
};

export default AddPost;
