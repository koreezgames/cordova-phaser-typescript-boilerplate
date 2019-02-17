import 'reflect-metadata';
import './phaser';
import { I18nPlugin } from '@koreez/phaser3-i18n';
import { NinePatchPlugin } from '@koreez/phaser3-ninepatch';
import { isNullOrUndefined } from 'util';
import webfontloader from 'webfontloader';
import { Fonts } from './assets';
import { CANVAS_CONTAINER_ID } from './constants';
import { Game } from './Game';
import { isIPhoneXEmulation } from './utils';
import { getScale } from './layouts';


function startGame(): void {
  const gameConfig: GameConfig = {
    type: Phaser.WEBGL,
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
        {
          key: 'SpineWebGLPlugin',
          mapping: 'spine',
          // @ts-ignore
          plugin: Phaser.SpineWebGLPlugin,
        },
      ],
    },
  };

  new Game(gameConfig);
}

function loadWebFont(callback: () => any): void {
  if (Object.keys(Fonts).length > 0) {
    const webFontLoaderOptions: webfontloader.Config = {};
    webFontLoaderOptions.custom = {
      families: [],
      urls: [],
    };

    for (const font in Fonts) {
      if (!Fonts.hasOwnProperty(font)) {
        continue;
      }
      // @ts-ignore
      const webFont: any = Fonts[font].Font;
      webFontLoaderOptions.custom.families.push(webFont.Family);
      webFontLoaderOptions.custom.urls.push(webFont.CSS);
    }
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
          (error: any) => {
            console.error(error);
          },
        );
      }
    }
  }
});
