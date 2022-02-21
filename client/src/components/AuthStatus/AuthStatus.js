import { UserContext } from "../../context/ContextProvider";
import { useContext } from "react";


export default function AuthStatus() {
    const  { contextValues }  = useContext(UserContext);

    // Save token to localStorage
    const handleTokenLogin = () => {
        localStorage.setItem("userToken", JSON.stringify(contextValues.token));
    };


    // Remove token from localStorage
    const handleTokenLogout = () => {
        localStorage.removeItem('userToken');
    };

    useEffect(()=>{
        handleTokenLogin()
    }, [contextValues.token])


}