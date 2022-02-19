import { useContext } from 'react';

import { UserContext } from '../../context/ContextProvider';
import { useNavigate } from "react-router-dom";


const MainNavigation = () => {
  const authCtx = useContext(UserContext);
  

  const navigate = useNavigate();


  const isLoggedIn = authCtx.isLoggedIn;

  // Take the path of to link (home & profile) and check is the user is logged in
  const homeHandler = ( destination ) =>{
    try {
      if(isLoggedIn){
        navigate(`$(destination)`)
      }else if(!isLoggedIn){
        console.log("User is not logged!");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default MainNavigation;

