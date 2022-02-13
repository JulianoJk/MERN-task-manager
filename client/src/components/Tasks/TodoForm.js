import { useState } from "react";

export default function TodoForm() {
    const [input, setInput] = useState('');

    const handleInput = (e) =>{
        setInput(e.target.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
            <input
              type="text"
              name='taskInput'
              value={input}
              onChange={handleInput}
              placeholder="Add a new task..."
            />
            </form>
        </div>
    )
}