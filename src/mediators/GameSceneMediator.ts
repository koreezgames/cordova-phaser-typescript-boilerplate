import { inject, injectable } from '@robotlegsjs/core';
import { GameScene } from '../scenes/GameScene';
import { GameStartupSignal } from '../signals/GameStartupSignal';
import { AbstractSceneMediator } from './AbstractSceneMediator';

@injectable()
export class GameSceneMediator extends AbstractSceneMediator<GameScene> {
  @inject(GameStartupSignal)
  public gameStartupSignal: GameStartupSignal;

  public initialize(): void {
    super.initialize();
    // tslint:disable-next-line:insecure-random
    this.gameStartupSignal.dispatch(Math.random() * 4000 + 1000);
  }
}
