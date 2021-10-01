import EditorButton from "./EditorButton";
import styles from "./ButtonGroup.module.css";
import PropTypes from "prop-types";

function ButtonGroup({buttons, onToggle, ifActive}) {



    return  <div className={styles.buttonGroup}>
                {buttons.map((button) => (
                    <EditorButton
                        isActive={ifActive(button.style)}
                        key={button.style} 
                        onToggle={onToggle}
                        style={button.style}
                        label={button.label}/>
                ))}
            </div>
}

ButtonGroup.propTypes = {
    buttons: PropTypes.arrayOf({
        style: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    }),
    onToggle: PropTypes.function,
    ifActive: PropTypes.boolean
};

export default ButtonGroup;