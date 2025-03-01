import React from "react";
import UploadForm from "./UploadForm";
import { ToastContainer } from "react-toastify";

async function uploadData() {
  const response = await fetch("http://localhost:3001/upload");
  const data = await response.json();
  console.log("Upload Response:", data);
}


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <UploadForm />
      <button onClick={uploadData}>Upload Data</button>

    </div>
  );
}

export default App;