import { inject, injectable } from '@robotlegsjs/core';
import { GameModel } from '../models/GameModel';
import { Main } from '../scenes';
import { GameStartupSignal } from '../signals';
import { AbstractSceneMediator } from './AbstractSceneMediator';

@injectable()
export class MainMediator extends AbstractSceneMediator<Main> {
  @inject(GameModel)
  public gameModel: GameModel;
  @inject(GameStartupSignal)
  public gameStartupSignal: GameStartupSignal;

  public initialize(): void {
    super.initialize();
    this.gameStartupSignal.dispatch(1000 + Math.random() * 4000);
  }

  // override
  protected _sceneCreated(): void {
    this._addReaction(
      () => ({
        width: this.gameModel.width,
        height: this.gameModel.height,
        rotationDirection: this.gameModel.rotationDirection,
      }),
      this._update,
    );
  }

  protected _update({
    width,
    height,
    rotationDirection,
  }: {
    width: number;
    height: number;
    rotationDirection: number;
  }): void {
    console.log(width);
    this.scene.redraw(width, height, rotationDirection);
  }
}
