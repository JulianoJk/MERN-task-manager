import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/ContextProvider"

const Register = () => {

    const navigate = useNavigate()
    const value = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }

    const handleInputs = ()=>{
        //Check if email is null
        // TODO: add more characters as for the limit
        if (email.length!== 0){
            // Check if passwords match and they are not null
            if(password === confirmPassword && confirmPassword.length!=0){
                // TODO: CHANGE TO SUBMIT!!!!!!!!!!!!!!!!
                console.log("Okey!");
                submit()
            }else{
                // TODO: Fix this
                console.log("Wrong Password!");
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
                "user": user,
                "password": password
            })
        })
        const data = await response.json()
        console.log(data)
        value.setUser(user)
        navigate('/profile')
    }




    return (
        <div className="container flex-column" style={{width: "50%"}}>
            <h1>Register</h1>
                {/*Email Input*/}
                <label htmlFor="email" className="control-label text"><strong>Email:</strong></label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={onEmailChange}/>
                <br />
                {/* TODO: Add onChange for the name */}
                <label htmlFor="Username" className="control-label text"><strong>Username:</strong></label>
                <input type="email" className="form-control" id="Username" placeholder="John Smith" />
                <br />

                <label htmlFor="password" className="control-label text" ><strong>Password:</strong></label>
                <input type="password" className="form-control" id="password"  placeholder="Password" onChange={handlePassword}/>
                <br />

                <label htmlFor="confirmPassword" className="control-label text"><strong>Confirm Password:</strong></label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" onChange={handleConfirmPassword}/>
                <br />

                <div className="d-grid gap-2">
                <button className="btn btn-success flex-wrap" onClick={handleInputs} >Submit</button>
                </div>
        </div>
    )
}

export default Register