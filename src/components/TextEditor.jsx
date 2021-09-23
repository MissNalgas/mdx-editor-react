import { useState, useReducer } from "react";
import styles from "./TextEditor.module.css";
import { Editor, EditorState, RichUtils } from "draft-js";
import ButtonGroup from "./text-editor-components/ButtonGroup";
import EditorDropdown from "./text-editor-components/EditorDropdown";
import "draft-js/dist/Draft.css";
import { stateToMarkdown } from "draft-js-export-markdown";
import FrontmatterEditor from "./text-editor-components/FrontmatterEditor";


const testButtons = [
    {style: "BOLD", label: "B"},
    {style: "ITALIC", label: "I"},
    {style: "UNDERLINE", label: "U"},
    {style: "STRIKETHROUGH", label: "S"},
    {style: "CODE", label: "Code"},
]

const buttons2 = [
    {style: "unordered-list-item", label: "UL"},
    {style: "ordered-list-item", label: "OL"},
    {style: "blockquote", label: "blockQuote"}

]

const listH = [
    {style: "unstyled", label: "Normal"},
    {style: "header-one", label: "Header 1"},
    {style: "header-two", label: "Header 2"},
    {style: "header-three", label: "Header 3"}
]

function dataReducer(state, action) {
    switch(action.type) {
        case "DELETE":
            const key = action.key || ""
            const newData = [...state].filter((v) => v.key !== key);
            return newData;
        default:
            const data = action.data;
            data.key = Date.now().toString();
            return [...state, data];
    }
}


export default function TextEditor({children}) {

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    var editor = null;
    const [data, dispatchData] = useReducer(dataReducer, []);
    

    const setEditor = (eeditor) => {
        editor = eeditor;
    }

    const handleKeyCommand = (cmd, state) => {
        const newState = RichUtils.handleKeyCommand(state, cmd);
        if (newState) setEditorState(newState);
    }

    const onChange = (eEditorState) => {
        console.log("eEditorState", eEditorState);
        setEditorState(eEditorState);
    }

    const handleClick = (e) => {
        editor.focus();
    }

    const toogleInlineStyle = (style) => {
        let newState = RichUtils.toggleInlineStyle(editorState, style);
        setEditorState(newState);
    }

    const toggleBlockType = (blockType) => {
        let newState = RichUtils.toggleBlockType(editorState, blockType);
        setEditorState(newState);
    }

    const getCurrentBlocktype = () => {
        let selection = editorState.getSelection();
        return editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
    }

    const blocktype = getCurrentBlocktype();
    const inlineStyle = editorState.getCurrentInlineStyle();

    const inlineIfActive = (style) => {
        return inlineStyle.has(style);
    }

    const blockIfActive = (style) => {
        return blocktype === style;
    }

    const getFinalText = () => {
        const content = editorState.getCurrentContent();
        const markdown = stateToMarkdown(content);
        
        const frontmatter = "---\n"+data.map((dat) => (dat.title+": "+dat.content)).join("\n")+"\n---\n";

        const finalObject =  frontmatter + markdown;
        const buf = Buffer.from(finalObject)
        console.log(buf.toString("base64"))

        return "data:text/plain;base64,"+buf.toString("base64");
    }

    return  <div className={styles.editorContainer}>
                <div className={styles.toolBar}>
                    <ButtonGroup onToggle={toogleInlineStyle} ifActive={inlineIfActive} buttons={testButtons}/>
                    <ButtonGroup onToggle={toggleBlockType} ifActive={blockIfActive} buttons={buttons2}/>
                    <EditorDropdown options={listH} onToggle={toggleBlockType} value={blocktype}/>
                </div>
                <div onClick={handleClick} className={styles.editor}>
                    <Editor
                        ref={setEditor}
                        editorState={editorState}
                        onChange={onChange}
                        handleKeyCommand={handleKeyCommand}
                    />
                </div>
                <div>
                    <FrontmatterEditor dispatcher={dispatchData} data={data}/>
                </div>
                {true && <div style={{wordBreak: "break-all"}} className={styles.preview}>
                    <a download="filename.mdx" href={getFinalText()}>download</a>
                </div>}
            </div>
}