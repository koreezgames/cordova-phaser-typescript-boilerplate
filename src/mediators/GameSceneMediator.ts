import { inject, injectable } from '@robotlegsjs/core';
import { GameModel } from '../models/GameModel';
import { GameScene } from '../scenes/GameScene';
import { GameStartupSignal } from '../signals/GameStartupSignal';
import { AbstractSceneMediator } from './AbstractSceneMediator';

@injectable()
export class GameSceneMediator extends AbstractSceneMediator<GameScene> {
  @inject(GameModel)
  public gameModel: GameModel;
  @inject(GameStartupSignal)
  public gameStartupSignal: GameStartupSignal;

  public initialize(): void {
    super.initialize();
    this.gameStartupSignal.dispatch(1000 + Math.random() * 4000);
  }

  // override
  protected sceneCreated(): void {
    this.addReaction(
      () => ({
        width: this.gameModel.width,
        height: this.gameModel.height,
        rotationDirection: this.gameModel.rotationDirection,
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
    this.scene.redraw(width, height, rotationDirection);
  }
}
