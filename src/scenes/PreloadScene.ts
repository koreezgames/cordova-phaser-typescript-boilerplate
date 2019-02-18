import { loadAtlases, loadAudios, loadBitmapfonts, loadImages, loadSpritefonts } from '../assetLoader';
import { Atlases, Audios, Bitmapfonts, Images, Spritefonts } from '../assets';
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
    loadAudios(this, Audios);
    loadBitmapfonts(this, Bitmapfonts);
    loadImages(this, Images);
    loadSpritefonts(this, Spritefonts);
  }

  public create(): void {
    // createSpritefont(this, Spritefonts.HelveticaBold);
    super.create();
    this.scene.start(SceneKey.bg);
    this.scene.start(SceneKey.game);
    this.scene.bringToTop(SceneKey.game);
    this.scene.remove(this);
  }
}
