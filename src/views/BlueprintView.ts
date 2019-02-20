import { AbstractView } from './AbstractView';

export class BlueprintView extends AbstractView {
  constructor(scene: Phaser.Scene, width: number, height: number) {
    super(scene);
    this.setSize(width, height);
    const rectangle = this.scene.add.rectangle(
      0,
      0,
      width,
      height,
      0x0073e5,
      0.9,
    );
    this.add(rectangle);
    const stepXX = this.width / 8;
    const stepYY = this.height / 8;
    for (let xx = 0; xx <= this.width; xx += stepXX) {
      const mainX = -this.width / 2 + xx;

      this.add(
        this.scene.add
          .line(0, 0, mainX, 0, mainX, this.height, 0xffffff, 0.25)
          .setLineWidth(8),
      );

      if (xx < this.width) {
        const secondaryX = (-this.width + stepXX) / 2 + xx;
        this.add(
          this.scene.add
            .line(0, 0, secondaryX, 0, secondaryX, this.height, 0xffffff, 0.12)
            .setLineWidth(4),
        );
      }
      if (xx !== 0 && xx !== this.width) {
        this.add(
          this.scene.add
            .text(mainX, -this.height / 2 + 10, mainX.toString(), {
              fontSize: 30,
            })
            .setOrigin(0.5, 0),
        );
      }
    }
    for (let yy = 0; yy <= this.height; yy += stepYY) {
      const mainY = -this.height / 2 + yy;
      this.add(
        this.scene.add
          .line(0, 0, 0, mainY, this.width, mainY, 0xffffff, 0.25)
          .setLineWidth(8),
      );

      if (yy < this.height) {
        const secondaryY = (-this.height + stepYY) / 2 + yy;
        this.add(
          this.scene.add
            .line(0, 0, 0, secondaryY, this.width, secondaryY, 0xffffff, 0.12)
            .setLineWidth(4),
        );
      }
      if (yy !== 0 && yy !== this.height) {
        this.add(
          this.scene.add
            .text(this.width / 2 - 10, mainY, mainY.toString(), {
              fontSize: 30,
            })
            .setAngle(90)
            .setOrigin(0.5, 0),
        );
      }
    }
    this.add(this.scene.add.rectangle(0, 0, 8, 8, 0xff0000));
  }
}
