

import React, { useState } from "react";
import { Upload } from "@progress/kendo-react-upload";
import { Card, CardBody } from "@progress/kendo-react-layout";

const ImageUpload = ({ onImageSelect }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleUpload = (event) => {
    const file = event.newState[0]?.getRawFile();
    if (file) {
      const objectURL = URL.createObjectURL(file); // ✅ Creates a URL for the uploaded image
      setImagePreview(objectURL);
      onImageSelect(objectURL); // ✅ Pass image to parent component
    }
  };

  return (
    <Card style={{ width: 400, padding: 20, textAlign: "center" }}>
      <CardBody>
        {/* KendoReact Upload Component */}
        <Upload
          batch={false}
          multiple={false}
          withCredentials={false}
          onAdd={handleUpload}
        />
        
        {/* Display Image Preview */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            style={{
              width: "100%",
              marginTop: 20,
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default ImageUpload;


// import React, { useState } from "react";
// import { Upload } from "@progress/kendo-react-upload";
// import { Card, CardBody } from "@progress/kendo-react-layout";
// import Tesseract from "tesseract.js";

// const ImageUpload = ({ onTextExtracted }) => {
//   const [imagePreview, setImagePreview] = useState(null);
//   const [extractedText, setExtractedText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleUpload = (event) => {
//     const file = event.newState[0]?.getRawFile();
//     if (file) {
//       const objectURL = URL.createObjectURL(file);
//       setImagePreview(objectURL);
//       extractText(objectURL); 
//     }
//   };

//   const extractText = async (image) => {
//     setLoading(true);
//     setExtractedText("Extracting text...");

//     try {
//       const { data } = await Tesseract.recognize(image, "eng", {
//         logger: (m) => console.log(m),
//       });

//       const extracted = data.text.trim();
//       console.log("Extracted Text:", extracted);

//       if (extracted) {
//         setExtractedText(extracted);
//         onTextExtracted(extracted);
//       } else {
//         setExtractedText("No text detected. Try another image.");
//       }
//     } catch (error) {
//       console.error("OCR Error:", error);
//       setExtractedText("Failed to extract text. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <Card style={{ width: 400, padding: 20 }}>
//       <CardBody>
//         <Upload
//           batch={false}
//           multiple={false}
//           withCredentials={false}
//           onAdd={handleUpload}
//         />
        
//         {imagePreview && (
//           <img
//             src={imagePreview}
//             style={{ width: "100%", marginTop: 20 }}
//             alt="Uploaded Preview"
//           />
//         )}
        
//         <p style={{ marginTop: 10 }}>
//           {loading ? "Extracting text..." : extractedText || "No text extracted yet..."}
//         </p>
//       </CardBody>
//     </Card>
//   );
// };

// export default ImageUpload;
