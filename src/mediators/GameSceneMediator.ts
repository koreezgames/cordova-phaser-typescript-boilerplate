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
    this.gameStartupSignal.dispatch(1000 + Math.random() * 4000);
  }
}
