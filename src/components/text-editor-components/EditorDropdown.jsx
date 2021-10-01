import styles from "./EditorDropdown.module.css";
import PropTypes from "prop-types";

function EditorDropdown({options, onToggle, value}) {

    const handleChange = (e) => {
        onToggle(e.target.value);
    }

    return  <select className={styles.dropdown} onChange={handleChange} value={value}>
                {options.map((opt) => (
                    <option key={opt.style} value={opt.style}>{opt.label}</option>
                ))}
            </select>
}

EditorDropdown.propTypes = {
    options: PropTypes.arrayOf({
        style: PropTypes.string,
        label: PropTypes.string
    }),
    onToggle: PropTypes.function,
    value: PropTypes.string
};

export default EditorDropdown;