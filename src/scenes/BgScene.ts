import { Atlases } from '../assets';
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
  }
}
