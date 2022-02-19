function DisplayTasks( {  todos } ) {
    
    

    return (
        <div id="displayTasks">
            <hr />
            <ul>
                {/* Display each task using .map() */}
                {todos.map(todo=> 
                    <li key={todo.id}>
                        {todo.text}  
                    </li>) }
            </ul>
        </div>
    );
}

export default DisplayTasks;