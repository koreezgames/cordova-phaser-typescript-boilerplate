import 'reflect-metadata';
import './phaser';
import { NinePatchPlugin } from '@koreez/phaser3-ninepatch';
import { I18nPlugin } from '@koreez/phaser3-i18n';
import { isNullOrUndefined } from 'util';
import { ScalingVariant } from './assetLoader';
import { Fonts } from './assets';
import { Game } from './Game';
import WebFontLoader from 'webfontloader';

export let canvasWidth: number;
export let canvasHeight: number;
export let scaling: ScalingVariant = ScalingVariant.HD;

function setUpDimension(): void {
  let designWidth: number = +process.env.DESIGN_WIDTH;
  let designHeight: number = +process.env.DESIGN_HEIGHT;
  // if (isSlowDevice()) {
  //   designWidth /= 2;
  //   designHeight /= 2;
  //   SCALING_VARIANT = ScalingVariant.SD;
  // }
  if (!window.cordova && __ENV__ !== 'device') {
    canvasWidth = designWidth;
    canvasHeight = designHeight;
    return;
  }
  const width: number = window.screen.width * window.devicePixelRatio;
  const height: number = window.screen.height * window.devicePixelRatio;
  const designRatio: number = designWidth / designHeight;
  const canvasRatio: number = width / height;
  const ratioMultiplier: number = designRatio / canvasRatio;
  canvasWidth = designWidth * (width < height ? 1 : ratioMultiplier);
  canvasHeight = designHeight * (width < height ? ratioMultiplier : 1);
}

function startGame(): void {
  const gameConfig: GameConfig = {
    type: Phaser.AUTO,
    width: canvasWidth,
    height: canvasHeight,
    parent: 'game-container',
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

  console.log('Game Started!');

  console.log('width :', gameConfig.width, 'height :', gameConfig.height);

  console.log(
    'scaleX :',
    +gameConfig.width / +process.env.DESIGN_WIDTH,
    'scaleY :',
    +gameConfig.height / +process.env.DESIGN_HEIGHT,
  );
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
    setUpDimension();
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
