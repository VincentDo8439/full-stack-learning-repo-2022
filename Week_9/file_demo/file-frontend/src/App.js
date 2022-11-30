import "./App.css";
import FileUploadPage from "./components/Upload";

function App() {
  const handleSubmission = (selectedFile) => {
    // TODO: complete function by appending "demo_image" field to formData with file, then calling upload file endpoint
    const formData = new FormData();
    formData.append("demo_image", selectedFile)
    fetch("http://localhost:3000/files/", {
      method: "POST",
      body: formData
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <FileUploadPage handleSubmission={handleSubmission}></FileUploadPage>
      </header>
    </div>
  );
}

export default App;
