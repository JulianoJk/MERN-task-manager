import { useContext, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/ContextProvider";
import { Button } from "../../Button/Button";


// Initialized state for every state needed
const initState = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
};

// reducer function needed for the useReducer
// Depending on which action type is called, set the value of the state
const reducer = (state, action) => {
  switch (action.type) {
    case "setEmail":
      return { ...state, email: action.email };
    case "setName":
      return { ...state, name: action.name };
    case "setPassword":
      return { ...state, password: action.password };
    case "setConfirmPassword":
      return { ...state, confirmPassword: action.confirmPassword };
    default:
      return { ...state };
  }
}; 

const Register = () => {

  const navigate = useNavigate();
  
  const {contextValues, dispatch} = useContext(UserContext)

  const [state, formDispatch] = useReducer(reducer, initState);

  const onEmailChange = (event) => {
    formDispatch( { type: "setEmail", email: event.target.value } );
  };
  const onNameChange = (event) => {
    formDispatch( { type: "setName", name: event.target.value } );  
  };

  const handlePassword = (event) => {
    formDispatch( { type: "setPassword", password: event.target.value } );  
  };

  const handleConfirmPassword = (event) => {
    formDispatch( { type: "setConfirmPassword", confirmPassword: event.target.value } );  
  };


  const handleInputs = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: state.email,
        username: state.name,
        password: state.password,
        passwordRepeat: state.confirmPassword,
      }),
    });

      
    const data = await response.json();

    // check if status code is ok
    if (response.ok == true) {

      // Set the state of user context through the values extracted from the server
      dispatch({type: "setUser", username: data['username'], token: data['token'], id: data['id']})

      // Change the boolean of the user's login to true
      dispatch({type: "setStatus", isLoggedIn: true })

      // set the token to the login function  
      dispatch({type: "setLogIn", login: data.token})

      contextValues.login(data['token']);
      
      //TODO: Change
      alert("Submitted");


      //  After everything is okay, navigate to the user's home

      navigate("/home");

      console.log(data);
      
      // If response is not okay, alert the client with the message response
    }else if (response.ok == false) {
        console.warn(data.message);
        alert(data.message);
    };
  };

  return (
    <div className="container flex-column input-container">
      <h1>Register</h1>
      <form onSubmit={handleInputs}>
        {/*Email Input, required with minimum length of 8 characters*/}

        <label htmlFor="email" className="control-label text">
          <strong>Email:</strong>
        </label>
        <input
          type="email"
          value={state.email}
          className="form-control"
          id="email"
          placeholder="name@example.com"
          onChange={onEmailChange}
          required
          minLength="8"
        />
        <br />

        <label htmlFor="Username" className="control-label text">
          <strong>Username:</strong>
        </label>
        <input
          type="text"
          value={state.name}
          className="form-control"
          id="Username"
          placeholder="John Smith"
          onChange={onNameChange}
        />

        <br />

        <label htmlFor="password" className="control-label text">
          <strong>Password:</strong>
        </label>
        <input
          type="password"
          value={state.password}
          className="form-control"
          id="password"
          placeholder="Password"
          onChange={handlePassword}
          required
          minLength="6"
        />

        <br />

        <label htmlFor="confirmPassword" className="control-label text">
          <strong>Confirm Password:</strong>
        </label>
        <input
          type="password"
          value={state.confirmPassword}
          className="form-control"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleConfirmPassword}
          required
          minLength="6"
        />
        <br />

        <div className="d-grid gap-2">
          <Button text={"Submit"} />
        </div>
      </form>

      {/* link to login */}
      <Link to="/login" className="text flex-wrap link-light">
        Already a member?
      </Link>
    </div>
  );
};

export default Register;