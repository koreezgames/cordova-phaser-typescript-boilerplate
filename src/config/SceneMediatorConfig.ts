import { IConfig, inject, injectable } from '@robotlegsjs/core';
import { ISceneMediatorMap, IViewMediatorMap } from '@robotlegsjs/phaser';
import { BootSceneMediator } from '../mediators/BootSceneMediator';
import { GameSceneMediator } from '../mediators/GameSceneMediator';
import { PreloadSceneMediator } from '../mediators/PreloadSceneMediator';
import { BootScene } from '../scenes/BootScene';
import { GameScene } from '../scenes/GameScene';
import { PreloadScene } from '../scenes/PreloadScene';

@injectable()
export class SceneMediatorConfig implements IConfig {
  @inject(IViewMediatorMap)
  private __viewMediatorMap: IViewMediatorMap;

  @inject(ISceneMediatorMap)
  private __sceneMediatorMap: ISceneMediatorMap;

  public configure(): void {
    this.__mapSceneMediators();
    this.__mapViewMediators();
  }

  private __mapSceneMediators(): void {
    this.__sceneMediatorMap.map(BootScene).toMediator(BootSceneMediator);
    this.__sceneMediatorMap.map(PreloadScene).toMediator(PreloadSceneMediator);
    this.__sceneMediatorMap.map(GameScene).toMediator(GameSceneMediator);
  }

  private __mapViewMediators(): void {
    // this.viewMediatorMap.map(SomeView).toMediator(TheMeditorForSomeView)
    return;
  }
}
