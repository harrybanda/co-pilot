import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Img1 from "../images/img1.png";
import "../styles/landing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/logo.png";

const Landing = () => {
  return (
    <Fragment>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column">
                <h1 className="title text-wrap-header">
                  Code faster with{" "}
                  <span style={{ color: "#00FFFF" }}>Co-Pilot.</span>
                </h1>
                <br />
                <h2 className="subtitle text-wrap-header">
                  Co-Pilot is an AI voice assistant that aims to help developers
                  speed up software development time by simply speaking to their
                  code edtior in natural language.
                </h2>
                <Link to="/editor">
                  <button className="button is-white">
                    <span className="icon">
                      <FontAwesomeIcon icon="laptop-code" />
                    </span>
                    <span>Try out the demo</span>
                  </button>
                </Link>
              </div>
              <div className="column">
                <div className="container">
                  <img src={Img1} alt="header" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section has-background-dark has-text-white">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="box has-background-black">
                <h1 className="subtitle is-4" style={{ color: "#FFF" }}>
                  <FontAwesomeIcon
                    icon="microphone"
                    size="1x"
                    style={{ color: "#00FFFF" }}
                  />{" "}
                  Code Naturally
                </h1>
                <h2 className="subtitle has-text-grey-light">
                  Write code with natural speech commands like{" "}
                  <span style={{ color: "#00FFFF" }}>add for loop </span>
                  and <span style={{ color: "#00FFFF" }}>
                    insert try catch
                  </span>{" "}
                  rather than memorizing hundreds of hotkeys and syntax.
                </h2>
              </div>
            </div>
            <div className="column">
              <div className="box has-background-black">
                <h1 className="subtitle is-4" style={{ color: "#FFF" }}>
                  <FontAwesomeIcon
                    icon="clock"
                    size="1x"
                    style={{ color: "#00FFFF" }}
                  />{" "}
                  Increase productivity
                </h1>
                <h2 className="subtitle has-text-grey-light">
                  Code faster and stay in flow. Co-Pilot helps you save time,
                  Instead of typing long lines of code you can simply generate
                  it with natural speech in no time.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer has-background-black">
        <div className="content has-text-centered">
          <img src={logo} width="112" height="28" alt="logo" />
        </div>
      </footer>
    </Fragment>
  );
};

export default Landing;
