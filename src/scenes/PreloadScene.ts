import {
  loadAtlases,
  loadAudios,
  loadBitmapfonts,
  loadImages,
  loadSpines,
  loadXMLs,
} from '../assetLoader';
import { Atlases, Audios, Bitmapfonts, Images, Spines, Xmls } from '../assets';
import { SceneKey } from '../constants/SceneKey';
import { AbstractScene } from './AbstractScene';
import { prepareSpriteFont, SpriteFontAlign } from '../utils';

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
    loadXMLs(this, Xmls);
  }

  public create(): void {
    prepareSpriteFont(
      this,
      'Font',
      Atlases.Main.Atlas.Name,
      Atlases.Main.Atlas.Frames.HelveticaBold,
      [
        {
          frame: Atlases.Main.Atlas.Frames.Card,
          charCode: 0xbd,
        },
        {
          frame: Atlases.Main.Atlas.Frames.Card,
          charCode: 0xbc,
          originY: 1,
        },
        {
          frame: Atlases.Main.Atlas.Frames.Card,
          charCode: 0xba,
          originY: 0,
        },
        {
          frame: Atlases.Main.Atlas.Frames.Mushroom,
          charCode: 0xaa,
          originY: 0.5,
          align: SpriteFontAlign.AlignCenter,
        },
      ],
    );
    super.create();
    this.scene.start(SceneKey.main);
    this.scene.remove(this);
  }
}
