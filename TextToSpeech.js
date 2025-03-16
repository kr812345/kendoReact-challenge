import React, { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Card, CardBody, CardTitle } from "@progress/kendo-react-layout";

const TextToSpeech = ({ extractedText }) => {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const handleTextToSpeech = async () => {
    if (!extractedText || extractedText.trim() === "No text detected.") {
      alert("Please extract text before using Text-to-Speech!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyBuBFR3jz-cQWdKu-UE2JL87PDK5MkVO0U`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: { text: extractedText },
            voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
            audioConfig: { audioEncoding: "MP3" },
          }),
        }
      );

      const data = await response.json();
      if (data.audioContent) {
        const audioSrc = `data:audio/mp3;base64,${data.audioContent}`;
        setAudioUrl(audioSrc);
      } else {
        alert("Failed to generate speech.");
      }
    } catch (error) {
      console.error("Text-to-Speech Error:", error);
      alert("Error converting text to speech.");
    }

    setLoading(false);
  };

  return (
    <Card style={{ maxWidth: 500, margin: "20px auto", padding: "20px", textAlign: "center" }}>
      <CardTitle>Text to Speech</CardTitle>

      <Button primary={true} onClick={handleTextToSpeech} disabled={loading}>
        {loading ? "Converting..." : "Play Speech"}
      </Button>

      {audioUrl && (
        <CardBody>
          <audio controls src={audioUrl} />
        </CardBody>
      )}
    </Card>
  );
};

export default TextToSpeech;
