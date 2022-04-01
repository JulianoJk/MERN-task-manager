import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../Button/Button";
import Logo from "../../../images/logo.png";
import "../Auth.css";
import { useTaskDispatch } from "../../../context/TaskContext";

const initState = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.email };
    case "SET_NAME":
      return { ...state, name: action.name };
    case "SET_PASSWORD":
      return { ...state, password: action.password };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.confirmPassword };
    default:
      return { ...state };
  }
};

const Register = () => {
  const navigate = useNavigate();
  const [internalState, formDispatch] = useReducer(reducer, initState);
  const taskDispatch = useTaskDispatch();

  const onEmailChange = (event) => {
    formDispatch({ type: "SET_EMAIL", email: event.target.value });
  };
  const onNameChange = (event) => {
    formDispatch({ type: "SET_NAME", name: event.target.value });
  };

  const handlePassword = (event) => {
    formDispatch({ type: "SET_PASSWORD", password: event.target.value });
  };

  const handleConfirmPassword = (event) => {
    formDispatch({
      type: "SET_CONFIRM_PASSWORD",
      confirmPassword: event.target.value,
    });
  };

  const handleInputs = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: internalState.email,
        username: internalState.name,
        password: internalState.password,
        passwordRepeat: internalState.confirmPassword,
      }),
    });

    const data = await response.json();
    if (response.ok == true) {
      const user = {
        id: data["id"],
        username: data["username"],
        token: data["token"],
      };
      taskDispatch({ type: "SET_USER", user: user });
      taskDispatch({ type: "SET_IS_LOGGED_IN", isLoggedIn: true });
      navigate("/home");
    } else {
      console.warn(data.message);
      alert(data.message);
    }
  };

  return (
    <div className="container flex-column input-container w-50 p-3 border border_style">
      <div>
        <img src={Logo} alt="Logo-image" className="rounded mx-auto d-block " />
      </div>

      <h1 className="title">Register</h1>
      <form onSubmit={handleInputs}>
        <label htmlFor="email" className="control-label text">
          <strong>Email:</strong>
        </label>
        <input
          type="email"
          value={internalState.email}
          className="form-control"
          id="email"
          placeholder="name@example.com"
          onChange={onEmailChange}
          required
          minLength="8"
          autoComplete="on"
        />
        <br />
        <label htmlFor="Username" className="control-label text">
          <strong>Username:</strong>
        </label>
        <input
          type="text"
          value={internalState.name}
          className="form-control"
          id="Username"
          placeholder="John Smith"
          onChange={onNameChange}
          autoComplete="on"
        />
        <br />
        <label htmlFor="password" className="control-label text">
          <strong>Password:</strong>
        </label>
        <input
          type="password"
          value={internalState.password}
          className="form-control"
          id="password"
          placeholder="Password"
          onChange={handlePassword}
          required
          minLength="6"
          autoComplete="on"
        />
        <br />
        <label htmlFor="confirmPassword" className="control-label text">
          <strong>Confirm Password:</strong>
        </label>
        <input
          type="password"
          value={internalState.confirmPassword}
          className="form-control"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleConfirmPassword}
          required
          minLength="6"
          autoComplete="on"
        />
        <br />
        <div className="d-grid gap-2">
          <Button text={"Submit"} />
        </div>
      </form>
      <Link to="/login" className="text flex-wrap link-light">
        Already a member?
      </Link>
    </div>
  );
};

export default Register;
