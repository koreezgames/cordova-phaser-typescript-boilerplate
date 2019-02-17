const width: number =
  (window.innerWidth || window.screen.width) * window.devicePixelRatio;

const height: number =
  (window.innerHeight || window.screen.height) * window.devicePixelRatio;

export let designWidth = +process.env.DESIGN_WIDTH;

export let designHeight = +process.env.DESIGN_HEIGHT;

export let viewportWidth: number;

export let viewportHeight: number;

export let viewportScale: number;

if (width > height) {
  designHeight = +process.env.DESIGN_WIDTH;
  designWidth = +process.env.DESIGN_HEIGHT;
}

export function getScale(): {
  autoCenter: any;
  mode: any;
  width: number;
  height: number;
} {
  const scale: any = {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
  };

  const designRatio: number = designWidth / designHeight;
  const canvasRatio: number = width / height;
  const ratioMultiplier: number = designRatio / canvasRatio;
  scale.height = designHeight * ratioMultiplier;
  scale.width = designWidth;
  viewportScale = Math.min(
    scale.width / designWidth,
    scale.height / designHeight,
  );
  viewportWidth = designWidth * viewportScale;
  viewportHeight = designHeight * viewportScale;
  return scale;
}
