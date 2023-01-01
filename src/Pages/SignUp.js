import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/users/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const responseData = await response.json();
    localStorage.setItem("token", responseData.token);
    alert(responseData.message);
    navigate("/");
  };

  return (
    <div className="reg-container">
      <div className="reg-form">
        <div className="paragraph">
          <p>Create a New Account</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="input-div">
            <label className="label">Name:</label>
            <input
              className="reg-inputs"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            ></input>
          </div>
          <div className="input-div">
            <label className="label">Email:</label>
            <input
              className="reg-inputs"
              type="text"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
            ></input>
          </div>
          <div className="input-div">
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
          <div className="input-div">
            <label className="label">Confirm Password:</label>
            <input
              className="reg-inputs"
              name="confirmPassword"
              placeholder="Please confirm your password"
              value={formData.confirmPassword}
              type="password"
              onChange={handleChange}
            />
          </div>
          <div className="submit-div">
            <button type="submit" className="reg-button">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
