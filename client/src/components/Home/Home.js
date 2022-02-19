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
            console.log(globalState.globalState);
        }

    return (
        <div>
                <h1>
                    Home
                </h1>
            <Button event={show} text ={"Get Tasks"} />
        </div>
    )
}

export default Home