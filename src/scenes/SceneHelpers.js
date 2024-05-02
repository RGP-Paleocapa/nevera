function findSceneById(scenes, id) {
  console.log("Available scenes and their IDs:", scenes.map(s => s.data.id));

  const foundScene = scenes.find(scene => scene.data.id === id);
  if (!foundScene) {
    console.error("Scene not found for id:", id);
  }
  return foundScene;
}

  
function findSceneDataById(data, id) {
  return data.scenes.find(scene => scene.id === id);
}
  
export { findSceneById, findSceneDataById };
  