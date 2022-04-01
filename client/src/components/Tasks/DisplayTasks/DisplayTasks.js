import { Button } from "../../Button/Button";
import styles from "./DisplayTasks.module.css";

function DisplayTasks(props) {
  return (
    <div>
      {props.tasks
        .map((todo, index) => (
          <div
            key={index}
            className={`container flex-column ${styles.task_container}`}
          >
            <input
              type="checkbox"
              name="checkbox"
              id={todo._id}
              onClick={() => props.updateTasks(todo._id, todo.completed)}
            />
            <label htmlFor={todo._id} className={`${styles.task}`}>
              {todo.name}
            </label>

            <Button
              text={"Delete"}
              onClick={() => {
                props.deleteTasks(todo._id);
              }}
            />
          </div>
        ))
        .reverse()}
    </div>
  );
}

export default DisplayTasks;
