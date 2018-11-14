import { isNullOrUndefined } from 'util';
import { canvasHeight, canvasWidth, scaling } from '.';
import { ScalingVariant } from './assetLoader';

const DEVICES_WITH_NOTCH: string[] = [
  'iPhone10,3',
  'iPhone10,6',
  'iPhone11,8',
  'iPhone11,2',
  'iPhone11,4',
  'iPhone11,6',
];

const SLOW_DEVICES: string[] = [
  'iPhone4,1',
  'iPhone5,1',
  'iPhone5,2',
  'iPhone5,3',
  'iPhone5,4',
  'iPhone6,1',
  'iPhone6,2',
  'iPhone7,2',
  'iPhone7,1',
  'iPod5,1',
  'iPod7,1',
  'iPad2,1',
  'iPad2,2',
  'iPad2,3',
  'iPad2,4',
  'iPad3,1',
  'iPad3,2',
  'iPad3,3',
  'iPad3,4',
  'iPad3,5',
  'iPad3,6',
  'iPad4,1',
  'iPad4,2',
  'iPad4,3',
  'iPad5,3',
  'iPad5,4',
  'iPad2,5',
  'iPad2,6',
  'iPad2,7',
  'iPad4,4',
  'iPad4,5',
  'iPad4,6',
  'iPad4,7',
  'iPad4,8',
  'iPad4,9',
];

export function getCircularReplacer(): any {
  const seen: WeakSet<any> = new WeakSet();
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

export function $scaleVariant(value: number): number {
  return scaling === ScalingVariant.SD ? value / 2 : value;
}

export function hasNotch(): boolean {
  if (isNullOrUndefined(window.device)) {
    return false;
  }
  return DEVICES_WITH_NOTCH.indexOf(window.device.model) !== -1;
}

export function isSlowDevice(): boolean {
  if (isNullOrUndefined(window.device)) {
    return false;
  }
  return SLOW_DEVICES.indexOf(window.device.model) !== -1;
}

export function $x(x: number): number {
  return x * (canvasWidth / +process.env.DESIGN_WIDTH);
}

export function $y(y: number): number {
  return y * (canvasHeight / +process.env.DESIGN_HEIGHT);
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
