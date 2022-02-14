import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/ContextProvider";
import { Button } from "../Button/Button";




const Login = () => {

    const navigate = useNavigate()
    const value = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }


    const handleInputs = async (event) => {
        // prevent the default form action
        event.preventDefault();
        
        const response  = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })



        //save the json response to data variable
        const data = await response.json()
        console.log(data);

        // check if status code is ok
        if(response.ok == true){
            const user = {username: data['username'], token: data['token']}
            value.setUser(user)
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