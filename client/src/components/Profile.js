import { useEffect } from "react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { UserContext } from "../context/ContextProvider"

const Profile = () => {

    
    const navigate = useNavigate()
    const value = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState(value.user)
    

    //TODO: If there is no user, navigate to login
    if(currentUser===''){
        alert('No user!')        
    }

    useEffect(() => {

        console.log(currentUser)
    }, [currentUser])

    return (
        <div>
            <h1>Welcome back {value.user.username}</h1>
        </div>
    )
}

export default Profile