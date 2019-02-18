import { inject, injectable } from '@robotlegsjs/core';
import { Game } from '../Game';
import { designHeight, designWidth, viewBox } from '../layouts';
import { GameModel } from '../models/GameModel';
import { GameBoxView } from '../views/GameBoxView';
import { AbstractViewMediator } from './AbstractViewMediator';

@injectable()
export class GameBoxViewMediator extends AbstractViewMediator<GameBoxView> {
  @inject('game')
  private _game: Game;

  @inject(GameModel)
  private _gameModel: GameModel;

  public initialize(): void {
    super.initialize();
    this.view.setPosition(
      (this._game.scale.width - viewBox.width) / 2,
      (this._game.scale.height - viewBox.height) / 2,
    );
    this.view.setSize(designWidth, designHeight);
    this.view.setDisplaySize(viewBox.width, viewBox.height);
    // this.view.build();
    this.addReaction(
      () => ({
        width: this._gameModel.width,
        height: this._gameModel.height,
        rotationDirection: this._gameModel.rotationDirection,
      }),
      this._update,
    );
  }

  private _update({
    width,
    height,
    rotationDirection,
  }: {
    width: number;
    height: number;
    rotationDirection: number;
  }): void {
    // this.scene.redraw(width, height, rotationDirection);
  }
}
