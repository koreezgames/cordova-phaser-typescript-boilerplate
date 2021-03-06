import { SceneKey } from '../constants/SceneKey';
import { AbstractScene } from './AbstractScene';

export class BootScene extends AbstractScene {
  public create(): void {
    super.create();
    this.scene.start(SceneKey.Preload);
    this.scene.remove(this);
  }
}
