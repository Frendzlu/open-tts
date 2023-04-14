import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";
import { SceneManager } from "./SceneManager";

class App {
    constructor() {
        var canvas = document.createElement("canvas");
        canvas.width = document.body.clientWidth
        canvas.height = document.body.clientHeight
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);
        let engine = new Engine(canvas, true);
        let scene = SceneManager.MainScene(engine, canvas)
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
new App();