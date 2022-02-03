import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/ContextProvider"


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

    const submit = async (event) => {

        const response = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        const data = await response.json()
        console.log(data)
        const user = {username: data['username'], token: data['token']}
        value.setUser(user)
        navigate('/profile')
    }

    return (
        <div className="container flex-column" style={{width: "50%"}}>
            <h1>Login</h1>
                {/*Email Input*/}
                <label htmlFor="email" className="control-label text"><strong>Email:</strong></label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={onEmailChange} />
                <br />

                <label htmlFor="password" className="control-label text"><strong>Password:</strong></label>
                <input type="password" className="form-control" id="password" onChange={onPasswordChange} placeholder="Password"/>
                <br />
                <div className="d-grid gap-2">
                <button className="btn btn-success flex-wrap " onClick={submit}>Submit</button>
                </div>
        </div>
    )
}

export default Login