// MediaQuery.js

function detectDeviceType() {
  const mql = window.matchMedia("(max-width: 500px), (max-height: 500px)");
  
  function setMode(event) {
    // Optionally use event.matches to determine if the query matches
    const matches = event ? event.matches : mql.matches;

    if (matches) {
      document.body.classList.remove("desktop");
      document.body.classList.add("mobile");
    } else {
      document.body.classList.remove("mobile");
      document.body.classList.add("desktop");
    }
  }

  // Use addEventListener instead of addListener
  mql.addEventListener('change', setMode);
  setMode(); // Set initial mode without event argument
}


function detectTouchCapability() {
  const noTouchClass = "no-touch";
  const touchClass = "touch";
  document.body.classList.add(noTouchClass);
  
  window.addEventListener("touchstart", function firstTouch() {
    document.body.classList.remove(noTouchClass);
    document.body.classList.add(touchClass);
    window.removeEventListener("touchstart", firstTouch, false);
  }, false);
}

function supportsCSSProperty(property) {
  return property in document.body.style;
}

function tooltipFallback() {
  if (!supportsCSSProperty('animation')) {
    document.body.classList.add('tooltip-fallback');
  }
}

export { detectDeviceType, detectTouchCapability, tooltipFallback };

// detectDeviceType();
// detectTouchCapability();
// tooltipFallback();
