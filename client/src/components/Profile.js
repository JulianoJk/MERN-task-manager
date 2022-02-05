import { useEffect } from "react"
import { useContext, useState } from "react"
import { UserContext } from "../context/ContextProvider"

const Profile = () => {

    const value = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState(value.user)
    

    useEffect(() => {

        console.log(value.user.username)
    })

    return (
        <div>
            <h1>Welcome back {value.user.username}</h1>
        </div>
    )
}

export default Profile