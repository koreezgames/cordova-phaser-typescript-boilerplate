function loadAssets(
  scene: Phaser.Scene,
  loaderName: string,
  checker: (name: string) => boolean,
  node: any,
  keys: string[],
): void {
  if (typeof node === 'function') {
    if (!checker(node.Name)) {
      (scene.load as any)[loaderName](
        node.Name,
        ...keys.map((key: string) => node[key]),
      );
    } else {
      console.warn(`${node.Name} is already exists!!!`);
    }
  } else {
    for (const child of Object.keys(node)) {
      loadAssets(scene, loaderName, checker, node[child], keys);
    }
  }
}

export function loadImages(scene: Phaser.Scene, node: any): void {
  loadAssets(scene, 'image', scene.textures.exists.bind(scene.textures), node, [
    'FileURL',
  ]);
}

export function loadBitmapfonts(scene: Phaser.Scene, node: any): void {
  loadAssets(
    scene,
    'bitmapFont',
    scene.textures.exists.bind(scene.textures),
    node,
    ['PngURL', 'XmlURL'],
  );
}

export function loadAtlases(scene: Phaser.Scene, node: any): void {
  loadAssets(scene, 'atlas', scene.textures.exists.bind(scene.textures), node, [
    'TextureURL',
    'AtlasURL',
  ]);
}

export function loadJsons(scene: Phaser.Scene, node: any): void {
  loadAssets(
    scene,
    'json',
    scene.cache.json.exists.bind(scene.cache.json),
    node,
    ['FileURL'],
  );
}

export function loadAudios(scene: Phaser.Scene, node: any): void {
  loadAssets(
    scene,
    'audio',
    scene.cache.audio.exists.bind(scene.cache.audio),
    node,
    ['Mp3URL', 'OggURL'],
  );
}

export function loadSpines(scene: Phaser.Scene, node: any): void {
  loadAssets(
    scene,
    'spine',
    // @ts-ignore
    scene.spine.cache.exists.bind(scene.spine.cache),
    node,
    ['SkeletonURL', 'AtlasURL'],
  );
}
