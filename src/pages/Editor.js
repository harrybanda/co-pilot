import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Formatter from "code-formatter";
import MonacoEditor from "react-monaco-editor";
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const Editor = () => {
  const [code, setCode] = useState("");
  const [blobURL, setBlobURL] = useState("");
  const [isRecording, setRecording] = useState(false);
  const [isBlocked, setBlocked] = useState(false);

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
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setBlobURL(blobURL);
        setRecording(false);
      })
      .catch((e) => console.log(e));
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
              <img
                src="https://bulma.io/images/bulma-logo.png"
                alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"
                width="112"
                height="28"
              />
            </a>
          </Link>
        </div>
      </nav>
      <div className="columns">
        <div className="column is-four-fifths">
          <MonacoEditor
            width="100%"
            height="500"
            language="javascript"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={onChange}
            editorDidMount={editorDidMount}
          />
        </div>
        <div className="column">
          <button onClick={start} disabled={isRecording}>
            Record
          </button>
          <button onClick={stop} disabled={!isRecording}>
            Stop
          </button>
          <audio src={blobURL} controls="controls" />
        </div>
      </div>
    </Fragment>
  );
};

export default Editor;
