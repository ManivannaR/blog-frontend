import React from "react";
import Header2 from "../Layouts/Header2";
import { useNavigate } from "react-router-dom";

const LoginRedirect = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };
  return (
    <>
      <Header2 />
      <p className="h3" style={{ textAlign: "center", marginTop: "10px" }}>
        You need to{" "}
        <span id="login-redirect" onClick={handleRedirect}>
          Login
        </span>{" "}
        to view this page.
      </p>
    </>
  );
};

export default LoginRedirect;
