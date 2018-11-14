import { injectable } from '@robotlegsjs/core';
import { ViewMediator } from '@robotlegsjs/phaser';
import { IReactionOptions, IReactionPublic } from 'mobx';
import { AbstractView } from '../views';
import { MediatorsUtil } from './MediatorsUtil';

@injectable()
export abstract class AbstractViewMediator<
  T extends AbstractView
> extends ViewMediator<T> {
  protected _baseMediatorsUtil: MediatorsUtil;

  public initialize(): void {
    this._baseMediatorsUtil = new MediatorsUtil(this);
  }

  public destroy(): void {
    this._baseMediatorsUtil.destroy();
    this._baseMediatorsUtil = null;
  }

  protected _addReaction<TD>(
    expression: (r: IReactionPublic) => TD,
    effect: (arg: TD, r: IReactionPublic) => void,
    opts?: IReactionOptions,
  ): this {
    this._baseMediatorsUtil.addReaction(expression, effect, opts);
    return this;
  }

  protected _removeReaction<TD>(
    effect: (arg: TD, r: IReactionPublic) => void,
  ): this {
    this._baseMediatorsUtil.removeReaction(effect);
    return this;
  }
}
