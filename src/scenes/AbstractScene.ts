import { Ii18nAdapter } from '@koreez/phaser3-i18n';
import {
  INinePatchCreator,
  INinePatchFactory,
} from '@koreez/phaser3-ninepatch';

export abstract class AbstractScene extends Phaser.Scene {
  public add: INinePatchFactory;
  public make: INinePatchCreator;
  public i18n: Ii18nAdapter;

  public onCreationCompleteCb: () => void;
  private static readonly __consoleArgs: string[] = [
    ``,
    `background: ${'#295A34'}`,
    `background: ${'#2FAA4A'}`,
    `color: ${'#102415'}; background: ${'#27D04C'};`,
    `background: ${'#2FAA4A'}`,
    `background: ${'#295A34'}`,
  ];

  public init(): void {
    AbstractScene.__consoleArgs[0] = `%c %c %c ${
      this.sys.settings.key
    }: init %c %c `;
    console.log.apply(console, AbstractScene.__consoleArgs);
  }

  public create(): void {
    AbstractScene.__consoleArgs[0] = `%c %c %c ${
      this.sys.settings.key
    }: create %c %c `;
    console.log.apply(console, AbstractScene.__consoleArgs);
    this.__handleCreationComplete();
  }

  public shutdown(): void {
    AbstractScene.__consoleArgs[0] = `%c %c %c ${
      this.sys.settings.key
    }: shutdown %c %c `;
    console.log.apply(console, AbstractScene.__consoleArgs);
  }

  private __handleCreationComplete(): void {
    if (this.onCreationCompleteCb) {
      this.onCreationCompleteCb();
    } else {
      console.warn(
        `${this.scene.key} scenes onCreationCompleteCb is not initialized`,
      );
    }
  }
}
