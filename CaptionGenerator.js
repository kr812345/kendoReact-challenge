import React, { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Card, CardBody, CardTitle } from "@progress/kendo-react-layout";

const ImageCaption = ({ imageFile }) => {
  const [caption, setCaption] = useState("Caption will appear here...");
  const [loading, setLoading] = useState(false);

  const handleGenerateCaption = async () => {
    if (!imageFile) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    setCaption("Generating caption...");

    try {
      const base64Image = await convertImageToBase64(imageFile);
      if (!base64Image) throw new Error("Failed to convert image.");

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    inlineData: {
                      mimeType: "image/jpeg",
                      data: base64Image,
                    },
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setCaption(data.candidates[0].content.parts[0].text);
      } else {
        setCaption("No caption generated.");
      }
    } catch (error) {
      console.error("Caption Generation Error:", error);
      setCaption("Failed to generate caption.");
    }

    setLoading(false);
  };

  const convertImageToBase64 = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
      });
    } catch (error) {
      console.error("Error converting image to Base64:", error);
      return null;
    }
  };

  return (
    <Card style={{ maxWidth: 500, margin: "20px auto", padding: "20px", textAlign: "center" }}>
      <CardTitle>AI-Generated Caption</CardTitle>

      <Button primary onClick={handleGenerateCaption} disabled={loading}>
        {loading ? "Generating..." : "Generate Caption"}
      </Button>

      <CardBody>
        <p style={{ whiteSpace: "pre-wrap", fontWeight: "bold" }}>{caption}</p>
      </CardBody>
    </Card>
  );
};

export default ImageCaption;
