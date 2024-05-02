import { getGlobalData } from "../utils/dataManagement/globalData.js";
import domUtils from "../utils/dom/DomUtils.js";

const { getElement } = domUtils;

export function setupViewer() {
  const { Marzipano, data } = getGlobalData();
  const panoElement = getElement("#pano");
  if (!panoElement) {
    console.error("Pano element not found in the document.");
    return null;
  }
  const viewerOpts = { controls: { mouseViewMode: data.settings.mouseViewMode } };
  return new Marzipano.Viewer(panoElement, viewerOpts);
}
