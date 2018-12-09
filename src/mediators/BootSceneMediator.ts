import { injectable } from '@robotlegsjs/core';
import { BootScene } from '../scenes/BootScene';
import { AbstractSceneMediator } from './AbstractSceneMediator';

@injectable()
export class BootSceneMediator extends AbstractSceneMediator<BootScene> {}
