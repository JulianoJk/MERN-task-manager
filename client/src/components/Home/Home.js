import { Button } from "../Button/Button";
import { UserContext } from "../../context/ContextProvider";
import { useContext } from "react";

const Home = () => {

        const  globalState  = useContext(UserContext)


        //get all the tasks from the server
        const getTasks = async()=>{
            const response = await fetch('http://localhost:3001/tasks',{
                method: "GET",
                headers:{
                    "Content-Type": "application/json"                
                }
            })

            const data = await response.json()
        }

        const show = () =>{
<<<<<<< HEAD
            console.log(globalState.contextValues);
=======
            console.log(globalState.globalState);
>>>>>>> 72510c7299e099ee5e62e39f174bbc6cbfc97f9e
        }

    return (
        <div>
                <h1>
                    Home
                </h1>
            <Button event={show} text ={"Console log user info"} />
        </div>
    )
}

export default Home