interface Navigator {
  app: {
    exitApp: () => any; // Or whatever is the type of the exitApp function
  };
}

interface Window {
  device: Device;
  GameAnalytics: any;
  IronSourceAds: any;
}

interface CordovaPlugins {
  notification: any;
}
