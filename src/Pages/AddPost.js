import React from "react";
import Header4 from "../Layouts/Header4";
import AddForm from "../Components/AddForm";
import LoginRedirect from "../Pages/LoginRedirect";
import { useSelector } from "react-redux";

const AddPost = () => {
  let token = useSelector((state) => state.token);
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
