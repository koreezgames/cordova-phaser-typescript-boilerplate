import { isNullOrUndefined } from 'util';
import {
  DEVICES_WITH_NOTCH,
  IPHONE_X_SCREEN_SIZES,
  SLOW_DEVICES,
} from './constants';

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
