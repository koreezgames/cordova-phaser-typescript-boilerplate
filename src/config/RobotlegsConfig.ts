import { IConfig, IContext, inject, injectable } from '@robotlegsjs/core';
import { ISignalCommandMap } from '@robotlegsjs/signalcommandmap';
import { GameStartupSignal } from '../signals/GameStartupSignal';
import { GameStartupCommand } from '../commands/GameStartupCommand';
import { GameModel } from '../models/GameModel';

@injectable()
export class RobotlegsConfig implements IConfig {
  @inject(IContext)
  public context: IContext;
  @inject(ISignalCommandMap)
  public commandMap: ISignalCommandMap;

  public configure(): void {
    this.__mapCommands();
    this.__mapManager();
    this.__mapModels();
  }

  private __mapCommands(): void {
    this.commandMap.map(GameStartupSignal).toCommand(GameStartupCommand);
  }

  private __mapManager(): void {
    return;
  }

  private __mapModels(): void {
    this.context.injector
      .bind(GameModel)
      .toSelf()
      .inSingletonScope();
  }
}
