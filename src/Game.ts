import { Context, MVCSBundle } from '@robotlegsjs/core';
import { ContextSceneManager, PhaserBundle } from '@robotlegsjs/phaser';
import { SignalCommandMapExtension } from '@robotlegsjs/signalcommandmap';
import { RobotlegsConfig } from './config/RobotlegsConfig';
import { SceneMediatorConfig } from './config/SceneMediatorConfig';
import { SceneKey } from './constants/SceneKey';
import { viewBox } from './layouts';
import { BgScene } from './scenes/BgScene';
import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';
import { PreloadScene } from './scenes/PreloadScene';

export class Game extends Phaser.Game {
  constructor(gameConfig: GameConfig) {
    super(gameConfig);
    this._context = new Context();
    this._context
      .install(MVCSBundle, PhaserBundle, SignalCommandMapExtension)
      .configure(new ContextSceneManager(this.scene))
      .configure(SceneMediatorConfig)
      .configure(RobotlegsConfig)
      .initialize(this._robotlegsInitialized);
  }

  private static readonly _consoleArgs: string[] = [
    '',
    `background: ${'#2DFFFE'}`,
    `background: ${'#29FD2F'}`,
    `background: ${'#FFFD38'}`,
    `background: ${'#FC0D1B'}`,
    `color: ${'#000000'}; background: ${'#ffffff'};`,
  ];

  private _context: Context;

  private _robotlegsInitialized = () => {
    Game._consoleArgs[0] = `%c %c %c %c %c ${this.constructor.name} - ${
      this.scale.width
    }x${this.scale.height} | View - ${Math.trunc(viewBox.width)}x${Math.trunc(
      viewBox.height,
    )} - ${viewBox.aspectRatio} | Orientation - ${
      this.scale.isGameLandscape ? 'Landscape' : 'Portrait'
    } `;
    // tslint:disable-next-line:no-console
    console.log.apply(console, Game._consoleArgs);
    this._context.injector.bind('game').toConstantValue(this);
    this.scene.add(SceneKey.Boot, new BootScene(SceneKey.Boot));
    this.scene.add(SceneKey.Preload, new PreloadScene(SceneKey.Preload));
    this.scene.add(SceneKey.Bg, new BgScene(SceneKey.Bg));
    this.scene.add(SceneKey.Game, new GameScene(SceneKey.Game));
    this.scene.start(SceneKey.Boot);
  };
}
