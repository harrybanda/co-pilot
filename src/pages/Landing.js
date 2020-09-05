import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <Link to="/editor">
        <button>Editor</button>
      </Link>
    </div>
  );
};

export default Landing;
