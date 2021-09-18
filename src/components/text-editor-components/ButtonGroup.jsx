import EditorButton from "./EditorButton";

export default function ButtonGroup({buttons, onToggle}) {



    return  <div>
                {buttons.map((button) => (
                    <EditorButton
                        key={button.style} 
                        onToggle={onToggle}
                        style={button.style}
                        label={button.label}/>
                ))}
            </div>
}