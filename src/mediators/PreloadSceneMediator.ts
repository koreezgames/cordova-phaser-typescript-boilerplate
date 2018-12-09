import { injectable } from '@robotlegsjs/core';
import { PreloadScene } from '../scenes/PreloadScene';
import { AbstractSceneMediator } from './AbstractSceneMediator';

@injectable()
export class PreloadSceneMediator extends AbstractSceneMediator<PreloadScene> {}
