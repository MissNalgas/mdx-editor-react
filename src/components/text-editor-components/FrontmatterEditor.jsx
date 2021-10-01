import {useState} from "react";
import styles from "./FrontmatterEditor.module.css";
import PropTypes from "prop-types";

const initialState = {title: "", content: ""};

function FrontmatterEditor ({data, dispatcher}) {

    const [card, setCard] = useState(initialState);
    let rightInputRef = null;
    let leftInputRef = null;

    const onClick = () => {
        if (card.title === "" || card.content === "") return;
        dispatcher({type: "ADD", data: card});
        setCard(initialState);
    }

    const onDelete = (key) => {
        dispatcher({type: "DELETE", key});
    }

    const handleChangeContent = (e) => {
        const data = e.target.value;
        setCard((s) => ({title: s.title, content: data}));
    }

    const handleChangeTitle = (e) => {
        const title = e.target.value;
        setCard((s) => ({title, content: s.content}));
    }

    const leftInputEnter = (e) => {
        const key = e.key;
        if (key === 'Enter') {
            rightInputRef?.focus();
        }
    }

    const rightInputEnter = (e) => {
        const key = e.key;
        if (key === 'Enter') {
            onClick();
            leftInputRef?.focus();
        }
    }

    return  <div className={styles.frontmatterEditor}>
                <div className={styles.frontmatter}>
                    {data.map((obj) => (
                        <div className={styles.frontmatterItem} key={obj.key}>
                            <span style={{overflowWrap: "break-word"}}><b>{obj.title}: </b></span> 
                            <span style={{wordBreak: "break-word", paddingRight: "25px"}}>{obj.content}</span>
                            <button className={styles.closeButton} onClick={() => onDelete(obj.key)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={styles.cross}><path d="M20 20L4 4m16 0L4 20"/></svg>
                            </button>
                        </div>
                    ))}
                    {data.length === 0 && <div style={{textAlign: "center"}}>Empty 👻</div>}
                </div>
                <div className={styles.inputContainer}>
                    <input ref={(ref) => leftInputRef = ref} onKeyDown={leftInputEnter} placeholder="Title" className={`${styles.input} ${styles.inputLeft}`} value={card.title} onChange={handleChangeTitle}/><input ref={(r) => rightInputRef = r} onKeyDown={rightInputEnter} placeholder="Content" className={`${styles.input} ${styles.inputRight}`} value={card.content} onChange={handleChangeContent}/>
                </div>
                <div>
                    <button className={styles.button} onClick={onClick}>Add header</button>
                </div>
            </div>
}

FrontmatterEditor.propTypes = {
    data: PropTypes.arrayOf({
        title: PropTypes.string,
        content: PropTypes.string
    }),
    dispatcher: PropTypes.function
};

export default FrontmatterEditor;