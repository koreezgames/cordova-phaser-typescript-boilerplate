import { NinePatch } from '@koreez/phaser3-ninepatch';
import { Atlases } from '../assets';
import { AbstractScene } from '../scenes/AbstractScene';
import { AbstractView } from './AbstractView';
import { ChipsGroup } from './ChipsGroup';

export class GameBoxView extends AbstractView {
  public scene: AbstractScene;

  private _ninePatch: NinePatch;

  public build(): void {
    const lifeBar = this.scene.add.image(
      0,
      -this.height * 0.5 + 30,
      Atlases.Main.Atlas.Name,
      Atlases.Main.Atlas.Frames.Lifebar,
    );
    this.add(lifeBar);
    this.add(new ChipsGroup(this.scene, 0, 20));

    if (__ENV__ !== 'production') {
      const rectangle = this.scene.add
        .rectangle(-this.width / 2, -this.height / 2, this.width, this.height)
        .setOrigin(0);
      rectangle.setStrokeStyle(1, 0xff0000);
      this.add(rectangle);
    }
  }
}
