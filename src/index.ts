/* tslint:disable:no-import-side-effect ordered-imports  */
import 'reflect-metadata';
import './phaser';
import { I18nPlugin } from '@koreez/phaser3-i18n';
import { NinePatchPlugin } from '@koreez/phaser3-ninepatch';
import { isNullOrUndefined } from 'util';
import webfontloader from 'webfontloader';
import { Fonts } from './assets';
import { CANVAS_CONTAINER_ID } from './constants';
import { Game } from './Game';
import { getScale } from './layouts';
import { isIPhoneXEmulation } from './utils';

function startGame(): void {
  const gameConfig: GameConfig = {
    type: Phaser.CANVAS,
    scale: {
      parent: CANVAS_CONTAINER_ID,
      ...getScale(),
    },
    scene: [],
    // @ts-ignore
    transparent: true,
    plugins: {
      global: [
        { key: 'NinePatchPlugin', plugin: NinePatchPlugin, start: true },
      ],
      scene: [
        {
          key: 'i18nPlugin',
          mapping: 'i18n',
          plugin: I18nPlugin,
        },
      ],
    },
  };

  // tslint:disable-next-line:no-unused-expression
  new Game(gameConfig);
}

function loadWebFont(callback: () => void): void {
  const fonts: string[] = Object.keys(Fonts);
  if (fonts.length > 0) {
    const webFontLoaderOptions: webfontloader.Config = {};
    webFontLoaderOptions.custom = {
      families: [],
      urls: [],
    };
    fonts.forEach(font => {
      // tslint:disable-next-line:no-any
      const webFont: { Family: string; CSS: string } = (<any>Fonts)[font].Font;
      webFontLoaderOptions.custom.families.push(webFont.Family);
      webFontLoaderOptions.custom.urls.push(webFont.CSS);
    });
    webFontLoaderOptions.active = callback;
    webfontloader.load(webFontLoaderOptions);
  } else {
    callback();
  }
}

window.onload = () => {
  if (isIPhoneXEmulation()) {
    const frameDiv = document.createElement('div');
    frameDiv.className = 'frame';
    document.body.appendChild(frameDiv);
  }
  loadWebFont(() => {
    startGame();
  });
};

document.addEventListener('deviceready', () => {
  if (window.cordova) {
    if (window.cordova.platformId === 'android') {
      window.StatusBar.styleDefault();
      window.StatusBar.hide();
      if (!isNullOrUndefined(window.AndroidFullScreen)) {
        AndroidFullScreen.isSupported(
          () => {
            AndroidFullScreen.immersiveMode();
          },
          (error: Error) => {
            console.error(error);
          },
        );
      }
    }
  }
});
