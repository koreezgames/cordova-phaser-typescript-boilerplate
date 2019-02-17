import { viewBox } from '../layouts';
import { GameBox } from '../views/GameBox';
import { AbstractScene } from './AbstractScene';

export class GameScene extends AbstractScene {
  private _gameBox: GameBox;

  public init(): void {}

  public create(): void {
    super.create();
    this._gameBox = new GameBox(this);
    this._gameBox.setPosition(
      (this.scale.width - viewBox.width) / 2,
      (this.scale.height - viewBox.height) / 2,
    );
    this._gameBox.setSize(viewBox.width, viewBox.height);
    this._gameBox.build();
    this.add.existing(this._gameBox);
  }

  public update(): void {
    // this._ninePatch.angle += this._direction;
  }

  public redraw(width: number, height: number, direction: number): void {
    // this._direction = direction;
    // this._ninePatch.resize(width, height);
  }
}
