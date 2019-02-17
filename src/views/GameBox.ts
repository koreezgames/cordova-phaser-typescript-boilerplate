import { NinePatch } from '@koreez/phaser3-ninepatch';
import { Bitmapfonts, Fonts, Images, Spines, Spritefonts } from '../assets';
import { viewBox } from '../layouts';
import { AbstractScene } from '../scenes/AbstractScene';
import { AbstractView } from './AbstractView';

export class GameBox extends AbstractView {
  public scene: AbstractScene;

  private _ninePatch: NinePatch;

  public build(): void {
    const rectangle = this.scene.add
      .rectangle(0, 0, this.width, this.height)
      .setOrigin(0);
    rectangle.setStrokeStyle(1, 0xff0000);
    this.add(rectangle);
    this._ninePatch = this.scene.add.ninePatch(
      this.width * 0.5,
      this.height * 0.5,
      this.width * 0.2,
      this.height * 0.2,
      Images.SquareGreen.Name,
      null,
      {
        bottom: 14, // Amount of pixels for bottom
        left: 6, // Amount of pixels for left
        right: 6, // Amount of pixels for right
        top: 10, // Amount of pixels for top
      },
    );
    this.add(this._ninePatch);

    this.add(
      this.scene.add
        .ninePatch(
          0,
          0,
          this.width * 0.2,
          this.height * 0.2,
          Images.SquareGreen.Name,
          null,
          {
            bottom: 14, // Amount of pixels for bottom
            left: 6, // Amount of pixels for left
            right: 6, // Amount of pixels for right
            top: 10, // Amount of pixels for top
          },
        )
        .setOrigin(0, 0),
    );
    this.add(
      this.scene.add
        .ninePatch(
          this.width,
          0,
          this.width * 0.2,
          this.height * 0.2,
          Images.SquareGreen.Name,
          null,
          {
            bottom: 14, // Amount of pixels for bottom
            left: 6, // Amount of pixels for left
            right: 6, // Amount of pixels for right
            top: 10, // Amount of pixels for top
          },
        )
        .setOrigin(1, 0),
    );
    this.add(
      this.scene.add
        .ninePatch(
          0,
          this.height,
          this.width * 0.2,
          this.height * 0.2,
          Images.SquareGreen.Name,
          null,
          {
            bottom: 14, // Amount of pixels for bottom
            left: 6, // Amount of pixels for left
            right: 6, // Amount of pixels for right
            top: 10, // Amount of pixels for top
          },
        )
        .setOrigin(0, 1),
    );

    this.add(
      this.scene.add
        .ninePatch(
          this.width,
          this.height,
          this.width * 0.2,
          this.height * 0.2,
          Images.SquareGreen.Name,
          null,
          {
            bottom: 14, // Amount of pixels for bottom
            left: 6, // Amount of pixels for left
            right: 6, // Amount of pixels for right
            top: 10, // Amount of pixels for top
          },
        )
        .setOrigin(1, 1),
    );

    this.add(
      this.scene.add
        // @ts-ignore
        .spine(
          this.width * 0.425,
          this.height * 0.6,
          Spines.Builder.Spine.Name,
          Spines.Builder.Spine.Animations.Walking,
          true,
        )
        .setScale(0.14 * viewBox.scale),
    );

    this.add(
      this.scene.add
        .text(this.width * 0.41, this.height * 0.3, 'text', {
          fontFamily: Fonts.K8x12.Font.Family,
          fontSize: this.width * 0.2,
          color: '#ff0000',
        })
        .setShadow(2, 2, '#333333', 2, false, true),
    );

    this.add(
      this.scene.add
        .bitmapText(
          this.width * 0.5,
          this.height * 0.1,
          Bitmapfonts.HelveticaRegular.Name,
          'Bitmap Text',
          this.width * 0.1,
        )
        .setOrigin(0.5),
    );

    this.add(
      this.scene.add
        .bitmapText(
          this.width * 0.1,
          this.height * 0.7,
          Spritefonts.HelveticaBold.Name,
          'The quick brown \u00BB jumps\nover the lazy \u00AA',
          this.width * 0.06,
        )
        .setCenterAlign()
        .setDepth(9999),
    );
  }
}
