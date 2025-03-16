// import React, { useState } from "react";
// import ImageUpload from "./components/ImageUpload";
// import TextExtractor from "./components/OCRTextExtractor";
// import "@progress/kendo-theme-default/dist/all.css";

// function App() {
//   const [selectedImage, setSelectedImage] = useState(null);

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>Image to Text Converter</h1>

//       {/* Image Upload Component */}
//       <ImageUpload onImageSelect={setSelectedImage} />

//       {/* Text Extractor Component (Appears only when an image is uploaded) */}
//       {selectedImage && <TextExtractor imageFile={selectedImage} />}
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import TextExtractor from "./components/OCRTextExtractor";
import Translation from "./components/Translation";
import Summarization from "./components/Summarization";
import TextToSpeech from "./components/TextToSpeech";
import ImageCaption from "./components/CaptionGenerator"; 
import "@progress/kendo-theme-default/dist/all.css";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Image to Text Converter</h1>

      {/* Image Upload Component */}
      <ImageUpload onImageSelect={setSelectedImage} />

      {/* AI Caption Generation */}
      {selectedImage && <ImageCaption imageFile={selectedImage} />}
      

      {/* Text Extractor Component */}
      {selectedImage && (
        <TextExtractor imageFile={selectedImage} onTextExtracted={setExtractedText} />
      )}

      {/* Multi-Language Translation */}
      {extractedText && extractedText !== "No text detected." && (
        <Translation extractedText={extractedText} />
      )}

      {/* AI-based Text Summarization */}
      {extractedText && extractedText !== "No text detected." && <Summarization extractedText={extractedText} />}

      {/* Text-to-Speech Feature */}
      {extractedText && extractedText !== "No text detected." && <TextToSpeech extractedText={extractedText} />}
    

      

    </div>
  );
}

export default App;
