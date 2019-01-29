import { inject, injectable } from '@robotlegsjs/core';
import { GameModel } from '../models/GameModel';
import { AbstractAsyncCommand } from './AbstractAsyncCommand';
import { AbstractSequenceMacro } from './AbstractSequenceMacro';

@injectable()
export class GameStartupCommand extends AbstractSequenceMacro {
  @inject(GameModel)
  public gameModel: GameModel;

  public prepare(): void {
    // this.atomic = false;
    this.add(GameStartupSubCommand);
  }

  // tslint:disable-next-line:naming-convention
  protected dispatchComplete(success: boolean): void {
    this.gameModel.changeRotationDirection();
    this.gameModel.resize(this.gameModel.width / 2, this.gameModel.height / 2);
    super.dispatchComplete(success);
  }
}

@injectable()
export class GameStartupSubCommand extends AbstractAsyncCommand {
  @inject(Number)
  protected _delay: number;

  public execute(): void {
    super.execute();
    setTimeout(this.onTimeout.bind(this), this._delay);
  }

  protected onTimeout(): void {
    this.dispatchComplete(true);
  }
}
