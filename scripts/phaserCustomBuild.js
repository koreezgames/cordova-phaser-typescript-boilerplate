require('src/polyfills');

var CONST = require('src/const');
var Extend = require('src/utils/object/Extend');

var Phaser = {
  Cameras: {
    Scene2D: require('src/cameras/2d'),
  },

  Events: require('src/events/EventEmitter'),

  Game: require('src/core/Game'),

  Scene: require('src/scene/Scene'),

  DOM: require('src/dom'),

  Scale: require('src/scale'),

  Scenes: { ScenePlugin: require('src/scene/ScenePlugin') },

  GameObjects: {
    DisplayList: require('src/gameobjects/DisplayList'),

    UpdateList: require('src/gameobjects/UpdateList'),

    BuildGameObject: require('src/gameobjects/BuildGameObject'),

    GameObjectFactory: require('src/gameobjects/GameObjectFactory'),

    Image: require('src/gameobjects/image/Image'),

    Sprite: require('src/gameobjects/sprite/Sprite'),

    Container: require('src/gameobjects/container/Container'),

    RenderTexture: require('src/gameobjects/rendertexture/RenderTexture'),

    BitmapText: require('src/gameobjects/bitmaptext/static/BitmapText'),

    DynamicBitmapText: require('src/gameobjects/bitmaptext/dynamic/DynamicBitmapText'),

    Factories: {
      Image: require('src/gameobjects/image/ImageFactory'),
      Sprite: require('src/gameobjects/sprite/SpriteFactory'),
      Container: require('src/gameobjects/container/ContainerFactory'),
      Text: require('src/gameobjects/text/static/TextFactory'),
      BitmapText: require('src/gameobjects/bitmaptext/static/BitmapTextFactory'),
      DynamicBitmapText: require('src/gameobjects/bitmaptext/dynamic/DynamicBitmapTextFactory'),
    },

    Creators: {
      Image: require('src/gameobjects/image/ImageCreator'),
      Sprite: require('src/gameobjects/sprite/SpriteCreator'),
      Container: require('src/gameobjects/container/ContainerCreator'),
      Text: require('src/gameobjects/text/static/TextCreator'),
      BitmapText: require('src/gameobjects/bitmaptext/static/BitmapTextCreator'),
      DynamicBitmapText: require('src/gameobjects/bitmaptext/dynamic/DynamicBitmapTextCreator'),
    },
  },

  Loader: {
    FileTypes: {
      ImageFile: require('src/loader/filetypes/ImageFile'),
      AtlasJSONFile: require('src/loader/filetypes/AtlasJSONFile'),
      BitmapFont: require('src/loader/filetypes/BitmapFontFile'),
      AudioFile: require('src/loader/filetypes/AudioFile'),
    },

    LoaderPlugin: require('src/loader/LoaderPlugin'),
  },

  Math: {},

  Plugins: {
    BasePlugin: require('src/plugins/BasePlugin'),
    ScenePlugin: require('src/plugins/ScenePlugin'),
  },

  Tweens: { TweenManager: require('src/tweens/TweenManager') },

  Input: {
    InputPlugin: require('src/input/InputPlugin'),
  },

  Clock: { TimerEvent: require('src/time/Clock') },

  Utils: {
    String: { UUID: require('src/utils/string/UUID') },
    Array: { GetRandom: require('src/utils/array/GetRandom') },
    Objects: { GetAdvancedValue: require('src/utils/object/GetAdvancedValue') },
  },
};

if (typeof PLUGIN_CAMERA3D) {
  Phaser.Cameras.Sprite3D = require('plugins/camera3d/src');
  Phaser.GameObjects.Sprite3D = require('plugins/camera3d/src/sprite3d/Sprite3D');
  Phaser.GameObjects.Factories.Sprite3D = require('plugins/camera3d/src/sprite3d/Sprite3DFactory');
  Phaser.GameObjects.Creators.Sprite3D = require('plugins/camera3d/src/sprite3d/Sprite3DCreator');
}

if (typeof PLUGIN_FBINSTANT) {
  Phaser.FacebookInstantGamesPlugin = require('plugins/fbinstant/src/FacebookInstantGamesPlugin');
}

if (typeof PLUGIN_SPINE_WEBGL) {
  Phaser.SpineWebGLPlugin = require('plugins/spine/src/SpineWebGLPlugin');
}

if (typeof PLUGIN_SPINE_CANVAS) {
  Phaser.SpineCanvasPlugin = require('plugins/spine/src/SpineCanvasPlugin');
}

//  Merge in the consts

Phaser = Extend(false, Phaser, CONST);

//  Export it

module.exports = Phaser;

global.Phaser = Phaser;
