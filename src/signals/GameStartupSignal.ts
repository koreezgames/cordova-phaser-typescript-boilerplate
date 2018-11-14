import { injectable } from '@robotlegsjs/core';
import { AbstractSignal } from './';

@injectable()
export class GameStartupSignal extends AbstractSignal {
  constructor() {
    super(Number);
  }
}
