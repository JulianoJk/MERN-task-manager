import { Button } from "../../Button/Button";
import { UserContext } from "../../../context/ContextProvider";
import { useContext } from "react";


const Home = () => {

    const  { contextValues }  = useContext(UserContext);

    const {isLoggedIn} = contextValues;

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
        console.log(contextValues);
        console.log(isLoggedIn);
    }
    // Check is user is logged, if not display message, if yes proceed.
    if (isLoggedIn){
        return (
            <div>
                <h1>
                Home
                </h1>
            <Button event={show} text ={"Console log user info"} />
        </div>
        )
    }else{
        return (
            <div>
                <h1> No Account found! Log-In/Register to proceed!</h1>
            </div>
        )
    }
}


export default Home