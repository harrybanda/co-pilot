import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Img1 from "../images/img1.png";
import "../styles/landing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/logo.png";

const Landing = () => {
  return (
    <Fragment>
      <section class="hero is-dark">
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column">
                <h1 class="title text-wrap-header">
                  Code faster with{" "}
                  <span style={{ color: "#00FFFF" }}>Co-Pilot.</span>
                </h1>
                <br />
                <h2 class="subtitle text-wrap-header">
                  Co-Pilot is an AI voice assistant that aims to help developers
                  speed up software development time by simply speaking to their
                  code edtior in natural language.
                </h2>
                <Link to="/editor">
                  <button class="button is-white">
                    <span class="icon">
                      <FontAwesomeIcon icon="laptop-code" />
                    </span>
                    <span>Try out the demo</span>
                  </button>
                </Link>
              </div>
              <div class="column">
                <div className="container">
                  <img src={Img1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section has-background-dark has-text-white">
        <div class="container">
          <div class="columns">
            <div class="column">
              <div class="box has-background-black">
                <h1 class="subtitle is-4" style={{ color: "#FFF" }}>
                  <FontAwesomeIcon
                    icon="microphone"
                    size="1x"
                    style={{ color: "#00FFFF" }}
                  />{" "}
                  Code Naturally
                </h1>
                <h2 class="subtitle has-text-grey-light">
                  Write code with natural speech commands like{" "}
                  <span style={{ color: "#00FFFF" }}>add for loop </span>
                  and <span style={{ color: "#00FFFF" }}>
                    insert try catch
                  </span>{" "}
                  rather than memorizing hundreds of hotkeys and syntax.
                </h2>
              </div>
            </div>
            <div class="column">
              <div class="box has-background-black">
                <h1 class="subtitle is-4" style={{ color: "#FFF" }}>
                  <FontAwesomeIcon
                    icon="clock"
                    size="1x"
                    style={{ color: "#00FFFF" }}
                  />{" "}
                  Increase productivity
                </h1>
                <h2 class="subtitle has-text-grey-light">
                  Code faster and stay in flow. Co-Pilot helps you save time,
                  Instead of typing long lines of code you can simply generate
                  it with natural speech in no time.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="footer has-background-black">
        <div class="content has-text-centered">
          <img src={logo} width="112" height="28" />
        </div>
      </footer>
    </Fragment>
  );
};

export default Landing;
