import React, { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handleObjectDetection = async () => {
 
    // Example predictions data
    const data = {
      predictions: [
        {
          class: "car",
          confidence: 0.95,
          bbox: [50, 100, 200, 300],
        },
        {
          class: "truck",
          confidence: 0.87,
          bbox: [150, 50, 300, 250],
        },
      ],
    };
    setPredictions(data.predictions);
    console.log(data);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Vehicle Object Detection</h1>
      </div>
      <div className="main-container">
        <div className="image-container">
          {image ? (
            <img src={image} alt="uploaded" className="uploaded-image" />
          ) : (
            <div className="upload-box">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <p>Drag and drop an image or click to select a file.</p>
            </div>
          )}
        </div>
        <div className="predictions-container">
          <div className="button-container">
            <button className="detect-button" onClick={handleObjectDetection}>
              Detect Objects
            </button>
          </div>
          {predictions.length > 0 && (
            <div className="predictions-list">
              <h3>Detected Objects:</h3>
              {predictions.map((prediction, index) => (
                <div key={index} className="prediction">
                  <p>
                    <strong>Class:</strong> {prediction.class}
                  </p>
                  <p>
                    <strong>Confidence:</strong> {prediction.confidence.toFixed(2)}
                  </p>
                  <p>
                    <strong>Bounding Box:</strong> {prediction.bbox.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

