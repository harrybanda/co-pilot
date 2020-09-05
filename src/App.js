import React from "react";
import Axios from "axios";
import "./App.css";

require("dotenv").config();

function App() {
  const getCode = async (val) => {
    try {
      const response = await Axios.get(process.env.REACT_APP_CODE_URL + val);
      console.log(response.data.Items[0].code["S"]);
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

  sendMessage();
  return (
    <div className="App">
      <p>yeet!</p>
    </div>
  );
}

export default App;
