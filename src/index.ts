import 'reflect-metadata';
import './phaser';
import { NinePatchPlugin } from '@koreez/phaser3-ninepatch';
import { I18nPlugin } from '@koreez/phaser3-i18n';
import { isNullOrUndefined } from 'util';
import { Fonts } from './assets';
import { Game } from './Game';
import WebFontLoader from 'webfontloader';

let canvasWidth: number;
let canvasHeight: number;

function getScale(): any {
  const scale: any = {
    //@ts-ignore
    autoCenter: Phaser.DOM.CENTER_BOTH,
    //@ts-ignore
    mode: Phaser.DOM.FIT,
  };
  if (!window.cordova && __ENV__ !== 'device') {
    scale.width = +process.env.DESIGN_WIDTH;
    scale.height = +process.env.DESIGN_HEIGHT;
    return;
  }
  scale.width = window.screen.width * window.devicePixelRatio;
  scale.height = window.screen.height * window.devicePixelRatio;
  return scale;
}

function startGame(): void {
  const gameConfig: GameConfig = {
    type: Phaser.AUTO,
    scale: {
      parent: 'game-container',
      ...getScale(),
    },
    scene: [],
    //@ts-ignore
    transparent: true,
    plugins: {
      global: [
        { key: 'NinePatchPlugin', plugin: NinePatchPlugin, start: true },
      ],
      scene: [
        {
          key: 'i18nPlugin',
          //@ts-ignore
          mapping: 'i18n',
          plugin: I18nPlugin,
        },
      ],
    },
  };

  new Game(gameConfig);
}

function loadWebFont(callback: () => any): void {
  if (Object.keys(Fonts).length > 0) {
    const webFontLoaderOptions: WebFontLoader.Config = {};
    webFontLoaderOptions.custom = {
      families: [],
      urls: [],
    };

    for (const font in Fonts) {
      if (!Fonts.hasOwnProperty(font)) {
        continue;
      }
      //@ts-ignore
      const webFont: any = Fonts[font].Font;
      webFontLoaderOptions.custom.families.push(webFont.Family);
      webFontLoaderOptions.custom.urls.push(webFont.CSS);
    }
    webFontLoaderOptions.active = callback;
    WebFontLoader.load(webFontLoaderOptions);
  } else {
    callback();
  }
}

window.onload = () => {
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
