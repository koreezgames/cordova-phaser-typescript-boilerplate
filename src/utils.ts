import { isNullOrUndefined } from 'util';
import { DEVICES_WITH_NOTCH, SLOW_DEVICES } from './constants';

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

export function isFat({
  width,
  height,
}: {
  width: number;
  height: number;
}): boolean {
  console.log(width / height);
  return width / height > 0.6;
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
