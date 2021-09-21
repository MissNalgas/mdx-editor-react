import EditorButton from "./EditorButton";
import styles from "./ButtonGroup.module.css";

export default function ButtonGroup({buttons, onToggle, ifActive}) {



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