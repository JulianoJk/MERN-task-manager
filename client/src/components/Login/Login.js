import { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/ContextProvider";
import { Button } from "../Button/Button";



const initState = {
    email: "",
    password: ""
}   

const reducer = (state, action) =>{
    switch(action.type){
        case "GET_EMAIL":
            return { ...state, email: action.email };
        case "GET_PASSWORD":
            return {...state, password: action.password}
        default:
            return{...state}
    }
}

const Login = () => {

    const navigate = useNavigate()
    // Get the context of the user's info

    const userState = useContext(UserContext)
    
    const [state, dispatch] = useReducer(reducer, initState);   

    //Set the action type and the value for the useReducer 
    const onEmailChange = (event) => {
        dispatch({type: "GET_EMAIL", email: event.target.value})
    }

    const onPasswordChange = (event) => {
        dispatch({type: "GET_PASSWORD", password: event.target.value})
    }


    const handleInputs = async (event) => {
        // prevent the default form action
        event.preventDefault();
        
        const response  = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({

                // set the email and password from the state 

                "email": state.email,
                
                "password": state.password
                
            })
        })



        //save the json response to data variable
        const data = await response.json()
        console.log(data.id);

        // check if status code is ok
        if(response.ok == true){
            
            // Set the state of user context through the values extracted from the server
            userState.dispatch({type: "setUser", username: data['username'], token: data['token'], id: data['id'], isLoggedIn: true})

            userState.dispatch({type: "setStatus", isLoggedIn: true})

            navigate('/home')
        // If response is not okay, alert the client with the message response  
        }else if(response.ok ==false){
            console.warn(data.message);
            alert(data.message)
        }
    }


    return (
        <div className="container flex-column" style={{width: "50%"}}>
            <h1>Login</h1>
            <form onSubmit={handleInputs} >
                {/*Email Input*/}
                <label htmlFor="email" className="control-label text"><strong>Email:</strong></label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={onEmailChange} />
                <br />

                <label htmlFor="password" className="control-label text"><strong>Password:</strong></label>
                <input type="password" className="form-control" id="password" onChange={onPasswordChange} placeholder="Password"/>
                <br />
                <div className="d-grid gap-2">
                    <Button text={"Submit"} />
                </div>
            </form>
            
            {/* Links to change password or register */}
            <a href="/password-reset" className="text flex-wrap link-light" >Forgot your password?</a>
            <br />
            <a href="/register" className="text flex-wrap link-light" >Not a member?</a>
        </div>
    )
}

export default Login