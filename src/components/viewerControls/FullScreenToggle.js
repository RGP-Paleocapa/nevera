// FullScreenToggle.js
const FullScreenToggle = (screenfull, fullscreenToggleElement) => {
  if (screenfull.enabled) {
    document.body.classList.add("fullscreen-enabled");
    fullscreenToggleElement.addEventListener("click", () => {
      screenfull.toggle();
    });
    screenfull.on("change", () => {
      if (screenfull.isFullscreen) {
        fullscreenToggleElement.classList.add("enabled");
      } else {
        fullscreenToggleElement.classList.remove("enabled");
      }
    });
  } else {
    document.body.classList.add("fullscreen-disabled");
  }
};

export default FullScreenToggle;
