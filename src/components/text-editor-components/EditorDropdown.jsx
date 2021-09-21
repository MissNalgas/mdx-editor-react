import styles from "./EditorDropdown.module.css";

export default function EditorDropdown({options, onToggle, value}) {

    const handleChange = (e) => {
        onToggle(e.target.value);
    }

    return  <select className={styles.dropdown} onChange={handleChange} value={value}>
                {options.map((opt) => (
                    <option key={opt.style} value={opt.style}>{opt.label}</option>
                ))}
            </select>
}