import 'reflect-metadata';
import './phaser';
import { NinePatchPlugin } from '@koreez/phaser3-ninepatch';
import { isNullOrUndefined } from 'util';
import { ScalingVariant } from './assetLoader';
import { Game } from './Game';

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
  const gameConfig: IConfig = {
    type: Phaser.AUTO,
    width: canvasWidth,
    height: canvasHeight,
    parent: 'game-container',
    scene: [],
    transparent: true,
    plugins: {
      global: [
        { key: 'NinePatchPlugin', plugin: NinePatchPlugin, start: true },
      ],
    },
  };

  new Game(gameConfig);

  console.log('Game Started!');

  console.log('width :', gameConfig.width, 'height :', gameConfig.height);

  console.log(
    'scaleX :',
    gameConfig.width / +process.env.DESIGN_WIDTH,
    'scaleY :',
    gameConfig.height / +process.env.DESIGN_HEIGHT,
  );
}

function loadWebFont(callback: () => any): void {
  setTimeout(() => {
    callback();
  }, 200);
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

    document.addEventListener(
      'backbutton',
      () => {
        navigator.notification.confirm(
          'close',
          (choice: number) => {
            if (choice === 1) {
              navigator.app.exitApp();
            }
          },
          'Are you sure?',
        );
      },
      false,
    );
  }
});

export interface IConfig {
  type: number;
  width: number;
  height: number;
  parent: string;
  scene: any[];
  transparent: boolean;
  dom?: any;
  plugins: any;
}
