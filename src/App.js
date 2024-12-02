import './App.css';
import Heading from './components/Heading'
import InputForm from './components/InputForm'
import Tooltip from './components/Tooltip'
function App() {
  return (
    <div className="App">
      <Heading></Heading>
      <InputForm></InputForm>
      <Tooltip text="Disclaimer: <br>
This tool is designed to assist you, but it’s not perfect and may occasionally produce errors or misinterpretations. Please double-check the results and use them as a guide rather than a definitive solution.
<br>
Input Options: <br>
You can either upload a .txt file or directly input text that outlines your learning plan or any relevant information. This ensures flexibility in how you share your data for processing." />
    </div>
  );
}

export default App;
