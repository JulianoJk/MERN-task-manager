import styles from './Button.module.css';
// Pass the text the button will have and the onClick event
export const Button = ({ text, onClick }) => {
	return (
		<button className={`btn btn-success flex-wrap ${styles.space}`} onClick={onClick}>
			{text}
		</button>
	);
};
