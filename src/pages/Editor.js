import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import Formatter from "code-formatter";
import MonacoEditor from "react-monaco-editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Recorder from "recorder-js";
import "../styles/editor.css";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const recorder = new Recorder(audioContext);

let instructions =
  "/*\n" +
  "                 __|__\n" +
  "          --o--o--(_)--o--o--\n" +
  "  _____           ___   _  __      __\n" +
  " / ___/___  ____ / _ \\ (_)/ /___  / /_\n" +
  "/ /__ / _ \\/___// ___// // // _ \\/ __/\n" +
  "\\___/ \\___/    /_/   /_//_/ \\___/\\__/\n" +
  "\n" +
  "          ⭐ INSTRUCTIONS ⭐\n" +
  "\n" +
  "1. Press the green mic button to speak to Co-Pilot.\n" +
  "2. You can ask Co-Pilot to do any of the following:\n" +
  "   👉 Insert a try catch block\n" +
  "   👉 Add a foreach loop\n" +
  "   👉 Add a use effect hook\n" +
  "   and more... ✈️\n" +
  "3. Press the button again to stop recording.\n" +
  "4. Watch as Co-Pilot writes the code for you. 🙂\n" +
  "*/";

const Editor = () => {
  const [code, setCode] = useState(instructions);
  const [isRecording, setRecording] = useState(false);
  const [isBlocked, setBlocked] = useState(false);
  const [btnIcon, setBtnIcon] = useState("microphone");
  const [btnColor, setBtnColor] = useState("#0C9");

  const editorDidMount = (editor, monaco) => {
    editor.focus();
  };

  const onChange = (newValue, e) => {
    console.log("onChange", newValue, e);
  };

  const options = {
    selectOnLineNumbers: true,
  };

  const getCode = async (val) => {
    try {
      const response = await Axios.get(process.env.REACT_APP_CODE_URL + val);
      const content = response.data.Items[0].code["S"];
      const formatted = Formatter(content, {
        method: "js",
      });
      setCode(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async (blob) => {
    try {
      const response = await Axios({
        method: "post",
        url: process.env.REACT_APP_WIT_URL,
        data: blob,
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_WIT_TOKEN,
          "Content-Type": "audio/wav",
        },
      });
      console.log(response);
      let entity = response.data.entities["code:code"][0].body;
      getCode(entity.replace(/\s/g, ""));
    } catch (error) {
      console.error(error);
    }
  };

  const start = () => {
    recorder.start().then(() => setRecording(true));
  };

  const stop = () => {
    recorder.stop().then(({ blob, buffer }) => {
      setRecording(false);
      sendMessage(blob);
    });
  };

  const toggleButton = () => {
    if (!isBlocked) {
      if (isRecording) {
        stop();
        setBtnIcon("microphone");
        setBtnColor("#0C9");
      } else {
        start();
        setBtnIcon("stop");
        setBtnColor("#ec2d2d");
      }
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        recorder.init(stream);
        setBlocked(false);
      })
      .catch((err) => {
        console.log("Uh oh... unable to get stream...", err);
        setBlocked(true);
      });
  }, []);

  return (
    <Fragment>
      <MonacoEditor
        width="100%"
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
      <div
        className="float-btn"
        style={{ backgroundColor: btnColor }}
        onClick={toggleButton}
      >
        <FontAwesomeIcon icon={btnIcon} size="2x" className="float-icon" />
      </div>
    </Fragment>
  );
};

export default Editor;
