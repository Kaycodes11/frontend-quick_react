import React from "react";
import "./style.scss";

const LayoutAnimation = () => {
  const appEl = React.useRef(null);
  const figureEl = React.useRef(null);
  const captionEl = React.useRef(null);

  function flip(callback, firstEls, lastEls = firstEls) {
    console.log(firstEls); // [elementItself, children, children, childre, children, ....]

    // here, firstEls = [elementItself, children]

    // now make an array (via map) on firstEls to get each element's rect ( top, bottom, left, right), width, X & Y )
    const firstRects = firstEls.map((elem) => elem.getBoundingClientRect());
    // console.log(firstRects);

    callback();

    requestAnimationFrame(() => {
      const lastRects = lastEls.map((el) => el.getBoundingClientRect());

      lastRects.forEach((lastRect, i) => {
        const firstRect = firstRects[i];
        const lastEl = lastEls[i];

        if (!firstRect) {
          return;
        }

        const dx = firstRect.x - lastRect.x;
        const dy = firstRect.y - lastRect.y;
        const dw = firstRect.width / lastRect.width;
        const dh = firstRect.height / lastRect.height;

        lastEl.style.setProperty("--dx", dx);
        lastEl.style.setProperty("--dy", dy);
        lastEl.style.setProperty("--dw", dw);
        lastEl.style.setProperty("--dh", dh);
        lastEl.dataset.flip = "invert";

        requestAnimationFrame(() => {
          lastEl.dataset.flip = "play";
        });
      });
    });
  }

  return (
    <div
      id="app"
      data-state="collapsed"
      ref={appEl}
      onClick={() => {
        // console.log(appEl.current.dataset.state);
        flip(() => {
          appEl.current.dataset.state = appEl.current.dataset.state === "collapsed" ? "expanded" : "collapsed";
        }, [figureEl.current, captionEl.current]);
      }}
    >
      <figure className="ui-figure" data-flip-bg ref={figureEl}>
        <figcaption className="ui-caption" ref={captionEl}>
          Animation
        </figcaption>
      </figure>
      <div className="ui-content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ullam hic consectetur ducimus neque ipsam
          incidunt voluptatem voluptatum eos. Voluptatum minus omnis provident sit architecto, mollitia nihil aspernatur
          sed praesentium.
        </p>
      </div>
    </div>
  );
};

export default LayoutAnimation;
