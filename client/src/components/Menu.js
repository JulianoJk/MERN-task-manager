
const Menu = () => {
    return (
        // Create a responsive header menu bar
        <div className="d-flex flex-row-reverse bd-highlight" style={{margin: "7px"}}>
            {/* create a responsive btn group */}
            <div className="btn-group flex-wrap" role="group">
                <a href='' className="btn btn-outline-primary text-light text-opacity-75">Home </a> 

                <a href='' className="btn btn-outline-primary text-white text-opacity-75" >Profile </a> 

                <a href='' className="btn btn-outline-primary text-info">Login </a> 

                <a href="" className="btn btn-primary bg-info text-white">Register</a>
            </div>

        </div>
    )

}

export default Menu