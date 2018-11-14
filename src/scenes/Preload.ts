import { loadAtlases, loadImages } from '../assetLoader';
import { Atlases, Images } from '../assets';
import { SceneKey } from '../constants/SceneKey';
import { AbstractScene } from './AbstractScene';

export class Preload extends AbstractScene {
  public preload(): void {
    loadAtlases(this, Atlases.Main.Atlas);
    loadImages(this, Images);
  }

  public create(): void {
    super.create();
    this.scene.start(SceneKey.main);
    this.scene.remove(this);
  }
}
