import styles from "./Button.module.css"
// Pass the text the button will have and the onClick event
export const Button = ({ text, event }) => {
  return <button className={`btn btn-success flex-wrap ${styles.space }`} onClick={event}>{text}</button>;
};
