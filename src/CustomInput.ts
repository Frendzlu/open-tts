import { Camera, ICameraInput, ArcRotateCamera, Scene, Nullable, Observer, KeyboardInfo, KeyboardEventTypes } from "@babylonjs/core";

export default class CustomInput implements ICameraInput<Camera> {
  public camera!: ArcRotateCamera
  public keysUp = [87];
  public keysDown = [83];
  public keysLeft = [65];
  public keysRight = [68];
  public rotationalSpeed = 0.02;

  private _keys = new Array<number>();
  private _onKeyboardObserver!: Nullable<Observer<KeyboardInfo>>;
  private _scene!: Scene;

  getClassName(): string {
    return "CustomInput";
  }

  getSimpleName(): string {
    return "simple";
  }

  attachControl(noPreventDefault?: boolean): void {
    this._scene = this.camera.getScene();
    this._onKeyboardObserver = this._scene.onKeyboardObservable.add((kbInfo) => {
      const evt = kbInfo.event;

      if (kbInfo.type === KeyboardEventTypes.KEYDOWN &&
        (this.keysUp.indexOf(evt.keyCode) !== -1 ||
          this.keysDown.indexOf(evt.keyCode) !== -1 ||
          this.keysLeft.indexOf(evt.keyCode) !== -1 ||
          this.keysRight.indexOf(evt.keyCode) !== -1)
      ) {
        const index = this._keys.indexOf(evt.keyCode);

        if (index === -1) {
          this._keys.push(evt.keyCode);
        }

        if (evt.preventDefault) {
          if (!noPreventDefault) {
            evt.preventDefault();
          }
        }
      } else if (
        this.keysUp.indexOf(evt.keyCode) !== -1 ||
        this.keysDown.indexOf(evt.keyCode) !== -1 ||
        this.keysLeft.indexOf(evt.keyCode) !== -1 ||
        this.keysRight.indexOf(evt.keyCode) !== -1
      ) {
        const index = this._keys.indexOf(evt.keyCode);

        if (index >= 0) {
          this._keys.splice(index, 1);
        }

        if (evt.preventDefault) {
          if (!noPreventDefault) {
            evt.preventDefault();
          }
        }
      }
    });
  }

  detachControl(): void {
    if (this._scene) {
      if (this._onKeyboardObserver) {
        this._scene.onKeyboardObservable.remove(this._onKeyboardObserver);
      }

      this._onKeyboardObserver = null;
    }

    this._keys = [];
  }

  checkInputs(): void {
    if (this._onKeyboardObserver) {
      const camera = this.camera;
      for (let index = 0; index < this._keys.length; index++) {
        const keyCode = this._keys[index];
        if (this.keysLeft.indexOf(keyCode) !== -1) {
          camera.alpha -= this.rotationalSpeed
        } else if (this.keysUp.indexOf(keyCode) !== -1) {
          camera.beta -= this.rotationalSpeed
        } else if (this.keysRight.indexOf(keyCode) !== -1) {
          camera.alpha += this.rotationalSpeed
        } else if (this.keysDown.indexOf(keyCode) !== -1) {
          camera.beta += this.rotationalSpeed;
        }
      }
    }
  }
}