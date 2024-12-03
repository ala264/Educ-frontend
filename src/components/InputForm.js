import React, { useState } from 'react';
import './InputForm.css';

function InputForm() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [warning, setWarning] = useState('');
  const [response, setResponse] = useState('')

  const handleTextChange = (e) => {
    setText(e.target.value);
    setWarning('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/plain') {
      setFile(selectedFile);
      setWarning('');
    } else {
      setFile(null);
      setWarning('Please upload a valid .txt file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning('');

    if (!text && !file) {
      setWarning('Please provide either text input or upload a file.');
      return;
    }

    let dataToSend = null;

    if (text) {
      dataToSend = { text };
    } else if (file) {
      // Read the file contents
      const reader = new FileReader();
      reader.onload = async () => {
        dataToSend = { text: reader.result };
        await submitData(dataToSend);
      };
      reader.readAsText(file);
      return; // Wait for the reader to finish before submitting
    } else {
      return;
    }

    await submitData(dataToSend);
  };

  const submitData = async (dataToSend) => {
    try {
      const response = await fetch('educ-backend.vercel.app/api/input', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringif3y(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Response from backend:', result.response);
        setResponse(result.response)

      } else {
        console.error('Failed to send data to the backend.');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      setWarning('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className="input-form-container">
        <form className="input-form" onSubmit={handleSubmit}>
          <label htmlFor="textInput" className="form-label">Enter Text:</label>
          <textarea
            id="textInput"
            value={text}
            onChange={handleTextChange}
            placeholder="Type something..."
            className="form-input"
          />

          <label htmlFor="fileInput" className="form-label">Upload a .txt File:</label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept=".txt"
            className="form-input"
          />

          <button type="submit" className="form-button">Submit</button>
        </form>

        {warning && <p className="form-warning">{warning}</p>}
      </div>
      {response && <p className="response-text" >{response}</p>}
    </>
  );
}

export default InputForm;
