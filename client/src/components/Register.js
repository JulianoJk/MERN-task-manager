import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/ContextProvider"

const Register = () => {

    const navigate = useNavigate()
    
    const {user, setUser} = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleInputs = async (event) => {
        // prevent the default form action
        event.preventDefault();
        const response = await fetch('http://localhost:3001/users/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": email,
                "username": name,
                "password": password,
                "passwordRepeat":confirmPassword
            })
        })

        const data = await response.json();
        console.log(data);
        // check if status code is ok
         if(response.ok == true){
            //Set user name, token(extracted from the json), and id
            setUser({      
            "username": name,
            "token": data.token,
            "id": data._id
        })
            //TODO: Change
            alert("Submitted")
            //  After everything is okay, navigate to the user's home
            navigate('/home');
            console.log(data);  
        // If response is not okay, alert the client with the message response  
        }else if(response.ok ==false){
            console.warn(data.message);
            alert(data.message)
        }
    }
    return (

        <div className="container flex-column" style={{ width: "50%" }}>
            <h1>Register</h1>
            <form onSubmit={ handleInputs }>
                
                {/*Email Input, required with minimum length of 8 characters*/}

                <label htmlFor="email" className="control-label text"><strong>Email:</strong></label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={onEmailChange}
                required minLength="8"/>
                <br />

                <label htmlFor="Username" className="control-label text"><strong>Username:</strong></label>
                <input type="text" className="form-control" id="Username" placeholder="John Smith"
                onChange={ onNameChange } />
                <br />

                <label htmlFor="password" className="control-label text" ><strong>Password:</strong></label>
                <input type="password" className="form-control" id="password"  placeholder="Password" onChange={handlePassword} 
                required minLength="6"/>
                <br />

                <label htmlFor="confirmPassword" className="control-label text"><strong>Confirm Password:</strong></label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" onChange={handleConfirmPassword} required minLength="6"/>
                <br />

                <div className="d-grid gap-2">
                <button className="btn btn-success flex-wrap">Submit</button>
                </div>
            </form>
 
            {/* link to login */}
            <a href="/login" className="text flex-wrap link-light" >Already a member?</a>
        </div>
    )
}

export default Register