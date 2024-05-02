import { getGlobalData } from "../utils/dataManagement/globalData.js";
import Sanitization from "../utils/security/Sanitization.js";
import domUtils from "../utils/dom/DomUtils.js";

const { Marzipano } = getGlobalData();
const { getElement, getElements } = domUtils;

function configureSceneSource(sceneData, urlPrefix) {
  return Marzipano.ImageUrlSource.fromString(
    `${urlPrefix}/${sceneData.id}/{z}/{f}/{y}/{x}.jpg`,
    { cubeMapPreviewUrl: `${urlPrefix}/${sceneData.id}/preview.jpg` }
  );
}

function configureView(sceneData) {
  const limiter = Marzipano.RectilinearView.limit.traditional(
    sceneData.faceSize,
    (100 * Math.PI) / 180,
    (120 * Math.PI) / 180
  );
  return new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);
}

function updateSceneDisplay(scene) {
  updateSceneName(scene);
  updateSceneList(scene);
}

function updateSceneName(scene) {
  const sceneNameElement = getElement("#titleBar .sceneName");
  sceneNameElement.innerHTML = Sanitization(scene.data.name);
}

function updateSceneList(scene) {
  const sceneElements = getElements("#sceneList .scene");
  sceneElements.forEach(el => {
      el.classList.toggle("current", el.getAttribute("data-id") === scene.data.id);
  });
}

export { configureSceneSource, configureView, updateSceneDisplay };