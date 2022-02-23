import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/ContextProvider";
import { Button } from "../../Button/Button";
import DisplayTasks from "../DisplayTasks/DisplayTasks"



function TaskForm(){

  const  { contextValues }  = useContext(UserContext);

  const [tasks, setTasks] = useState([])



  const [input, setInput] = useState('');
    
  //Set the value of the input to whatever the user types
  // (If this function does not exists, user cannot type)
  const handleChange= e =>{
      setInput(e.target.value)
  }

  const handleSubmit= e =>{
    e.preventDefault()
    // Clear the input field after submit
    setInput("")
}

  //post tasks to the server
  const sendTasks = async () => {

    // Check if input is empty. If not, proceed to send the task to server
    if(input.trim() !==""){
      await fetch('http://localhost:3001/tasks/add', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: input,
            user_id: contextValues.id,
            completed: false
          })    
        })
        // TODO: Delete
      console.log("Tasks sended!");
      // Call getTasks function to get the tasks after user submits the task
    }else{
      console.warn("Empty string!");
    }
  }
  

    
  //get all the tasks from the server
  const getTasks = async () => {
  
      const response  = await fetch('http://localhost:3001/tasks', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}           
      })
      const data = await  response.json();
      setTasks([...data])
      
  } 
  
  // Call tasks every time the tasks state is changed 
  useEffect(()=>{
    getTasks()
  },[tasks])
    

  //Delete tasks from the database
  const deleteTasks = async (id) => {

    // Check if input is empty. If not, proceed to send the task to server
      await fetch('http://localhost:3001/tasks/delete', {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            _id: id
          })    
        })
    }

  return(
    <div className="container flex-column input-container w-50 p-3 border" >
      <form onSubmit={handleSubmit}>

        <input
            type="text"
            className="form-control"
            name='task'
            value={input}
            onChange={handleChange} 
            placeholder="Add tasks"
        />
        
        <div className="d-grid gap-2">
          <Button event={sendTasks} text={"Add task"} />
        </div>
        
      </form>
      <DisplayTasks tasks={tasks} deleteTasks={deleteTasks}/>
    </div>
  )
}

export default TaskForm;