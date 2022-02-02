import Logo from '../images/logo.png';
import "../App.css"
const Home = () => {
    return (
        <div>
            {/* container for the logo */}
            <div style={{margin: "10px"}}>
                <img src={Logo} alt="Logo-image" className="rounded mx-auto d-block " />
            </div>
            <div className="d-flex justify-content-center" style={{margin: "7px"}}>
                <h2 className="lead">PROJECT MANAGEMENT</h2>
            </div>            
            <div className="d-flex justify-content-center" style={{margin: "7px"}}>
                <h2 className="blockquote"><em>
                No need memorizing things!
                </em></h2>
            </div>

        </div>
    )
}

export default Home