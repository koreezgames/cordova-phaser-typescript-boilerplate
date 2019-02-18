import { Atlases } from '../assets';
import { portraitOrLandscape } from '../layouts';
import { AbstractView } from './AbstractView';

export class ChipsGroup extends AbstractView {
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x, y);
    const playboard = this.scene.add
      .image(0, 0, Atlases.Main.Atlas.Name, Atlases.Main.Atlas.Frames.Playboard)
      .setRotation(this.scene.scale.isGameLandscape ? Math.PI / 2 : 0);
    this.add(playboard);

    const startX =
      playboard.x -
      portraitOrLandscape(this.scene.scale, playboard.width, playboard.height) /
        2 +
      10;
    const startY =
      playboard.y -
      portraitOrLandscape(this.scene.scale, playboard.height, playboard.width) /
        2 +
      10;

    const xxx = portraitOrLandscape(this.scene.scale, 6, 9);
    const yyy = portraitOrLandscape(this.scene.scale, 9, 6);

    // add some chips 6 cols 9 rows
    for (let xx = 0; xx < xxx; xx += 1) {
      for (let yy = 0; yy < yyy; yy += 1) {
        // Pick random name

        const gemX =
          startX +
          xx * (Atlases.Main.Atlas.FrameSourceSizes.Gem5.w + 13) +
          Atlases.Main.Atlas.FrameSourceSizes.Gem5.w / 2;
        const gemY =
          startY +
          yy * (Atlases.Main.Atlas.FrameSourceSizes.Gem5.h + 12.5) +
          Atlases.Main.Atlas.FrameSourceSizes.Gem5.h / 2;

        const gem = this.scene.add.image(
          gemX,
          gemY,
          Atlases.Main.Atlas.Name,
          // @ts-ignore
          // tslint:disable-next-line:insecure-random
          Atlases.Main.Atlas.Frames[`Gem${Math.floor(Math.random() * 5) + 1}`],
        );

        gem.setInteractive();
        gem.on(Phaser.Input.Events.POINTER_DOWN, () => gem.setScale(1.2));

        // add game to this group
        this.add(gem);
        this._gems.push(gem);
      }
    }

    this.scene.input.on(Phaser.Input.Events.POINTER_UP, () =>
      this._gems.forEach(gem => gem.setScale(1)),
    );
  }

  private _gems: Phaser.GameObjects.Image[] = [];
}
