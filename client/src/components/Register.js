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

    const handleInputs = e=>{
        e.preventDefault();
        //Check if email is null
        // TODO: add more characters as for the limit
        if (email.length!== 0){
            // Check if passwords match and they are not null
            if(password === confirmPassword && confirmPassword.length!=0){
                submit();   
            }else{
                // TODO: Fix this
                alert("Passwords do not match!");
            }
        }else{
            // TODO: Fix this
            console.log("Email can not be null");
        }
    }

    const submit = async (event) => {

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
        const data = await response.json()
        console.log(data)
        //Set user name, token(extracted from the json)
        //TODO: Change
        setUser({      
            "username": name,
            "token": data.token,
            "id": data._id
        })

        alert("Submited!")
        navigate('/profile')
    }

    return (

        <div className="container flex-column" style={{width: "50%"}}>
            <h1>Register</h1>
            <form onSubmit={handleInputs}>
                {/*Email Input*/}
                <label htmlFor="email" className="control-label text"><strong>Email:</strong></label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={onEmailChange}
                required minLength="8"/>
                <br />
                {/* TODO: Add onChange for the name */}
                <label htmlFor="Username" className="control-label text"><strong>Username:</strong></label>
                <input type="text" className="form-control" id="Username" placeholder="John Smith"
                onChange={onNameChange} />
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
            {/* links to login */}
            <a href="/login" className="text flex-wrap link-light" >Already a member?</a>
        </div>
    )
}

export default Register