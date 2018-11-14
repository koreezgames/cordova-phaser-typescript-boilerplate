import { injectable } from '@robotlegsjs/core';
import { action, computed, observable } from 'mobx';

@injectable()
export class GameModel {
  @observable
  private __rotationDirection: number = 1;
  @observable
  private __width: number = 300;
  @observable
  private __height: number = 300;

  @computed
  public get rotationDirection(): number {
    return this.__rotationDirection;
  }

  @computed
  public get width(): number {
    return this.__width;
  }

  @computed
  public get height(): number {
    return this.__height;
  }

  @action
  public changeRotationDirection(): void {
    this.__rotationDirection = -this.__rotationDirection;
  }

  @action
  public resize(width: number, height: number): void {
    this.__width = width;
    this.__height = height;
  }
}
