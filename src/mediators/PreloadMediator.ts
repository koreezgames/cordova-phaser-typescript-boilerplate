import { injectable } from '@robotlegsjs/core';
import { Preload } from '../scenes/';
import { AbstractSceneMediator } from './AbstractSceneMediator';

@injectable()
export class PreloadMediator extends AbstractSceneMediator<Preload> {}
