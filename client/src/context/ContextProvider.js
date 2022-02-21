import React, { useEffect, useReducer, useState} from 'react'

// Initial state for the user info along with the status 
const userState = {
    username: '', 
    token: '', 
    id: '',
    // Default state for the user's state(login)
    isLoggedIn: false,
    login: (token) => {},
    logout: ()=>{}
}

// Create userContext and pass as default the userState
export const UserContext = React.createContext(userState)

// Create a reducer function with all the necessary 
const reducer = (state, action) =>{
    switch(action.type){
        // If the setUser is called in a dispatch and the type has setUser, given the data that are passed, update the variables
        case "setUser":
            return { ...state, username: action.username, token: action.token, id: action.id };
        
        default:
            return{...state}
    }
}



const ContextProvider = (props) => {
    
    const [globalState, dispatch] = useReducer(reducer, userState)

    
    // Save token to localStorage
    const loginHandler = (tokenData) => {
        localStorage.setItem("userToken", JSON.stringify(tokenData));
        
    };

    // Handle log out
    const logoutHandler = () => {        
        contextValues.token = null
        contextValues.isLoggedIn = false;
        localStorage.removeItem('userToken');
    };

    // Convert the variable into a boolean, returning either true or false
    // If token is an empty string, returns false, otherwise true
    let userIsLoggedIn= !!globalState.token;
        

    //   Set the states of the values from the useReducer
    const contextValues ={
        username: globalState.username, 
        token: globalState.token, 
        id: globalState.id,
        // Apply the boolean from the userIsLoggedIn
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }


    return (

        <UserContext.Provider value={{contextValues, dispatch}}>            
            {props.children}
        </UserContext.Provider>
    )
}

export default ContextProvider