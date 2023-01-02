import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        if (e.target.value && e.target.value.length > 20) {
          setFormError({
            ...formError,
            [e.target.name]: "Name can't be more than 20 characters",
          });
          setFormData({ ...formData, [e.target.name]: e.target.value });
          break;
        } else {
          setFormError({
            ...formError,
            [e.target.name]: "",
          });
          setFormData({ ...formData, [e.target.name]: e.target.value });
          break;
        }
      case "email":
        let array = e.target.value.split("@");
        if (e.target.value && array.length <= 1) {
          setFormError({
            ...formError,
            [e.target.name]: "Email must contain @ in the middle",
          });
          setFormData({ ...formData, [e.target.name]: e.target.value });
          break;
        } else {
          setFormError({
            ...formError,
            [e.target.name]: "",
          });
          setFormData({ ...formData, [e.target.name]: e.target.value });
          break;
        }
      case "password":
        if (
          e.target.value.length > 10 ||
          (e.target.value.length < 6 && e.target.value)
        ) {
          setFormError({
            ...formError,
            [e.target.name]:
              "Password must be more than 6 characters and less than 10 characters",
          });
          setFormData({ ...formData, [e.target.name]: e.target.value });
          break;
        } else {
          setFormError({
            ...formError,
            [e.target.name]: "",
          });
          setFormData({ ...formData, [e.target.name]: e.target.value });
          break;
        }
      case "confirmPassword":
        if (
          e.target.value.length > 10 ||
          (e.target.value.length < 6 && e.target.value)
        ) {
          setFormError({
            ...formError,
            [e.target.name]:
              "Password must be more than 6 characters and less than 10 characters",
          });
          setFormData({ ...formData, [e.target.name]: e.target.value });
          break;
        } else {
          setFormError({
            ...formError,
            [e.target.name]: "",
          });
          setFormData({ ...formData, [e.target.name]: e.target.value });
          break;
        }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let { name, email, password, confirmPassword } = formError;
    if (name || email || password || confirmPassword) {
      alert("Invalid credentials");
    } else if (formData.password !== formData.confirmPassword) {
      alert("Password do not match");
    } else {
      const response = await fetch(
        "https://blog-embifi.onrender.com/users/register",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (responseData.result === "error") {
        alert(responseData.message);
      } else {
        alert(responseData.message);
        dispatch({
          type: "REGISTER",
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
    }
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
              required
              className="reg-inputs"
              placeholder="Enter your name"
              type="text"
              name="name"
              onChange={handleChange}
            />
            <p className="h6">{formError.name}</p>
          </div>
          <div className="input-div">
            <label className="label">Email:</label>
            <input
              required
              className="reg-inputs"
              placeholder="Enter your email address"
              type="text"
              name="email"
              onChange={handleChange}
            />
            <p className="h6">{formError.email}</p>
          </div>
          <div className="input-div">
            <label className="label">Password:</label>
            <input
              required
              className="reg-inputs"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
            <p className="h6">{formError.password}</p>
          </div>
          <div className="input-div">
            <label className="label">Confirm Password:</label>
            <input
              required
              className="reg-inputs"
              type="password"
              name="confirmPassword"
              placeholder="Please confirm your password"
              onChange={handleChange}
            />
            <p className="h6">{formError.confirmPassword}</p>
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
