import { NinePatch } from '@koreez/phaser3-ninepatch';
import {
  Atlases,
  Bitmapfonts,
  Fonts,
  Images,
  Spines,
  Spritefonts,
} from '../assets';
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
        Bitmapfonts.HelveticaRegular.Name,
        'Bitmap Text',
        this._width * 0.1,
      )
      .setOrigin(0.5);
    super.create();

    this.add
      .bitmapText(
        this._width * 0.1,
        this._height * 0.7,
        Spritefonts.HelveticaBold.Name,
        'The quick brown \u00BB jumps\nover the lazy \u00AA',
        this._width * 0.06,
      )
      .setCenterAlign()
      .setDepth(9999);
  }

  public update(): void {
    this._ninePatch.angle += this._direction;
  }

  public redraw(width: number, height: number, direction: number): void {
    this._direction = direction;
    this._ninePatch.resize(width, height);
  }
}
