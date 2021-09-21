import TextEditor from "./components/TextEditor";
import styles from "./App.module.css";
import "./index.css";

function App() {

  return  <div className={styles.container}>
            <h1 className={styles.title}>MDX Editor</h1>
            <TextEditor/>
          </div>
}

export default App;
