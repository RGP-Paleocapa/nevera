"use strict";

import AutoRotate from "./components/viewerControls/AutoRotate.js";
import FullScreenToggle from "./components/viewerControls/FullScreenToggle.js";
import MapOverlay from "./components/viewerControls/MapOverlay.js";
import { setupWelcomePage } from "./components/setup/WelcomePage.js";
import { findSceneDataById, findSceneById } from "./scenes/SceneHelpers.js";
import { configureSceneSource, configureView, updateSceneDisplay } from "./scenes/SceneManagement.js";
import { setupViewer } from "./scenes/ViewSetup.js";
import domUtils from "./utils/dom/DomUtils.js";
import { detectDeviceType, detectTouchCapability, tooltipFallback } from "./utils/dom/MediaQuery.js"; 
import { getGlobalData } from "./utils/dataManagement/globalData.js";

// Device and feature detections
detectDeviceType();
detectTouchCapability();
tooltipFallback();

// Extracting global data
const { Marzipano, screenfull, data } = getGlobalData();

(function main() {
    const { getElement } = domUtils;
    const autorotateToggleElement = getElement("#autorotateToggle");
    const fullscreenToggleElement = getElement("#fullscreenToggle");
    const viewer = setupViewer();
    if (!viewer) {
        console.error("Viewer initialization failed");
        return; // Early exit if viewer fails to initialize
    }
    const autorotateControl = AutoRotate(Marzipano, viewer, autorotateToggleElement);

    function switchScene(scene) {
        if (!scene) {
            console.error("Error: No scene object provided.");
            return;
        }

        if (!scene.view) {
            console.error("Error: view property is missing on the scene object.");
            return;
        }
        if (typeof scene.view.setParameters !== 'function') {
            console.error("Error: setParameters function missing in scene.view");
            return;
        }
        if (!scene.data || !scene.data.initialViewParameters) {
            console.error("Error: initialViewParameters missing in scene.data");
            return;
        }
        if (typeof scene.scene.switchTo !== 'function') {
            console.error("Error: switchTo function missing in scene.scene");
            return;
        }
    
        autorotateControl.stop();
        scene.view.setParameters(scene.data.initialViewParameters);
        scene.scene.switchTo();
        autorotateControl.start();
        updateSceneDisplay(scene);
    }

    // let scenes = []; // Declare scenes array here
    // scenes = data.scenes.map(sceneData => initializeScene(sceneData, scenes)); // Pass scenes as a parameter
    let scenes = data.scenes.map(sceneData => initializeScene(sceneData)).filter(scene => scene != null);  // Ensure only valid scenes are processed
    scenes.forEach(scene => addHotspots(scene, switchScene));


    function initializeScene(sceneData) {
        const urlPrefix = "assets/tiles";
        const source = configureSceneSource(sceneData, urlPrefix);
        const geometry = new Marzipano.CubeGeometry(sceneData.levels);
        const view = configureView(sceneData);
        if (!view) {
            console.error("Failed to initialize view for scene:", sceneData.name);
            return null;
        }
        const scene = viewer.createScene({ source, geometry, view, pinFirstLevel: true });
        if (!scene || !scene.hotspotContainer) {
            console.error("Scene or hotspotContainer is not properly initialized for:", sceneData.name);
            return null;
        }
        console.log("Created scene object:", { data: sceneData, scene: scene, view: view });
        return { data: sceneData, scene, view };
    }
    

    function addHotspots(scene, switchSceneFunc) {
        // Validate that the scene object has the necessary methods
        if (!scene || typeof scene.scene.hotspotContainer !== 'function') {
            console.error("Invalid scene object passed to addHotspots:", scene);
            return;
        }
    
        // Proceed to create hotspots
        scene.data.linkHotspots.forEach(hotspot => {
            scene.scene.hotspotContainer().createHotspot(createHotspotElement(hotspot, 'link', switchSceneFunc, scenes), { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
        scene.data.infoHotspots.forEach(hotspot => {
            scene.scene.hotspotContainer().createHotspot(createHotspotElement(hotspot, 'info', switchSceneFunc, scenes), { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
    }
    

    FullScreenToggle(screenfull, fullscreenToggleElement);
    MapOverlay.configureScenes([scenes[0], scenes[2], scenes[5], scenes[8], scenes[10]], switchScene);
    switchScene(scenes[0]); // Display the initial scene

    // Setup the welcome page
    setupWelcomePage();
})();

function createHotspotElement(hotspot, type, switchScene, scenes) {
    const element = document.createElement("div");
    element.className = `hotspot ${type}-hotspot`;
    element.innerHTML = `<img src="assets/img/${type}.png" class="${type}-hotspot-icon">`;

    if (type === 'link') {
        const tooltip = document.createElement("div");
        tooltip.className = "hotspot-tooltip link-hotspot-tooltip";
        // Additional logging to check hotspot details
    console.log(`Creating hotspot for type ${type} with target ${hotspot.target}`);
        tooltip.textContent = findSceneDataById(data, hotspot.target).name;
        element.appendChild(tooltip);

        element.addEventListener("click", () => {
            let targetScene = findSceneById(scenes, hotspot.target);
            console.log("Hotspot clicked - target scene object:", targetScene);
            if (!targetScene) {
                console.error("Hotspot target scene not found:", hotspot.target);
                return;
            }
            switchScene(targetScene);
        });
    }

    preventTouchAndScrollEventPropagation(element);
    return element;
}

// Prevents touch and scroll event propagation
function preventTouchAndScrollEventPropagation(element) {
    const events = ["touchstart", "touchmove", "touchend", "touchcancel", "wheel", "mousewheel"];
    events.forEach(event => element.addEventListener(event, event => event.stopPropagation()));
}
