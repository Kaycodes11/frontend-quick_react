import React from "react";
import "./style.scss";

const StatesAnimation = () => {
  const formEl = React.useRef(null);

  const handleState = (state) => {
    const form = formEl.current;
    // console.log(form?.dataset?.state, state);

    const active = document.querySelectorAll(`[data-active]`);

    active.forEach((activeEl) => delete activeEl.dataset.active);

    form.dataset.state = state;

    const show = document.querySelectorAll(`[data-show="${state}"]`);

    show.forEach((el) => {
      el.dataset.active = true;
    });

    // based on some condition , set the error or success

    if (state === "subscribing") {
      console.log("STATE", state);
      // when the state is "subscribing"; recursive call it again with argument
      setTimeout(() => {
        // Test: just change Math.random with an integer e.g. 1.2 then enter 1.2 in the input field
        if (Math.random() < 0.9) {
          handleState("error");
        } else {
          handleState("success");
        }
      }, 2000);
    }
  };

  return (
    <form className="ui-form" data-state="subscribe" ref={formEl}>
      <input className="ui-input" type="email" placeholder="your@email.com" />
      <button
        className="ui-button"
        type="button"
        onClick={() => handleState("subscribing")}
      >
        <span data-show="subscribe" data-active="true">
          Subscribe
        </span>
        <span data-show="subscribing">Subscribing</span>
        <span data-show="success">Success!</span>
        <span data-show="error">Error</span>
      </button>
    </form>
  );
};

export default StatesAnimation;
