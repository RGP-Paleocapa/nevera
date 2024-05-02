// AutoRotate.js
const AutoRotate = (Marzipano, viewer, autorotateToggleElement) => {
  let autorotate = null;


  const startAutorotate = () => {
    if (!autorotateToggleElement.classList.contains("enabled")) {
      return;
    }
    viewer.startMovement(autorotate);
    viewer.setIdleMovement(3000, autorotate);
  };


  const stopAutorotate = () => {
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  };

  const toggleAutorotate = () => {
    if (autorotateToggleElement.classList.contains("enabled")) {
      autorotateToggleElement.classList.remove("enabled");
      stopAutorotate();
    } else {
      autorotateToggleElement.classList.add("enabled");
      startAutorotate();
    }
  };

  autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI / 2,
  });

  if (autorotateToggleElement.classList.contains("enabled")) {
    startAutorotate();
  }

  autorotateToggleElement.addEventListener("click", toggleAutorotate);

  return {
    start: startAutorotate,
    stop: stopAutorotate,
    toggleAutorotate: toggleAutorotate,
  }
};

export default AutoRotate;