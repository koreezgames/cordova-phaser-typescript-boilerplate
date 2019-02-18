import { IConfig, IContext, inject, injectable } from '@robotlegsjs/core';
import { ISignalCommandMap } from '@robotlegsjs/signalcommandmap';
import { GameStartupCommand } from '../commands/GameStartupCommand';
import { GameModel } from '../models/GameModel';
import { GameStartupSignal } from '../signals/GameStartupSignal';

@injectable()
export class RobotlegsConfig implements IConfig {
  @inject(IContext)
  public context: IContext;
  @inject(ISignalCommandMap)
  public commandMap: ISignalCommandMap;

  public configure(): void {
    this._mapCommands();
    this._mapManager();
    this._mapModels();
  }

  private _mapCommands(): void {
    this.commandMap.map(GameStartupSignal).toCommand(GameStartupCommand);
  }

  private _mapManager(): void {
    return;
  }

  private _mapModels(): void {
    this.context.injector
      .bind(GameModel)
      .toSelf()
      .inSingletonScope();
  }
}
