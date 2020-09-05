import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Formatter from "code-formatter";
import MonacoEditor from "react-monaco-editor";
import MicRecorder from "mic-recorder-to-mp3";
import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const Editor = () => {
  const [code, setCode] = useState("");
  const [isRecording, setRecording] = useState(false);
  const [isBlocked, setBlocked] = useState(false);
  const [btnIcon, setBtnIcon] = useState("microphone");
  const [btnColor, setBtnColor] = useState("#2d96ec");

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

  const sendMessage = async () => {
    const message = "insert a for of loop";
    const headers = {
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_WIT_TOKEN,
      },
    };
    try {
      const response = await Axios.get(
        process.env.REACT_APP_WIT_URL + message,
        headers
      );
      let entity = response.data.entities["code:code"][0].body;
      getCode(entity.replace(/\s/g, ""));
    } catch (error) {
      console.error(error);
    }
  };

  const start = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setRecording(true);
          console.log("rec");
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        setRecording(false);
        console.log(buffer);
        console.log(blob);
        console.log("stop rec");
      })
      .catch((e) => console.log(e));
  };

  const toggleButton = () => {
    if (isRecording) {
      stop();
      setBtnIcon("microphone");
      setBtnColor("#2d96ec");
    } else {
      start();
      setBtnIcon("stop");
      setBtnColor("#ec2d2d");
    }
  };

  useEffect(() => {
    sendMessage();
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setBlocked(false);
      },
      () => {
        console.log("Permission Denied");
        setBlocked(true);
      }
    );
  }, []);

  return (
    <Fragment>
      <nav
        className="navbar is-black"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to="/landing">
            <a className="navbar-item">
              <img src={logo} width="112" height="28" />
            </a>
          </Link>
        </div>
      </nav>
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
      <div class="float-btn" style={{ backgroundColor: btnColor }}>
        <FontAwesomeIcon
          icon={btnIcon}
          size="2x"
          className="float-icon"
          onClick={toggleButton}
        />
      </div>
    </Fragment>
  );
};

export default Editor;
