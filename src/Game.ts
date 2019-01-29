import { Context, MVCSBundle } from '@robotlegsjs/core';
import { ContextSceneManager, PhaserBundle } from '@robotlegsjs/phaser';
import { RobotlegsConfig } from './config/RobotlegsConfig';
import { SceneMediatorConfig } from './config/SceneMediatorConfig';
import { SceneKey } from './constants/SceneKey';
import { SignalCommandMapExtension } from '@robotlegsjs/signalcommandmap';
import { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { GameScene } from './scenes/GameScene';

export class Game extends Phaser.Game {
  constructor(gameConfig: any) {
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
    Game._consoleArgs[0] = `%c %c %c %c %c ${this.constructor.name} Size(${
      // @ts-ignore
      this.scale.width
      // @ts-ignore
    }x${this.scale.height}) `;
    console.log.apply(console, Game._consoleArgs);
    this.scene.add(SceneKey.boot, new BootScene(SceneKey.boot));
    this.scene.add(SceneKey.preload, new PreloadScene(SceneKey.preload));
    this.scene.add(SceneKey.main, new GameScene(SceneKey.main));
    this.scene.start(SceneKey.boot);
  };
}
