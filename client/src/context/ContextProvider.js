import React, { useReducer} from 'react'

// Initial state for the user info along with the status 
const userState = {
    username: '', 
    token: '', 
    id: '',
    // Default state for the user's state(login)
    isLoggedIn: false,
    // change the login state
    login: (token) => {},
    logout: () => {}
}

// Create userContext and pass as default the userState
export const UserContext = React.createContext(userState)

// Create a reducer function with all the necessary 
const reducer = (state, action) =>{
    switch(action.type){
        // If the setUser is called in a dispatch and the type has setUser, given the data that are passed, update the variables
        case "setUser":
            return { ...state, username: action.username, token: action.token, id: action.id };
        case "setLogIn":
            return {...state, token: action.token}
        default:
            return{...state}
    }
}

const ContextProvider = (props) => {
    
    const [globalState, dispatch] = useReducer(reducer, userState)

    // Convert the variable into a boolean, returning either true or false
    // If token is an empty string, returns false, otherwise true
    const userIsLoggedIn = !!globalState.token;

    // Handle the token when the user logs in/register
    const loginHandler = (token) => {
        setToken(token);
      };
    
      const logoutHandler = () => {
        setToken(null);
      };


    return (

        <UserContext.Provider value={{globalState, dispatch}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default ContextProvider