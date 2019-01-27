import { NinePatch } from '@koreez/phaser3-ninepatch';
import { Atlases, Bitmapfonts, Fonts, Images, Spines } from '../assets';
import { AbstractScene } from './AbstractScene';

export class GameScene extends AbstractScene {
  private __ninePatch: NinePatch;
  private __direction: number = 1;

  private __width: number;
  private __height: number;

  public init(): void {
    //@ts-ignore
    this.__width = this.scale.width;
    //@ts-ignore
    this.__height = this.scale.height;
  }

  public create(): void {
    this.add
      .image(
        this.__width * 0.5,
        this.__height * 0.5,
        Atlases.Main.Atlas.Name,
        Atlases.Main.Atlas.Frames.Bg,
      )
      .setScale(
        this.__width / Atlases.Main.Atlas.FrameSourceSizes.Bg.w,
        this.__height / Atlases.Main.Atlas.FrameSourceSizes.Bg.h,
      );

    this.__ninePatch = this.add.ninePatch(
      this.__width * 0.5,
      this.__height * 0.5,
      this.__width * 0.2,
      this.__height * 0.2,
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
        this.__width * 0.2,
        this.__height * 0.2,
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
        this.__width,
        0,
        this.__width * 0.2,
        this.__height * 0.2,
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
        this.__height,
        this.__width * 0.2,
        this.__height * 0.2,
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
        this.__width,
        this.__height,
        this.__width * 0.2,
        this.__height * 0.2,
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
    //@ts-ignore
    this.add
      //@ts-ignore
      .spine(
        this.__width * 0.425,
        this.__height * 0.6,
        Spines.Builder.Spine.Name,
        Spines.Builder.Spine.Animations.Walking,
        true,
      )
      .setScale(0.14);
    this.add
      .text(this.__width * 0.41, this.__height * 0.3, 'text', {
        fontFamily: Fonts.K8x12.Font.Family,
        fontSize: this.__width * 0.2,
        color: '#ff0000',
      })
      .setShadow(2, 2, '#333333', 2, false, true);
    this.add
      .bitmapText(
        this.__width * 0.5,
        this.__height * 0.1,
        Bitmapfonts.HelveticaBold.Name,
        'Bitmap Text',
        this.__width * 0.1,
      )
      .setOrigin(0.5);
    super.create();
  }

  public update(): void {
    this.__ninePatch.angle += this.__direction;
  }

  public redraw(width: number, height: number, direction: number): void {
    this.__direction = direction;
    this.__ninePatch.resize(width, height);
  }
}
