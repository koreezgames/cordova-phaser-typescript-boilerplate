import { Atlases } from '../assets';
import { AbstractScene } from './AbstractScene';

export class BgScene extends AbstractScene {
  private _width: number;
  private _height: number;

  private _staticBackground: Phaser.GameObjects.TileSprite;
  private _layer1Snow: Phaser.GameObjects.TileSprite;
  private _layer1Tree: Phaser.GameObjects.TileSprite;
  private _layer2Snow: Phaser.GameObjects.TileSprite;
  private _layer2Tree: Phaser.GameObjects.TileSprite;
  private _layer3Snow: Phaser.GameObjects.TileSprite;
  private _layer4Clouds: Phaser.GameObjects.TileSprite;
  private _layersContainer: Phaser.GameObjects.Container;

  public init(): void {
    this._width = this.scale.width;
    this._height = this.scale.height;
  }

  public create(): void {
    super.create();

    const frames = [
      Atlases.Layers.Atlas.FrameSourceSizes.Layer0,
      Atlases.Layers.Atlas.FrameSourceSizes.Layer1Snow,
      Atlases.Layers.Atlas.FrameSourceSizes.Layer1Tree,
      Atlases.Layers.Atlas.FrameSourceSizes.Layer2Snow,
      Atlases.Layers.Atlas.FrameSourceSizes.Layer2Tree,
      Atlases.Layers.Atlas.FrameSourceSizes.Layer3Snow,
      Atlases.Layers.Atlas.FrameSourceSizes.Layer4Clouds,
    ];
    const framesWidths = frames.map(frame => frame.w);
    const framesHeights = frames.map(frame => frame.h);
    const maxWidth = Math.max(...framesWidths);
    this._layersContainer = this.add
      .container(this._width * 0.5, this._height * 0.5)
      .setScale(
        Math.max(this._width / maxWidth, this._height / framesHeights[0]),
      );

    this._staticBackground = this.add.tileSprite(
      0,
      0,
      maxWidth,
      framesHeights[0],
      Atlases.Layers.Atlas.Name,
      Atlases.Layers.Atlas.Frames.Layer0,
    );

    this._layer1Snow = this.add.tileSprite(
      0,
      115,
      maxWidth,
      framesHeights[1],
      Atlases.Layers.Atlas.Name,
      Atlases.Layers.Atlas.Frames.Layer1Snow,
    );

    this._layer1Tree = this.add.tileSprite(
      0,
      150,
      maxWidth,
      framesHeights[2],
      Atlases.Layers.Atlas.Name,
      Atlases.Layers.Atlas.Frames.Layer1Tree,
    );

    this._layer2Snow = this.add.tileSprite(
      0,
      15,
      maxWidth,
      framesHeights[3],
      Atlases.Layers.Atlas.Name,
      Atlases.Layers.Atlas.Frames.Layer2Snow,
    );

    this._layer2Tree = this.add.tileSprite(
      0,
      -10,
      maxWidth,
      framesHeights[4],
      Atlases.Layers.Atlas.Name,
      Atlases.Layers.Atlas.Frames.Layer2Tree,
    );

    this._layer3Snow = this.add.tileSprite(
      0,
      -30,
      maxWidth,
      framesHeights[5],
      Atlases.Layers.Atlas.Name,
      Atlases.Layers.Atlas.Frames.Layer3Snow,
    );

    this._layer4Clouds = this.add.tileSprite(
      0,
      -300,
      maxWidth,
      framesHeights[6],
      Atlases.Layers.Atlas.Name,
      Atlases.Layers.Atlas.Frames.Layer4Clouds,
    );

    this._layersContainer.add(this._staticBackground);
    this._layersContainer.add(this._layer4Clouds);
    this._layersContainer.add(this._layer3Snow);
    this._layersContainer.add(this._layer2Snow);
    this._layersContainer.add(this._layer2Tree);
    this._layersContainer.add(this._layer1Snow);
    this._layersContainer.add(this._layer1Tree);

    this._layer1Tree.tilePositionX += Math.random() * 1000;
    this._layer1Snow.tilePositionX += Math.random() * 1000;
    this._layer2Tree.tilePositionX += Math.random() * 1000;
    this._layer2Snow.tilePositionX += Math.random() * 1000;
    this._layer3Snow.tilePositionX += Math.random() * 1000;
    this._layer4Clouds.tilePositionX += Math.random() * 1000;
    // this._layer1Snow.scrollFactorX
  }

  public update(): void {
    const speed = 20;
    this._layer1Tree.tilePositionX += speed;
    this._layer1Snow.tilePositionX += speed * 0.8;
    this._layer2Tree.tilePositionX += speed * 0.7;
    this._layer2Snow.tilePositionX += speed * 0.6;
    this._layer3Snow.tilePositionX += speed * 0.4;
    this._layer4Clouds.tilePositionX += speed * 0.025;
  }
}
