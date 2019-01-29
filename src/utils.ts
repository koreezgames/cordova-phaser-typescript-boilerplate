import { isNullOrUndefined } from 'util';
import {
  DEVICES_WITH_NOTCH,
  IPHONE_X_SCREEN_SIZES,
  SLOW_DEVICES,
} from './constants';
import { Xmls } from './assets';

export function getCircularReplacer(): any {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

export function isFat({
  width,
  height,
}: {
  width: number;
  height: number;
}): boolean {
  return width / height > 0.6;
}

export function isDeviceEmulation(): boolean {
  return __ENV__ === 'device';
}

export function isOnDevice(): boolean {
  return !isNullOrUndefined(window.cordova);
}

export function isIPhoneXEmulation(): boolean {
  return isDeviceEmulation() && isIPhoneXScreenSize();
}

export function isIPhoneXScreenSize(): boolean {
  const w: number = window.screen.width * window.devicePixelRatio;
  const h: number = window.screen.height * window.devicePixelRatio;
  for (const size of IPHONE_X_SCREEN_SIZES) {
    if (size.width === w && size.height === h) {
      return true;
    }
  }
  return false;
}

export function isIPhoneXSimulator(): boolean {
  return window.device.model === 'x86_64' && isIPhoneXScreenSize();
}

export function hasNotch(): boolean {
  if (isNullOrUndefined(window.device)) {
    return isIPhoneXEmulation();
  }
  return (
    DEVICES_WITH_NOTCH.indexOf(window.device.model) !== -1 ||
    isIPhoneXSimulator()
  );
}

export function isSlowDevice(): boolean {
  if (isNullOrUndefined(window.device)) {
    return false;
  }
  return SLOW_DEVICES.indexOf(window.device.model) !== -1;
}

export function getEnumKeys(e: any): any[] {
  return Object.keys(e).filter(
    (k: any) => typeof e[k as any] === typeof e[k as any],
  );
}

export function getEnumValues(e: any): any[] {
  return getEnumKeys(e).map((k: any) => e[k as any]);
}

export function getEnumKey(e: any, key: any): string {
  return getEnumKeys(e).find((k: any) => e[k as any] === key);
}

export function getEnumValue(e: any, value: any): any {
  return getEnumValues(e).find((v: any) => e[v as any] === value);
}

export function prepareSpriteFont(
  scene: Phaser.Scene,
  fontName: string,
  textureKey: string,
  frameKey: string,
  configList: ISpriteFontConfig[],
): void {
  // @ts-ignore
  Phaser.GameObjects.BitmapText.ParseFromAtlas(
    scene,
    fontName,
    textureKey,
    frameKey,
    Xmls.HelveticaBold.Name,
  );

  const fontFrame: Phaser.Textures.Frame = scene.sys.game.textures.getFrame(
    textureKey,
    frameKey,
  );

  configList.forEach((config: ISpriteFontConfig) => {
    const {
      frame,
      charCode,
      align = SpriteFontAlign.AlignCenter,
      originY = 0.5,
    } = config;
    addSpriteIntoFont(
      scene.sys.game,
      fontName,
      frame,
      charCode,
      '0',
      align,
      originY,
      fontFrame.cutX,
      fontFrame.cutY,
    );
  });
}

export interface ISpriteFontConfig {
  frame: string;
  charCode: number;
  align?: SpriteFontAlign;
  originY?: number;
}

export enum SpriteFontAlign {
  AlignTop = 0,
  AlignCenter = 1,
  AlignBottom = 2,
}

function addSpriteIntoFont(
  game: Phaser.Game,
  fontName: string,
  frame: string | number,
  newCharCode: number,
  referenceChar: number | string,
  align: number,
  originY: number,
  cutX: number,
  cutY: number,
): void {
  // if reference char is string, convert it to number

  const referenceCharF: number =
    typeof referenceChar === 'string' ? referenceChar.charCodeAt(0) : null;

  // get font characters and reference character
  const font: any = game.cache.bitmapFont.get(fontName);
  const fontChars: any = (font.data as BitmapFontData).chars;
  const refChar: any = fontChars[referenceCharF];

  if (refChar == null) {
    throw new Error(
      `Reference character ${String.fromCharCode(
        referenceCharF,
      )} with code ${referenceCharF} is mssing in font. Try another.`,
    );
  }

  // get frame of new sprite character
  const f: any = game.textures.getFrame(font['texture'], frame);
  const fWidth: number = f.customData['sourceSize']['w'];
  const fHeight: number = f.customData['sourceSize']['h'];

  // calculate y offset of sprite chracter
  const refY: any =
    refChar.yOffset +
    (align === SpriteFontAlign.AlignCenter
      ? refChar.height / 2
      : align === SpriteFontAlign.AlignBottom
      ? refChar.height
      : 0);
  const yOffset: any = Math.round(refY - fHeight * originY);

  // add new sprite character
  fontChars[newCharCode] = {
    yOffset,
    xOffset: 0,
    x: f.cutX - cutX,
    y: f.cutY - cutY,
    width: f.cutWidth,
    height: f.cutHeight,
    centerX: Math.floor(fWidth / 2),
    centerY: Math.floor(fHeight / 2),
    xAdvance: fWidth + 2,
    data: {},
    kerning: {},
  };
}
