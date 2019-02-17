import { Atlases } from '../assets';
import { viewportHeight, viewportWidth } from '../layouts';
import { AbstractScene } from './AbstractScene';

export class BgScene extends AbstractScene {
  private _width: number;
  private _height: number;

  public init(): void {
    this._width = this.game.scale.width;
    this._height = this.game.scale.height;
  }

  public create(): void {
    super.create();
    this.add
      .image(
        this._width * 0.5,
        this._height * 0.5,
        Atlases.Main.Atlas.Name,
        Atlases.Main.Atlas.Frames.Bg,
      )
      .setScale(
        Math.max(
          this._width / Atlases.Main.Atlas.FrameSourceSizes.Bg.w,
          this._height / Atlases.Main.Atlas.FrameSourceSizes.Bg.h,
        ),
      );

    const rectangle = this.add
      .rectangle(
        (this._width - viewportWidth) / 2,
        (this._height - viewportHeight) / 2,
        viewportWidth,
        viewportHeight,
      )
      .setOrigin(0);
    rectangle.setStrokeStyle(1, 0xff0000);
  }
}
