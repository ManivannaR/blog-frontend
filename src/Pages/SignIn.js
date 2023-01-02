import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const responseData = await response.json();
    if (responseData.result === "error") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
      dispatch({
        type: "LOGIN",
        payload: {
          token: responseData.token,
          user: {
            name: responseData.data.name,
            email: responseData.data.email,
          },
        },
      });
      navigate("/");
    }
  };
  return (
    <>
      <div className="reg-container">
        <div className="login-form">
          <div className="paragraph">
            <p>Sign In</p>
          </div>
          <form onSubmit={submitHandler}>
            <div className="login-input-div">
              <label className="label">Email:</label>
              <input
                className="reg-inputs"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              ></input>
            </div>
            <div className="login-input-div">
              <label className="label">Password:</label>
              <input
                className="reg-inputs"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                type="password"
                onChange={handleChange}
              />
            </div>
            <div className="login-submit-div">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </form>
          <p className="paragraph-login">Don't have an account?</p>
          <h6 className="signup-link" onClick={handleSignUp}>
            Sign Up
          </h6>
        </div>
      </div>
    </>
  );
};

export default SignIn;
