import { injectable } from '@robotlegsjs/core';
import { Boot } from '../scenes';
import { AbstractSceneMediator } from './AbstractSceneMediator';

@injectable()
export class BootMediator extends AbstractSceneMediator<Boot> {}
