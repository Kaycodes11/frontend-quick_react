import React from "react";
import "./style.scss";

const Transition = () => {
  const subscribeRef = React.useRef(null);
  const handleSubscribing = () => {
    // subscribeRef.current.style.backgroundColor = "red";

    if (subscribeRef.current.textContent) {
      subscribeRef.current.textContent = "Subscribing";
    }
  };
  return (
    <form className="ui-form">
      <input className="ui-input" type="email" placeholder="your@email.com" />
      <button className="ui-button" type="button" onClick={handleSubscribing}>
        <span ref={subscribeRef}>Subscribe</span>
      </button>
    </form>
  );
};

export default Transition;
