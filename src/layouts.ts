const width: number =
  (window.innerWidth || window.screen.width) * window.devicePixelRatio;

const height: number =
  (window.innerHeight || window.screen.height) * window.devicePixelRatio;

export let designWidth = +process.env.DESIGN_WIDTH;

export let designHeight = +process.env.DESIGN_HEIGHT;

export let viewBox: ViewBox;

if (width > height) {
  designHeight = +process.env.DESIGN_WIDTH;
  designWidth = +process.env.DESIGN_HEIGHT;
}

export function portraitOrLandscape<T>(
  scale: Phaser.Scale.ScaleManager,
  portrait: T,
  landscape: T,
): T {
  return scale.isGamePortrait ? portrait : landscape;
}

export function getScale(): ScaleConfig {
  const scale: ScaleConfig = {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
  };

  const designRatio: number = designWidth / designHeight;
  const canvasRatio: number = width / height;
  const ratioMultiplier: number = designRatio / canvasRatio;
  scale.height = Math.trunc(designHeight * ratioMultiplier);
  scale.width = designWidth;
  viewBox = new ViewBox(
    designWidth,
    designHeight,
    Phaser.Structs.Size.FIT,
    scale,
  );

  return scale;
}

class ViewBox extends Phaser.Structs.Size {
  constructor(
    boxWidth: number,
    bixHeight: number,
    aspectMode: number,
    parent: { width?: string | number; height?: string | number },
  ) {
    super(boxWidth, bixHeight, aspectMode, parent);
    this.fitTo(+parent.width, +parent.height);
    this._scale = Math.min(
      boxWidth / +parent.width,
      bixHeight / +parent.height,
    );
  }

  private _scale: number;

  public get scale(): number {
    return this._scale;
  }
}
