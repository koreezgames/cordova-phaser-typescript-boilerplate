import {
  loadAtlases,
  loadAudios,
  loadBitmapfonts,
  loadImages,
  loadSpines,
} from '../assetLoader';
import { Atlases, Audios, Bitmapfonts, Images, Spines } from '../assets';
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
    loadSpines(this, Spines);

    this.load.atlas(
      'testAtlas',
      'assets/atlases/test.png',
      'assets/atlases/test.json',
    );

    this.load.xml('testXML', 'assets/bitmapfonts/helvetica_bold.xml');
  }

  public create(): void {
    super.create();
    this.scene.start(SceneKey.main);
    this.scene.remove(this);
  }
}
