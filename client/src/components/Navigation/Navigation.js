import { UserContext } from "../../context/ContextProvider";
import { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import Menu from "../../components/Header/Menu/Menu";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";


const Navigation = () => {

  const  { contextValues }  = useContext(UserContext);
  const {isLoggedIn} = contextValues;

  const navigate = useNavigate()


  const logOut = () => {
    contextValues.logout();
    navigate('/')
  };

  if(isLoggedIn){
    return(
      <header >
        <nav>
          <div className="d-flex flex-row-reverse bd-highlight" >          
            {/* If user is logged in, display Home, profile and logout button */}
            {isLoggedIn && (
              <div className="btn-group flex-wrap" role="group">
                  <Link to="/home" className="btn btn-outline-primary text-light text-opacity-75">Home </Link> 

                  <Link to='/profile' className="btn btn-outline-primary text-white text-opacity-75" >Profile </Link> 
              </div>
            )}{isLoggedIn && (
              
              <Button event={logOut} text={"Logout"} />
            )}
          </div>
        </nav>
      </header>
    );
  }else if(!isLoggedIn){
    return(
      <header >
        <nav>
          <div className="d-flex flex-row-reverse bd-highlight" >          
          {/* If user is not logged, display menu to login and register */}
          {!isLoggedIn && (
            <Menu />
          )}
          </div>
        </nav>
      </header>
    );
  }
};

export default Navigation;
