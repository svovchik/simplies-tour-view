// Created with Motiva Layama v1.5 https://www.motivacg.com/layama

function getLayamaCameras()
{
   var layamaCameras = new BABYLON.SmartArray(0);
   layamaCameras.push({n: "Layama0016", a: "CameraActor3", p: new BABYLON.Vector3(106.134, 150, 418.16), l: new BABYLON.Vector3(105.634, 150, 417.294)});
   layamaCameras.push({n: "Layama0002", a: "CameraActor_1", p: new BABYLON.Vector3(-180.452, 150, 414.24), l: new BABYLON.Vector3(-180.452, 150, 413.24)});
   layamaCameras.push({n: "Layama0009", a: "CameraActor2", p: new BABYLON.Vector3(-60.4843, 150, 416.2), l: new BABYLON.Vector3(-60.4843, 150, 415.2)});
   layamaCameras.push({n: "Layama0023", a: "CameraActor4", p: new BABYLON.Vector3(-185.99, 150, 177.205), l: new BABYLON.Vector3(-185.99, 150, 176.205)});
   layamaCameras.push({n: "Layama0030", a: "CameraActor5", p: new BABYLON.Vector3(-28.7637, 150, 126.966), l: new BABYLON.Vector3(-28.7637, 150, 125.966)});
   layamaCameras.push({n: "Layama0037", a: "CameraActor6", p: new BABYLON.Vector3(152.931, 150, 127.964), l: new BABYLON.Vector3(152.931, 150, 126.964)});
   layamaCameras.push({n: "Layama0044", a: "CameraActor7", p: new BABYLON.Vector3(332.63, 150, 40.112), l: new BABYLON.Vector3(332.63, 150, 39.112)});
   layamaCameras.push({n: "Layama0051", a: "CameraActor8", p: new BABYLON.Vector3(-160.107, 150, -134.284), l: new BABYLON.Vector3(-160.107, 150, -135.284)});
   layamaCameras.push({n: "Layama0058", a: "CameraActor9", p: new BABYLON.Vector3(5.98389, 150, -224.711), l: new BABYLON.Vector3(5.98389, 150, -225.711)});
   layamaCameras.push({n: "Layama0065", a: "CameraActor10", p: new BABYLON.Vector3(26.8181, 150, -454.983), l: new BABYLON.Vector3(26.8181, 150, -455.983)});
   layamaCameras.push({n: "Layama0072", a: "CameraActor11", p: new BABYLON.Vector3(306.434, 150, -469.238), l: new BABYLON.Vector3(306.434, 150, -470.238)});
   return layamaCameras;
}

function getLayamaResolutions()
{
   var layamaResolutions = new BABYLON.SmartArray(0);
   layamaResolutions.push("2048");
   layamaResolutions.push("1024");
   return layamaResolutions;
}

function getOnScreenLogoUsage()
{
   return 0;
}

function getLayamaControls()
{
   return {defMove: false, defRot: 1, altMove: true, altRot: 2};
}

function getLayamaSpeed()
{
   return 2;
}

