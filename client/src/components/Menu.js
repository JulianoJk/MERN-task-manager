import { Link } from 'react-router-dom';
const Menu = () => {
    return (
        // Create a responsive header menu bar
        <div className="d-flex flex-row-reverse bd-highlight" style={{margin: "7px"}}>
            {/* create a responsive btn group */}
            <div className="btn-group flex-wrap" role="group">
                
                <Link to="/" className="btn btn-outline-primary text-light text-opacity-75">Index</Link>                 
                <Link to="/home" className="btn btn-outline-primary text-light text-opacity-75">Home </Link> 

                <Link to='/profile' className="btn btn-outline-primary text-white text-opacity-75" >Profile </Link> 

                <Link to='/login' className="btn btn-outline-primary text-info">Login </Link> 

                <Link to='/register' className="btn btn-primary bg-info text-white">Register</Link>
            </div>

        </div>
    )

}

export default Menu