import React from "react";
import "./style.scss";

const ChoreoGraphy = () => {
  return (
    <>
      <form className="ui-form">
        <input className="ui-input" type="email" placeholder="your@email.com" />
        <div className="button-wrapper">
          <button className="ui-button" type="button" onClick="setState('subscribing')">
            <span>Subscribe</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default ChoreoGraphy;
