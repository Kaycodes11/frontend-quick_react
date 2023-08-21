import React from "react";
import "./style.scss";

const KeyFrames = () => {
  return (
    <form className="ui-form">
      <input className="ui-input" type="email" placeholder="your@email.com" />
      <button className="ui-button" type="button" onClick="setState('subscribing')">
        <span>Subscribe</span>
      </button>
    </form>
  );
};

export default KeyFrames;
