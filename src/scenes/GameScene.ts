import { GameBoxView } from '../views/GameBoxView';
import { AbstractScene } from './AbstractScene';

export class GameScene extends AbstractScene {
  private _gameBox: GameBoxView;

  public init(): void {}

  public create(): void {
    super.create();
    this._gameBox = new GameBoxView(this);
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
