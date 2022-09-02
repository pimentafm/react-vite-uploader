import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FileUploader } from "./components/FileUploader";
import "./index.css";

function App() {
  return (
    <>
      <FileUploader />
      <ToastContainer />
    </>
  );
}

export default App;
