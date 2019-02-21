import { IPHONE_X_SCREEN_SIZES } from './constants';

export function getCircularReplacer(): (key: string, value: object) => object {
  const seen = new WeakSet();

  return (key: string, value: object) => {
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

export function hasNotch(): boolean {
  return isIPhoneXEmulation();
}

export function getEnumKeys(e: { [key: string]: string | number }): string[] {
  return Object.keys(e).filter(k => typeof e[k] === typeof e[k]);
}

export function getEnumValues(e: {
  [key: string]: string | number;
}): (string | number)[] {
  return getEnumKeys(e).map(k => e[k]);
}
