import { useContext } from 'react';

import { UserContext } from '../../../context/ContextProvider';

const Profile = () => {

    const globalState = useContext(UserContext);

    const {isLoggedIn} = globalState.contextValues;

    // Check is user is logged, if not display message, if yes proceed.
    if (isLoggedIn){
        return (
            <div>
                <h1> Welcome Back!</h1>
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
export default Profile