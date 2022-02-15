import { Button } from "../Button/Button";

const Home = () => {
        //get all the tasks from the server
        const getTasks = async()=>{
            const response = await fetch('http://localhost:3001/tasks',{
                method: "GET",
                headers:{
                    "Content-Type": "application/json"                }
            })

            const data = await response.json()
            console.log(data)

        }
    return (
        <div>
            <h1>
                Home
            </h1>
            <Button event={getTasks} text ={"Get Tasks"} />
        </div>
    )
}

export default Home