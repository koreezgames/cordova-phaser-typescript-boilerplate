import { IConfig, inject, injectable } from '@robotlegsjs/core';
import { ISceneMediatorMap, IViewMediatorMap } from '@robotlegsjs/phaser';
import { BgSceneMediator } from '../mediators/BgSceneMediator';
import { BootSceneMediator } from '../mediators/BootSceneMediator';
import { GameBoxViewMediator } from '../mediators/GameBoxViewMediator';
import { GameSceneMediator } from '../mediators/GameSceneMediator';
import { PreloadSceneMediator } from '../mediators/PreloadSceneMediator';
import { BgScene } from '../scenes/BgScene';
import { BootScene } from '../scenes/BootScene';
import { GameScene } from '../scenes/GameScene';
import { PreloadScene } from '../scenes/PreloadScene';
import { GameBoxView } from '../views/GameBoxView';

@injectable()
export class SceneMediatorConfig implements IConfig {
  @inject(IViewMediatorMap)
  private _viewMediatorMap: IViewMediatorMap;

  @inject(ISceneMediatorMap)
  private _sceneMediatorMap: ISceneMediatorMap;

  public configure(): void {
    this._mapSceneMediators();
    this._mapViewMediators();
  }

  private _mapSceneMediators(): void {
    this._sceneMediatorMap.map(BootScene).toMediator(BootSceneMediator);
    this._sceneMediatorMap.map(PreloadScene).toMediator(PreloadSceneMediator);
    this._sceneMediatorMap.map(BgScene).toMediator(BgSceneMediator);
    this._sceneMediatorMap.map(GameScene).toMediator(GameSceneMediator);
  }

  private _mapViewMediators(): void {
    this._viewMediatorMap.map(GameBoxView).toMediator(GameBoxViewMediator);
  }
}
