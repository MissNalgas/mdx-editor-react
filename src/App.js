import TextEditor from "./components/TextEditor";
import styles from "./App.module.css";

function App() {

  return  <div className={styles.container}>
            <h1>MDX Editor</h1>
            <TextEditor/>
          </div>
}

export default App;
