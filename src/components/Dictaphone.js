import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/mic.css";

const Dictaphone = (props) => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isRecording, setRecording] = useState(false);
  const [btnIcon, setBtnIcon] = useState("microphone");
  const [btnColor, setBtnColor] = useState("#0C9");

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const start = () => {
    setBtnIcon("stop");
    setBtnColor("#ec2d2d");
    setRecording(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const stop = () => {
    setBtnIcon("microphone");
    setBtnColor("#0C9");
    SpeechRecognition.stopListening();
    setRecording(false);
    props.sendMessage(transcript, resetTranscript);
    console.log(transcript);
  };

  const toggleButton = () => {
    if (isRecording) {
      stop();
    } else {
      start();
    }
  };

  return (
    <div
      className="float-btn"
      style={{ backgroundColor: btnColor }}
      onClick={toggleButton}
    >
      <FontAwesomeIcon icon={btnIcon} size="2x" className="float-icon" />
    </div>
  );
};
export default Dictaphone;
