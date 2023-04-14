import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
import CustomInput from './CustomInput';

export class SceneManager {
    public static MainScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
        var scene = new Scene(engine);

        var camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);
        camera.inputs.remove(camera.inputs.attached.keyboard);
        camera.inputs.add(new CustomInput());
        camera.panningSensibility = 0;
        camera.lowerRadiusLimit = 10
        camera.upperRadiusLimit = 50
        
        scene.registerBeforeRender(() => {
            canvas.focus()
        });

        new HemisphericLight("light1", new Vector3(10, 12, 10), scene);
        let box1 = MeshBuilder.CreateBox("box", { width: 4, height: 2, depth: 3, }, scene)
        box1.position = new Vector3(0, 1, 0)
        MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);
        return scene;
    }
}