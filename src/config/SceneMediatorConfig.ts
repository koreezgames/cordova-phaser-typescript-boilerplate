import { IConfig, inject, injectable } from '@robotlegsjs/core';
import { ISceneMediatorMap, IViewMediatorMap } from '@robotlegsjs/phaser';
import { BootMediator } from '../mediators/BootMediator';
import { MainMediator } from '../mediators/MainMediator';
import { PreloadMediator } from '../mediators/PreloadMediator';
import { Boot, Main, Preload } from '../scenes';

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
    this.__sceneMediatorMap.map(Boot).toMediator(BootMediator);
    this.__sceneMediatorMap.map(Preload).toMediator(PreloadMediator);
    this.__sceneMediatorMap.map(Main).toMediator(MainMediator);
  }

  private __mapViewMediators(): void {
    // this.viewMediatorMap.map(SomeView).toMediator(TheMeditorForSomeView)
    return;
  }
}
