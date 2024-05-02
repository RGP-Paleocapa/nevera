"use strict";

/**
 * MapOverlay module for handling display and interaction of a map overlay.
 */
const MapOverlay = (() => {
  // Getting DOM elements
  const overlay = document.getElementById("map-overlay");
  const closeMap = overlay.querySelector(".close-map");

  /**
   * Toggles the 'active' class on the overlay based on the given state.
   * @param {boolean} isActive - If true, add the class; otherwise, remove it.
   */
  const toggleActive = (isActive) => {
    overlay.classList[isActive ? 'add' : 'remove']("active");
  };

  /**
   * Stops the propagation of the given event.
   * @param {Event} e - The event to stop propagation for.
   */
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  /**
   * Sets up click events for scenes that need to trigger an action when the overlay is active.
   * @param {Array} relevantScenes - An array of scene objects to configure.
   * @param {function} switchScene - The function to call when a scene is selected.
   */
  const setupSceneClicks = (relevantScenes, switchScene) => {
    relevantScenes.forEach(scene => {
      const el = document.querySelector(`#map-overlay .scene[data-id="${scene.data.id}"]`);
      el.addEventListener("click", e => {
        if (overlay.classList.contains("active")) {
          stopPropagation(e);
          toggleActive(false);
          switchScene(scene);
        }
      });
    });
  };

  overlay.addEventListener("click", () => toggleActive(true));

  closeMap.addEventListener("click", (e) => {
    if (overlay.classList.contains("active")) {
      stopPropagation(e);
      toggleActive(false);
    }
  });

  // Public API of the module
  return {
    show: () => toggleActive(true),
    hide: () => toggleActive(false),
    isActive: () => overlay.classList.contains("active"),
    configureScenes: setupSceneClicks  // Expose the setupScenes function
  };
})();

export default MapOverlay;
