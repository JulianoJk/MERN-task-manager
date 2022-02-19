import { useState } from "react";
import { Button } from "../Button/Button";
import TodoForm from "./TodoForm";


export default function Todos(){

  const [todos, setTodos] = useState([])


    

    //Add new Todos into the todos state, and update whenever a new one is inserted
    const addTodos = (newTask) =>{

        //Save all the todos(using spread operation) to the saved array
        let saved = [...todos];
        //add to the array the new todo
        saved.push(newTask);
        //change the old array of todos with the new one
        setTodos(saved)
        //TODO: delete
        console.log(newTask, ...todos)
    }

    return (
      <div>
        <div className="newTask">
          <h2>Keep track of your tasks!</h2>
        </div>
        <TodoForm addTodos={addTodos}/>
        {/* Pass the array with the saved tasks to display */}
        <DisplayTasks todos={todos}  /> 
        <Button text={"get Tasks"} onClick={getTasks}
      </div>
    );
  };