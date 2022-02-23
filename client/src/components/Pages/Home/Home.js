import { UserContext } from "../../../context/ContextProvider";
import { useContext } from "react";
import TaskForm from "../../Tasks/TaskForm/TaskForm";


const Home = () => {

    const  { contextValues }  = useContext(UserContext);

    const {isLoggedIn} = contextValues;

    // Check is user is logged, if not display message, if yes proceed.
    if (isLoggedIn){
        return (
            <div>
                <TaskForm />            
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