require('polyfills');

var CONST = require('const');
var Extend = require('utils/object/Extend');

var Phaser = {
  Cameras: {
    Scene2D: require('cameras/2d'),
  },

  Events: require('events/EventEmitter'),

  Game: require('boot/Game'),

  Scene: require('scene/Scene'),

  Scenes: { ScenePlugin: require('scene/ScenePlugin') },

  GameObjects: {
    DisplayList: require('gameobjects/DisplayList'),

    UpdateList: require('gameobjects/UpdateList'),

    GameObjectFactory: require('gameobjects/GameObjectFactory'),

    Image: require('gameobjects/image/Image'),

    Sprite: require('gameobjects/sprite/Sprite'),

    PathFollower: require('gameobjects/pathfollower/PathFollower'),

    Container: require('gameobjects/container/Container'),

    RenderTexture: require('gameobjects/rendertexture/RenderTexture'),
    Graphics: require('gameobjects/graphics/Graphics'),

    Factories: {
      Image: require('gameobjects/image/ImageFactory'),
      Sprite: require('gameobjects/sprite/SpriteFactory'),
      Container: require('gameobjects/container/ContainerFactory'),
      Graphics: require('gameobjects/graphics/GraphicsFactory'),
      Text: require('gameobjects/text/static/TextFactory'),
    },

    Creators: {
      Image: require('gameobjects/image/ImageCreator'),
      Sprite: require('gameobjects/sprite/SpriteCreator'),
      Container: require('gameobjects/container/ContainerCreator'),
      Graphics: require('gameobjects/graphics/GraphicsCreator'),
      Text: require('gameobjects/text/static/TextCreator'),
    },
  },

  Loader: {
    FileTypes: {
      ImageFile: require('loader/filetypes/ImageFile'),
      AtlasJSONFile: require('loader/filetypes/AtlasJSONFile'),
    },

    LoaderPlugin: require('loader/LoaderPlugin'),
  },

  Math: {
    Between: require('math/Between'),
    Vector2: require('math/Vector2'),
  },

  Curves: {
    CubicBezier: require('curves/CubicBezierCurve'),
    Ellipse: require('curves/EllipseCurve'),
    Path: require('curves/path/Path'),
  },

  Plugins: {
    BasePlugin: require('plugins/BasePlugin'),
  },

  Tweens: { TweenManager: require('tweens/TweenManager') },

  Input: {
    InputPlugin: require('input/InputPlugin'),
    Keyboard: { KeyboardPlugin: require('input/keyboard/KeyboardPlugin') },
  },

  Clock: { TimerEvent: require('time/Clock') },

  Utils: {
    String: { UUID: require('utils/string/UUID') },
    Array: { GetRandom: require('utils/array/GetRandom') },
  },

  Geom: {
    Circle: require('geom/circle/Circle'),
    Rectangle: require('geom/rectangle/Rectangle'),
    Intersects: { CircleToCircle: require('geom/intersects/CircleToCircle') },
  },
};

if (typeof PLUGIN_CAMERA3D) {
  Phaser.Cameras.Sprite3D = require('../plugins/camera3d/src');
  Phaser.GameObjects.Sprite3D = require('../plugins/camera3d/src/sprite3d/Sprite3D');
  Phaser.GameObjects.Factories.Sprite3D = require('../plugins/camera3d/src/sprite3d/Sprite3DFactory');
  Phaser.GameObjects.Creators.Sprite3D = require('../plugins/camera3d/src/sprite3d/Sprite3DCreator');
}

if (typeof PLUGIN_FBINSTANT) {
  Phaser.FacebookInstantGamesPlugin = require('../plugins/fbinstant/src/FacebookInstantGamesPlugin');
}

//  Merge in the consts

Phaser = Extend(false, Phaser, CONST);

//  Export it

module.exports = Phaser;

global.Phaser = Phaser;
