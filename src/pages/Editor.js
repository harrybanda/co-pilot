import React, { useState, Fragment } from "react";
import Axios from "axios";
import Formatter from "code-formatter";
import MonacoEditor from "react-monaco-editor";
import Instructions from "../components/Instructions";
import Dictaphone from "../components/Dictaphone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import db from "./../code.json";

const Editor = () => {
  const [code, setCode] = useState(Instructions.text);

  const editorDidMount = (editor, monaco) => {
    editor.focus();
  };

  const onChange = (newValue, e) => {
    setCode(newValue);
  };

  const options = {
    selectOnLineNumbers: true,
  };

  const notify = (transcript) =>
    toast.error('Sorry could not understand the phrase: "' + transcript + '"', {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const getCode = async (val, transcript) => {
    console.log("val: " + val);
    console.log("trans: " + transcript);
    let c = db.find((o) => o.name === val);

    console.log(c.value);

    const formatted = Formatter(c.value, {
      method: "js",
    });
    setCode(formatted + "\n\n" + code);
    console.log(formatted);
  };

  const sendMessage = async (transcript, resetTranscript) => {
    const headers = {
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_WIT_TOKEN,
      },
    };
    try {
      const response = await Axios.get(
        process.env.REACT_APP_WIT_URL + transcript,
        headers
      );
      let entity = response.data.entities["code:code"][0].value;
      getCode(entity.replace(/\s/g, ""), transcript);
      console.log(response);
      console.log("transcript: " + transcript);
      resetTranscript();
    } catch (error) {
      console.error(error);
      console.log("could not understand: " + transcript);
      notify(transcript);
      resetTranscript();
    }
  };

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
      <Dictaphone sendMessage={sendMessage} />
      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </Fragment>
  );
};

export default Editor;
