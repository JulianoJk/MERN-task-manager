import React, {useState} from 'react'

<<<<<<< Updated upstream
export const UserContext = React.createContext()
=======
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
        default:
            return{...state}
    }
}
>>>>>>> Stashed changes



const ContextProvider = (props) => {
    
<<<<<<< Updated upstream
    const [user, setUser] = useState({
        username: '', 
        token: '', 
        id: ''    
    })
=======
    const [globalState, dispatch] = useReducer(reducer, userState)

    // Save token to localStorage
    const handleTokenLogin = () => {
        localStorage.setItem('token', token);
     };

    // Remove token from localStorage
    const handleTokenLogout = () => {
        localStorage.removeItem('token');
    };

    // Convert the variable into a boolean, returning either true or false
    // If token is an empty string, returns false, otherwise true
    const userIsLoggedIn = !!globalState.token;

    // Handle the token when the user logs in/register
    const loginHandler = (token) => {
        setToken(token);
        // Call the function to save the token
        handleTokenLogin();

      };
    
      const logoutHandler = () => {
        setToken(null);
        handleTokenLogout();
      };
>>>>>>> Stashed changes

    //   Set the states of the values from the useReducer
      const contextValues ={
        username: globalState.username, 
        token: globalState.token, 
        id: globalState.id,
        // Apply the boolean from the userIsLoggedIn
        isLoggedIn: userIsLoggedIn,
        // change the login state
        login: loginHandler,
        logout: logoutHandler
      }

    return (
<<<<<<< Updated upstream
        <UserContext.Provider value={
            {user: user, 
            setUser: setUser}}>
=======

        <UserContext.Provider value={{contextValues, dispatch}}>
>>>>>>> Stashed changes
            {props.children}
        </UserContext.Provider>
    )
}

export default ContextProvider