export default function EditorButton({style, onToggle, label}) {

    const handleClick = (e) => {
        onToggle(style);
    }

    return <button onClick={handleClick}>{label}</button>
}