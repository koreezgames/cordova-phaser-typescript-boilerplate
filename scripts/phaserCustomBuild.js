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

    Text: require('src/gameobjects/text/static/Text'),

    Factories: {
      Image: require('src/gameobjects/image/ImageFactory'),
      Container: require('src/gameobjects/container/ContainerFactory'),
      Text: require('src/gameobjects/text/static/TextFactory'),
      RectangleFactory: require('src/gameobjects/shape/rectangle/RectangleFactory'),
      LineFactory: require('src/gameobjects/shape/line/LineFactory'),
      TileSpriteFactory: require('src/gameobjects/tilesprite/TileSpriteFactory'),
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

  Structs: {
    Size: require('src/structs/Size'),
  },

  Input: {
    Events: {
      POINTER_DOWN: require('src/input/events/POINTER_DOWN_EVENT'),
      POINTER_UP: require('src/input/events/POINTER_UP_EVENT'),
    },
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
