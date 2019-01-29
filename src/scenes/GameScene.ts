import { NinePatch } from '@koreez/phaser3-ninepatch';
import { Atlases, Bitmapfonts, Fonts, Images, Spines } from '../assets';
import { AbstractScene } from './AbstractScene';

export class GameScene extends AbstractScene {
  private _ninePatch: NinePatch;
  private _direction: number = 1;

  private _width: number;
  private _height: number;

  public init(): void {
    // @ts-ignore
    this._width = this.scale.width;
    // @ts-ignore
    this._height = this.scale.height;
  }

  public create(): void {
    this.__test();
    this.add
      .image(
        this._width * 0.5,
        this._height * 0.5,
        Atlases.Main.Atlas.Name,
        Atlases.Main.Atlas.Frames.Bg,
      )
      .setScale(
        this._width / Atlases.Main.Atlas.FrameSourceSizes.Bg.w,
        this._height / Atlases.Main.Atlas.FrameSourceSizes.Bg.h,
      );

    this._ninePatch = this.add.ninePatch(
      this._width * 0.5,
      this._height * 0.5,
      this._width * 0.2,
      this._height * 0.2,
      Images.SquareGreen.Name,
      null,
      {
        bottom: 14, // Amount of pixels for bottom
        left: 6, // Amount of pixels for left
        right: 6, // Amount of pixels for right
        top: 10, // Amount of pixels for top
      },
    );
    this.add
      .ninePatch(
        0,
        0,
        this._width * 0.2,
        this._height * 0.2,
        Images.SquareGreen.Name,
        null,
        {
          bottom: 14, // Amount of pixels for bottom
          left: 6, // Amount of pixels for left
          right: 6, // Amount of pixels for right
          top: 10, // Amount of pixels for top
        },
      )
      .setOrigin(0, 0);
    this.add
      .ninePatch(
        this._width,
        0,
        this._width * 0.2,
        this._height * 0.2,
        Images.SquareGreen.Name,
        null,
        {
          bottom: 14, // Amount of pixels for bottom
          left: 6, // Amount of pixels for left
          right: 6, // Amount of pixels for right
          top: 10, // Amount of pixels for top
        },
      )
      .setOrigin(1, 0);
    this.add
      .ninePatch(
        0,
        this._height,
        this._width * 0.2,
        this._height * 0.2,
        Images.SquareGreen.Name,
        null,
        {
          bottom: 14, // Amount of pixels for bottom
          left: 6, // Amount of pixels for left
          right: 6, // Amount of pixels for right
          top: 10, // Amount of pixels for top
        },
      )
      .setOrigin(0, 1);
    this.add
      .ninePatch(
        this._width,
        this._height,
        this._width * 0.2,
        this._height * 0.2,
        Images.SquareGreen.Name,
        null,
        {
          bottom: 14, // Amount of pixels for bottom
          left: 6, // Amount of pixels for left
          right: 6, // Amount of pixels for right
          top: 10, // Amount of pixels for top
        },
      )
      .setOrigin(1, 1);
    // @ts-ignore
    this.add
      // @ts-ignore
      .spine(
        this._width * 0.425,
        this._height * 0.6,
        Spines.Builder.Spine.Name,
        Spines.Builder.Spine.Animations.Walking,
        true,
      )
      .setScale(0.14);
    this.add
      .text(this._width * 0.41, this._height * 0.3, 'text', {
        fontFamily: Fonts.K8x12.Font.Family,
        fontSize: this._width * 0.2,
        color: '#ff0000',
      })
      .setShadow(2, 2, '#333333', 2, false, true);
    this.add
      .bitmapText(
        this._width * 0.5,
        this._height * 0.1,
        Bitmapfonts.HelveticaBold.Name,
        'Bitmap Text',
        this._width * 0.1,
      )
      .setOrigin(0.5);
    super.create();
  }

  public update(): void {
    this._ninePatch.angle += this._direction;
  }

  public redraw(width: number, height: number, direction: number): void {
    this._direction = direction;
    this._ninePatch.resize(width, height);
  }

  private __test(): void {
    // @ts-ignore
    Phaser.GameObjects.BitmapText.ParseFromAtlas(
      this,
      'Font',
      'testAtlas',
      'helvetica_bold.png',
      'testXML',
    );

    Helper.FontUtils.addSpriteIntoFont(
      this.sys.game,
      'Font',
      'aaa1973429524.png',
      0xbc,
    );

    Helper.FontUtils.addSpriteIntoFont(
      this.sys.game,
      'Font',
      'iconimg284793.png',
      0xbd,
      '0',
      Helper.FontUtils.ALIGN_BOTTOM,
      1,
    );

    this.add
      .bitmapText(100, 1700, 'Font', '\u00BD \u00BD There is \u00BC', 120)
      .setDepth(9999);
  }
}

namespace Helper {
  export class FontUtils {
    public static readonly ALIGN_TOP: number = 0;
    public static readonly ALIGN_CENTER: number = 1;
    public static readonly ALIGN_BOTTOM: number = 2;

    // -------------------------------------------------------------------------
    /**
     * Add sprite into bitmap font, position it and assign it character code.
     * Then you can print it along with other font characters.
     *
     * @param {Phaser.Game} game - Phaser game
     * @param {string} fontName - name of font (the same as used in cache as key)
     * @param {(string|number)} frame - new sprite character frame
     * @param {number} newCharCode - char code to assign to sprite character
     * @param {(number|string)} [referenceChar = "0"] - reference character to position sprite character against
     * @param {number} [align = FontUtils.ALIGN_CENTER] - align to top, center or bottom of reference character
     * @param {number} [originY = 0.5] - origin of sprite character on y axis
     */
    public static addSpriteIntoFont(
      game: Phaser.Game,
      fontName: string,
      frame: string | number,
      newCharCode: number,
      referenceChar: number | string = '0',
      align: number = FontUtils.ALIGN_CENTER,
      originY: number = 0.5,
    ): void {
      // if reference char is string, convert it to number
      if (typeof referenceChar === 'string') {
        referenceChar = referenceChar.charCodeAt(0);
      }

      // get font characters and reference character
      let font: any = game.cache.bitmapFont.get(fontName);
      let fontChars: any = (font.data as BitmapFontData).chars;
      let refChar: any = fontChars[referenceChar];

      if (refChar == null) {
        throw new Error(
          `Reference character ${String.fromCharCode(
            referenceChar,
          )} with code ${referenceChar} is mssing in font. Try another.`,
        );
      }

      // get frame of new sprite character
      let f: any = game.textures.getFrame(font['texture'], frame);
      let fWidth: number = f.customData['sourceSize']['w'];
      let fHeight: number = f.customData['sourceSize']['h'];

      // calculate y offset of sprite chracter
      let refY: any =
        refChar.yOffset +
        (align === FontUtils.ALIGN_CENTER
          ? refChar.height / 2
          : align === FontUtils.ALIGN_BOTTOM
          ? refChar.height
          : 0);
      let yOffset: any = Math.round(refY - fHeight * originY);

      // add new sprite character
      fontChars[newCharCode] = {
        x: f.cutX,
        y: f.cutY,
        width: f.cutWidth,
        height: f.cutHeight,
        centerX: Math.floor(fWidth / 2),
        centerY: Math.floor(fHeight / 2),
        xOffset: 0,
        yOffset: yOffset,
        xAdvance: fWidth + 2,
        data: {},
        kerning: {},
      };
    }
  }
}
