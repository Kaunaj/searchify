import { useState } from "react";

export default function ScrollToTop() {
  const [showScroller, setShowScroller] = useState(false);

  window.addEventListener("scroll", () => decideScrollerDisplay(), false);

  function decideScrollerDisplay() {
    // e.preventDefault();
    if (isScrollerVisibleInViewport()) {
      setShowScroller(false);
    } else {
      setShowScroller(true);
    }
  }

  function isScrollerVisibleInViewport() {
    const scroller = document.getElementsByClassName("scroller")[0];
    const { top, bottom } = scroller.getBoundingClientRect();
    const { innerHeight } = window;
    return top >= 0 && bottom <= innerHeight;
  };

  function scrollToTop() {
    console.log('scrollToTop clicked', document.getElementsByClassName("scroller")[0]);
    document.getElementsByClassName("scroller")[0].scrollIntoView({behavior: "smooth"});
  }

  return (
    <>
      {
        showScroller
        ? <div className="scroll-container">
            <button className="scroll-btn" onClick={scrollToTop}>
            <img className="scroll-img" src="src/assets/scroll-up.png" alt="" />
            </button>
          </div>
        : ""
      }
    </>
  );
}
