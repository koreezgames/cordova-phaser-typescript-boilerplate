import { GameBoxView } from '../views/GameBoxView';
import { AbstractScene } from './AbstractScene';

export class GameScene extends AbstractScene {
  private _gameBox: GameBoxView;

  public create(): void {
    super.create();
    this._gameBox = new GameBoxView(this);
    this.add.existing(this._gameBox);
  }
}
