import React, { useState } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Card, CardBody, CardTitle } from "@progress/kendo-react-layout";

const languages = [
  { text: "Spanish", code: "es" },
  { text: "French", code: "fr" },
  { text: "German", code: "de" },
  { text: "Hindi", code: "hi" },
  { text: "Chinese", code: "zh" },
];

const Translation = ({ extractedText }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!extractedText || extractedText === "No text detected.") {
      alert("Please extract text before translating!");
      return;
    }

    setLoading(true);
    setTranslatedText("Translating...");

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          extractedText
        )}&langpair=en|${selectedLanguage.code}`
      );
      const data = await response.json();
      setTranslatedText(data.responseData.translatedText || "Translation failed.");
    } catch (error) {
      console.error("Translation Error:", error);
      setTranslatedText("Error in translation. Try again.");
    }

    setLoading(false);
  };

  return (
    <Card style={{ maxWidth: 500, margin: "20px auto", padding: "20px", textAlign: "center" }}>
      <CardTitle>Translate Extracted Text</CardTitle>

      {/* Language Selector Dropdown */}
      <DropDownList
        data={languages}
        textField="text"
        dataItemKey="code"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.value)}
        style={{ marginBottom: 10 }}
      />

      {/* Translate Button */}
      <Button primary={true} onClick={handleTranslate} disabled={!extractedText || extractedText === "No text detected."}>
        {loading ? "Translating..." : "Translate"}
      </Button>

      {/* Display Translated Text */}
      {translatedText && (
        <CardBody>
          <p style={{ whiteSpace: "pre-wrap", fontWeight: "bold" }}>{translatedText}</p>
        </CardBody>
      )}
    </Card>
  );
};

export default Translation;
