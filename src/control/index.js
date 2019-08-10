import React from "react";
import ButtonControl from "./ButtonControl";
import "./style.css";

export default function Control(props) {
  return (
    <div className="control">
      <div className="circle">
        <h1 className="title">Simon</h1>
        <div
          className={`displayer ${
            isNaN(props.displayer) && props.displayer !== "OFF"
              ? "animate-displayer"
              : ""
          }`}
        >
          {props.displayer}
        </div>
        <div className="btn-ctrl-container">
          <ButtonControl onClick={props.start} title="Start" style={{background:props.isStarted ? "green": "red"}} />
          <ButtonControl onClick={props.reset} title="Reset" />
          <ButtonControl onClick={props.strict} title="Strict" style={{background:props.isStrict ? "green": "red"}} />
        </div>
      </div>
    </div>
  );
}
