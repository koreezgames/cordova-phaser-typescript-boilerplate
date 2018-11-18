import { Context, MVCSBundle } from '@robotlegsjs/core';
import { ContextSceneManager, PhaserBundle } from '@robotlegsjs/phaser';
import { RobotlegsConfig } from './config/RobotlegsConfig';
import { SceneMediatorConfig } from './config/SceneMediatorConfig';
import { SceneKey } from './constants/SceneKey';
import { SignalCommandMapExtension } from '@robotlegsjs/signalcommandmap';
import { Preload, Main, Boot } from './scenes';

export class Game extends Phaser.Game {
  constructor(gameConfig: any) {
    super(gameConfig);
    this.resize();
    this.__context = new Context();
    this.__context
      .install(MVCSBundle, PhaserBundle, SignalCommandMapExtension)
      .configure(new ContextSceneManager(this.scene))
      .configure(SceneMediatorConfig)
      .configure(RobotlegsConfig)
      .initialize();
    (this as any).scene.add(SceneKey.boot, new Boot(SceneKey.boot));
    (this as any).scene.add(SceneKey.preload, new Preload(SceneKey.preload));
    (this as any).scene.add(SceneKey.main, new Main(SceneKey.main));
    (this as any).scene.start(SceneKey.boot);
  }
  private __context: Context;

  public resize(): void {
    const { width, height } = this.config as any;

    const scale: { x: number; y: number } = {
      x: (window.innerWidth || width) / width,
      y: (window.innerHeight || height) / height,
    };
    if (!window.cordova && __ENV__ !== 'device') {
      const browserScale: number = Math.min(
        window.innerHeight / height,
        window.innerWidth / width,
      );
      scale.x = scale.y = browserScale;
    }
    this.canvas.style.position = 'absolute';
    this.canvas.style.width = width * scale.x + 'px';
    this.canvas.style.height = height * scale.y + 'px';
    this.canvas.style.left = (window.innerWidth - width * scale.x) * 0.5 + 'px';
    this.canvas.style.top =
      (window.innerHeight - height * scale.y) * 0.5 + 'px';
  }
}
