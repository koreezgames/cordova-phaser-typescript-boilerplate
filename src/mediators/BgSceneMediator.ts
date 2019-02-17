import { injectable } from '@robotlegsjs/core';
import { BgScene } from '../scenes/BgScene';
import { AbstractSceneMediator } from './AbstractSceneMediator';

@injectable()
export class BgSceneMediator extends AbstractSceneMediator<BgScene> {}
