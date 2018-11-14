import { injectable } from '@robotlegsjs/core';
import { AsyncCommand } from '@robotlegsjs/macrobot';

@injectable()
export abstract class AbstractAsyncCommand extends AsyncCommand {
  private static readonly __consoleArgs: string[] = [
    ``,
    `background: ${'#190226'}`,
    `background: ${'#49046F'}`,
    `color: ${'#FAF3FE'}; background: ${'#5C038D'};`,
    `background: ${'#49046F'}`,
    `background: ${'#190226'}`,
  ];

  public execute(): void {
    AbstractAsyncCommand.__consoleArgs[0] = `%c %c %c ${
      this.constructor.name
    }: execute: start %c %c `;
    console.log.apply(console, AbstractAsyncCommand.__consoleArgs);
  }

  // tslint:disable-next-line:naming-convention
  protected dispatchComplete(success: boolean): void {
    AbstractAsyncCommand.__consoleArgs[0] = `%c %c %c ${
      this.constructor.name
    }: execute: complete [${success}] %c %c `;
    console.log.apply(console, AbstractAsyncCommand.__consoleArgs);
    super.dispatchComplete(success);
  }
}
