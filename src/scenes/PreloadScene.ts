import {
  loadAtlases,
  loadAudios,
  loadBitmapfonts,
  loadImages,
  loadSpritefonts,
} from '../assetLoader';
import { Atlases, Audios, Bitmapfonts, Images, Spritefonts } from '../assets';
import { SceneKey } from '../constants/SceneKey';
import { AbstractScene } from './AbstractScene';

export class PreloadScene extends AbstractScene {
  public i18n: { initialize(config: object, cb: Function): void };

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
    loadAudios(this, Audios);
    loadBitmapfonts(this, Bitmapfonts);
    loadImages(this, Images);
    loadSpritefonts(this, Spritefonts);
  }

  public create(): void {
    // createSpritefont(this, Spritefonts.HelveticaBold);
    super.create();
    this.scene.start(SceneKey.Bg);
    this.scene.start(SceneKey.Game);
    this.scene.bringToTop(SceneKey.Game);
    this.scene.remove(this);
  }
}
