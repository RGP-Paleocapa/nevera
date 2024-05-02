// HotSpots.js

function createLinkHotspotElement(hotspot, switchScene, findSceneDataById) {
  // Create wrapper element to hold icon and tooltip.
  var wrapper = document.createElement("div");
  wrapper.classList.add("hotspot");
  wrapper.classList.add("link-hotspot");

  // Create image element.
  var icon = document.createElement("img");
  icon.src = "assets/img/link.png";
  icon.classList.add("link-hotspot-icon");

  // Set rotation transform.
  var transformProperties = [
    "-ms-transform",
    "-webkit-transform",
    "transform",
  ];
  for (var i = 0; i < transformProperties.length; i++) {
    var property = transformProperties[i];
    icon.style[property] = "rotate(" + hotspot.rotation + "rad)";
  }

  // Add click event handler.
  wrapper.addEventListener("click", function () {
    switchScene(findSceneDataById(hotspot.target));
  });

  // Prevent touch and scroll events from reaching the parent element.
  // This prevents the view control logic from interfering with the hotspot.
  stopTouchAndScrollEventPropagation(wrapper);

  // Create tooltip element.
  var tooltip = document.createElement("div");
  tooltip.classList.add("hotspot-tooltip");
  tooltip.classList.add("link-hotspot-tooltip");
  tooltip.innerHTML = findSceneDataById(hotspot.target).name;

  wrapper.appendChild(icon);
  wrapper.appendChild(tooltip);

  return wrapper;
}

function createInfoHotspotElement(hotspot, stopTouchAndScrollEventPropagation) {
  // Create wrapper element to hold icon and tooltip.
  var wrapper = document.createElement("div");
  wrapper.classList.add("hotspot");
  wrapper.classList.add("info-hotspot");

  // Create hotspot/tooltip header.
  var header = document.createElement("div");
  header.classList.add("info-hotspot-header");

  // Create image element.
  var iconWrapper = document.createElement("div");
  iconWrapper.classList.add("info-hotspot-icon-wrapper");
  var icon = document.createElement("img");
  icon.src = "assets/img/info.png";
  icon.classList.add("info-hotspot-icon");
  iconWrapper.appendChild(icon);

  // Create title element.
  var titleWrapper = document.createElement("div");
  titleWrapper.classList.add("info-hotspot-title-wrapper");
  var title = document.createElement("div");
  title.classList.add("info-hotspot-title");
  title.innerHTML = hotspot.title;
  titleWrapper.appendChild(title);

  // Create close element.
  var closeWrapper = document.createElement("div");
  closeWrapper.classList.add("info-hotspot-close-wrapper");
  var closeIcon = document.createElement("img");
  closeIcon.src = "assets/img/close.png";
  closeIcon.classList.add("info-hotspot-close-icon");
  closeWrapper.appendChild(closeIcon);

  // Construct header element.
  header.appendChild(iconWrapper);
  header.appendChild(titleWrapper);
  header.appendChild(closeWrapper);

  // Create text element.
  var text = document.createElement("div");
  text.classList.add("info-hotspot-text");
  text.innerHTML = hotspot.text;

  // Place header and text into wrapper element.
  wrapper.appendChild(header);
  wrapper.appendChild(text);

  // Create a modal for the hotspot content to appear on mobile mode.
  var modal = document.createElement("div");
  modal.innerHTML = wrapper.innerHTML;
  modal.classList.add("info-hotspot-modal");
  document.body.appendChild(modal);

  var toggle = function () {
    wrapper.classList.toggle("visible");
    modal.classList.toggle("visible");
  };

  // Show content when hotspot is clicked.
  wrapper
    .querySelector(".info-hotspot-header")
    .addEventListener("click", toggle);

  // Hide content when close icon is clicked.
  modal
    .querySelector(".info-hotspot-close-wrapper")
    .addEventListener("click", toggle);

  // Prevent touch and scroll events from reaching the parent element.
  // This prevents the view control logic from interfering with the hotspot.
  stopTouchAndScrollEventPropagation(wrapper);

  return wrapper;
}

// Prevent touch and scroll events from reaching the parent element.
function stopTouchAndScrollEventPropagation(element, eventList) {
  var eventList = [
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
    "wheel",
    "mousewheel",
  ];
  for (var i = 0; i < eventList.length; i++) {
    element.addEventListener(eventList[i], function (event) {
      event.stopPropagation();
    });
  }
}

export { createInfoHotspotElement, createLinkHotspotElement, stopTouchAndScrollEventPropagation}