import styles from "./EditorButton.module.css";
import PropTypes from "prop-types";

function EditorButton({style, onToggle, label, isActive}) {

    const handleClick = () => {
        onToggle(style);
    }

    return <button className={isActive ? `${styles.button} ${styles.buttonActive}` : styles.button} onClick={handleClick}><span className={`${styles.icon} ${styles[label]}`}></span></button>
}

EditorButton.propTypes = {
    style: PropTypes.string,
    onToggle: PropTypes.function,
    label: PropTypes.string,
    isActive: PropTypes.boolean
};

export default EditorButton;