import styles from "./EditorButton.module.css";

export default function EditorButton({style, onToggle, label, isActive}) {

    const handleClick = (e) => {
        onToggle(style);
    }

    return <button className={isActive ? `${styles.button} ${styles.buttonActive}` : styles.button} onClick={handleClick}><span className={`${styles.icon} ${styles[label]}`}></span></button>
}