import { NinePatch } from '@koreez/phaser3-ninepatch';
import { canvasHeight, canvasWidth } from '..';
import { Atlases, Images } from '../assets';
import { AbstractScene } from './AbstractScene';

export class GameScene extends AbstractScene {
  private __ninePatch: NinePatch;
  private __direction: number = 1;

  public create(): void {
    this.add
      .image(
        canvasWidth * 0.5,
        canvasHeight * 0.5,
        Atlases.Main.Atlas.Name,
        Atlases.Main.Atlas.Frames.Bg,
      )
      .setScale(
        canvasWidth / Atlases.Main.Atlas.FrameSourceSizes.Bg.w,
        canvasHeight / Atlases.Main.Atlas.FrameSourceSizes.Bg.h,
      );

    this.__ninePatch = this.add.ninePatch(
      canvasWidth * 0.5,
      canvasHeight * 0.5,
      300,
      300,
      Images.SquareGreen.Name,
      null,
      {
        bottom: 14, // Amount of pixels for bottom
        left: 6, // Amount of pixels for left
        right: 6, // Amount of pixels for right
        top: 10, // Amount of pixels for top
      },
    );

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
