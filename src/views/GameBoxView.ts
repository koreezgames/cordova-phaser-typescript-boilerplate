import { Atlases } from '../assets';
import { AbstractScene } from '../scenes/AbstractScene';
import { AbstractView } from './AbstractView';
import { BlueprintView } from './BlueprintView';
import { ChipsGroup } from './ChipsGroup';

export class GameBoxView extends AbstractView {
  public scene: AbstractScene;

  public build(): void {
    if (__ENV__ !== 'production') {
      this.add(new BlueprintView(this.scene, this.width, this.height));
    }
    const lifeBar = this.scene.add.image(
      0,
      -this.height * 0.5 + 130,
      Atlases.Main.Atlas.Name,
      Atlases.Main.Atlas.Frames.Lifebar,
    );
    this.add(lifeBar);
    this.add(
      this.scene.add
        .text(0, lifeBar.y + lifeBar.height, 'LifeBar', {
          fontSize: 64,
        })
        .setOrigin(0.5),
    );
    const chipsGroup = new ChipsGroup(this.scene, 0, 100);
    this.add(chipsGroup);
    this.add(
      this.scene.add
        .text(0, this.height / 2 - chipsGroup.y / 2, 'Level #1', {
          fontSize: 80,
        })
        .setOrigin(0.5),
    );
  }
}
