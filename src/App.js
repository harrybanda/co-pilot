import React, { useState } from "react";
import Axios from "axios";
import Formatter from "code-formatter";
import "./App.css";

require("dotenv").config();

function App() {
  const [code, setCode] = useState("");

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
    const message = "insert a try catch block";
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

  sendMessage();
  return (
    <div className="App">
      <textarea rows="30" cols="50" value={code} />
    </div>
  );
}

export default App;
