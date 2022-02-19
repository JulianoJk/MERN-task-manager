import { useState } from "react";
function TodoForm(  {addTodos}  ){


  const [input, setInput] = useState('');
  //id by getting the count
  const [count, setCount] = useState(0);

  //todo: DELETE
  const [get, setGet] = useState(0);

  //Set the value of the input to whatever the user types
  // (If this function does not exists, user cannot type)
  const handleChange= e =>{
      e.preventDefault()
      setInput(e.target.value)
  }


  //Add a new id based on the number the task is typed

  const handleID = () =>{
    setCount(count + 1);
    setGet(get + 1)
  }
  
  const handleSubmit = e =>{
    //Prevent default browser form submission
    e.preventDefault();
      
      //Add the new todo with an id and 
      addTodos({
          id: count,
          text: input,
          completed: false
      })

      
      setInput('')

    }


  return <div>
    <div className="newTask">
      <form onSubmit={handleSubmit}>
          <input
              type="text"
              name='text'
              value={input}
              onChange={handleChange}
          />
          <button type="submit" onClick={handleID}>add Todo</button>
      </form>
      </div>
  </div>
}

export default TodoForm;