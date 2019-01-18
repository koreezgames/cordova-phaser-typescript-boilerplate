require('polyfills');

var CONST = require('const');
var Extend = require('utils/object/Extend');

var Phaser = {
  Cameras: {
    Scene2D: require('cameras/2d'),
  },

  Events: require('events/EventEmitter'),

  Game: require('core/Game'),

  Scene: require('scene/Scene'),

  Scenes: { ScenePlugin: require('scene/ScenePlugin') },

  GameObjects: {
    DisplayList: require('gameobjects/DisplayList'),

    UpdateList: require('gameobjects/UpdateList'),

    BuildGameObject: require('gameobjects/BuildGameObject'),

    GameObjectFactory: require('gameobjects/GameObjectFactory'),

    Image: require('gameobjects/image/Image'),

    Sprite: require('gameobjects/sprite/Sprite'),

    Container: require('gameobjects/container/Container'),

    RenderTexture: require('gameobjects/rendertexture/RenderTexture'),

    BitmapText: require('gameobjects/bitmaptext/static/BitmapText'),

    Factories: {
      Image: require('gameobjects/image/ImageFactory'),
      Sprite: require('gameobjects/sprite/SpriteFactory'),
      Container: require('gameobjects/container/ContainerFactory'),
      Text: require('gameobjects/text/static/TextFactory'),
      BitmapText: require('gameobjects/bitmaptext/static/BitmapTextFactory'),
    },

    Creators: {
      Image: require('gameobjects/image/ImageCreator'),
      Sprite: require('gameobjects/sprite/SpriteCreator'),
      Container: require('gameobjects/container/ContainerCreator'),
      Text: require('gameobjects/text/static/TextCreator'),
      BitmapText: require('gameobjects/bitmaptext/static/BitmapTextCreator'),
    },
  },

  Loader: {
    FileTypes: {
      ImageFile: require('loader/filetypes/ImageFile'),
      AtlasJSONFile: require('loader/filetypes/AtlasJSONFile'),
      BitmapFont: require('loader/filetypes/BitmapFontFile'),
      AudioFile: require('loader/filetypes/AudioFile'),
    },

    LoaderPlugin: require('loader/LoaderPlugin'),
  },

  Math: {},

  Plugins: {
    BasePlugin: require('plugins/BasePlugin'),
    ScenePlugin: require('plugins/ScenePlugin'),
  },

  Tweens: { TweenManager: require('tweens/TweenManager') },

  Input: {
    InputPlugin: require('input/InputPlugin'),
  },

  Clock: { TimerEvent: require('time/Clock') },

  Utils: {
    String: { UUID: require('utils/string/UUID') },
    Array: { GetRandom: require('utils/array/GetRandom') },
    Objects: { GetAdvancedValue: require('utils/object/GetAdvancedValue') },
  }
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
