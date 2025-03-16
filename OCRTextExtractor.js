

// import React, { useState } from "react";
// import Tesseract from "tesseract.js";
// import { Button } from "@progress/kendo-react-buttons";
// import { Card, CardBody, CardTitle } from "@progress/kendo-react-layout";

// const TextExtractor = ({ imageFile, onTextExtracted}) => {
//   const [extractedText, setExtractedText] = useState("No text extracted yet...");
//   const [loading, setLoading] = useState(false);

//   const handleExtractText = async () => {
//     if (!imageFile) {
//       alert("Please upload an image first!");
//       return;
//     }

//     setLoading(true);
//     setExtractedText("Extracting text...");

//     try {
//       const { data } = await Tesseract.recognize(imageFile, "eng", {
//         logger: (m) => console.log(m),
//       });

//       setExtractedText(data.text || "No text detected.");
//     } catch (error) {
//       console.error("OCR Error:", error);
//       setExtractedText("Failed to extract text. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <Card style={{ maxWidth: 500, margin: "20px auto", padding: "20px", textAlign: "center" }}>
//       <CardTitle>Extracted Text</CardTitle>

//       {/* Extract Text Button */}
//       <Button primary={true} onClick={handleExtractText} disabled={loading} style={{ marginBottom: 10 }}>
//         {loading ? "Extracting..." : "Extract Text"}
//       </Button>

//       {/* Display Extracted Text */}
//       <CardBody>
//         <p style={{ whiteSpace: "pre-wrap", fontWeight: "bold" }}>{extractedText}</p>
//       </CardBody>
//     </Card>
//   );
// };

// export default TextExtractor;

// import React, { useState } from "react";
// import Tesseract from "tesseract.js";
// import { Button } from "@progress/kendo-react-buttons";
// import { Card, CardBody, CardTitle } from "@progress/kendo-react-layout";

// const TextExtractor = ({ imageFile, onTextExtracted }) => {
//   const [extractedText, setExtractedText] = useState("No text extracted yet...");
//   const [loading, setLoading] = useState(false);

//   const handleExtractText = async () => {
//     if (!imageFile) {
//       alert("Please upload an image first!");
//       return;
//     }

//     setLoading(true);
//     setExtractedText("Extracting text...");

//     try {
//       const { data } = await Tesseract.recognize(imageFile, "eng", {
//         logger: (m) => console.log(m),
//       });

//       const extracted = data.text || "No text detected.";
//       setExtractedText(extracted);
//       onTextExtracted(extracted); // Ensure parent gets updated text
//     } catch (error) {
//       console.error("OCR Error:", error);
//       setExtractedText("Failed to extract text. Please try again.");
//       onTextExtracted(""); // Notify parent of failure
//     }

//     setLoading(false);
//   };

//   return (
//     <Card style={{ maxWidth: 500, margin: "20px auto", padding: "20px", textAlign: "center" }}>
//       <CardTitle>Extracted Text</CardTitle>

//       <Button primary={true} onClick={handleExtractText} disabled={loading} style={{ marginBottom: 10 }}>
//         {loading ? "Extracting..." : "Extract Text"}
//       </Button>

//       <CardBody>
//         <p style={{ whiteSpace: "pre-wrap", fontWeight: "bold" }}>{extractedText}</p>
//       </CardBody>
//     </Card>
//   );
// };

// export default TextExtractor;


import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { Button } from "@progress/kendo-react-buttons";
import { Card, CardBody, CardTitle } from "@progress/kendo-react-layout";

const TextExtractor = ({ imageFile, onTextExtracted }) => {
  const [extractedText, setExtractedText] = useState("No text extracted yet...");
  const [loading, setLoading] = useState(false);

  const handleExtractText = async () => {
    if (!imageFile) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    setExtractedText("Extracting text...");

    try {
      const { data } = await Tesseract.recognize(imageFile, "eng", {
        logger: (m) => console.log(m),
      });

      const finalText = data.text || "No text detected.";
      setExtractedText(finalText);
      onTextExtracted(finalText); // Pass extracted text to parent component
    } catch (error) {
      console.error("OCR Error:", error);
      setExtractedText("Failed to extract text. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Card style={{ maxWidth: 500, margin: "20px auto", padding: "20px", textAlign: "center" }}>
      <CardTitle>Extracted Text</CardTitle>

      <Button primary={true} onClick={handleExtractText} disabled={loading}>
        {loading ? "Extracting..." : "Extract Text"}
      </Button>

      <CardBody>
        <p style={{ whiteSpace: "pre-wrap", fontWeight: "bold" }}>{extractedText}</p>
      </CardBody>
    </Card>
  );
};

export default TextExtractor;
