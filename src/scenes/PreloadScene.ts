import {
  loadAtlases,
  loadAudio,
  loadBitmapfonts,
  loadImages,
} from '../assetLoader';
import { Atlases, Audios, Bitmapfonts, Images } from '../assets';
import { SceneKey } from '../constants/SceneKey';
import { AbstractScene } from './AbstractScene';

export class PreloadScene extends AbstractScene {
  public preload(): void {
    this.i18n.initialize(
      {
        fallbackLng: 'en',
        loadPath: 'assets/locales/{{lng}}/{{ns}}.json',
        debug: false,
      },
      () => {
        //
      },
    );
    loadAtlases(this, Atlases);
    loadAudio(this, Audios);
    loadBitmapfonts(this, Bitmapfonts);
    loadImages(this, Images);
  }

  public create(): void {
    super.create();
    this.scene.start(SceneKey.main);
    this.scene.remove(this);
  }
}
