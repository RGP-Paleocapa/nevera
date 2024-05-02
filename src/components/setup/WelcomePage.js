import domUtils from "../../utils/dom/DomUtils.js";

function setupWelcomePage() {
  const welcomePage = domUtils.getElement("#welcome-page");
  const exploreButton = domUtils.getElement("#explore-button");
  const infoButton = domUtils.getElement("#info-button");

  if (localStorage.getItem("intro") !== "true") {
    domUtils.addClass(welcomePage, "active");
  }

  domUtils.addListener(exploreButton, "click", () => {
    domUtils.setLocalStorage("intro", "true");
    domUtils.removeClass(welcomePage, "active");
  });

  domUtils.addListener(infoButton, "click", () => {
    domUtils.addClass(welcomePage, "active");
  });
}

export { setupWelcomePage };
