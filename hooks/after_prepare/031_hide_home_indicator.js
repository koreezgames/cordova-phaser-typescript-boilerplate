#!/usr/bin/env node

var prefersHomeIndicatorAutoHidden = `- (BOOL)prefersHomeIndicatorAutoHidden
{
    return YES;
}

`;

var fs = require('fs');
var path = require('path');
var rootdir = process.argv[2];
var config = fs.readFileSync('config.xml').toString();

var getName = function () {
  var value = config.match(new RegExp(`<name>(.+?)<\/name>`));
  if (value && value[1]) {
    return value[1];
  } else {
    return null;
  }
};

var getMainViewControllerImplementation = function (contents) {
  var value = contents.match(
    new RegExp(/@implementation MainViewController(.+?)@end/s),
  );
  if (value && value[1]) {
    return value[1];
  } else {
    return null;
  }
};

var prefersHomeIndicatorAutoHiddenExists = function (contents) {
  var value = contents.match(new RegExp(/prefersHomeIndicatorAutoHidden/));
  return !!value;
};

var name = getName();
var mainViewController = path.join(
  rootdir,
  `platforms/ios/${name}/Classes/MainViewController.m`,
);

try {
  var contents = fs.readFileSync(mainViewController).toString();
  if (prefersHomeIndicatorAutoHiddenExists(contents)) {
    console.log(
      '"@property(nonatomic, readonly) BOOL prefersHomeIndicatorAutoHidden;" Instance Property already exists.',
    );
    return;
  }
  var implementation = getMainViewControllerImplementation(contents);
  contents = contents.replace(
    implementation,
    implementation + prefersHomeIndicatorAutoHidden,
  );
  fs.writeFileSync(mainViewController, contents, 'utf8');
  console.log(
    '"@property(nonatomic, readonly) BOOL prefersHomeIndicatorAutoHidden;" Instance Property added successfully.',
  );
} catch (err) {
  console.log(err);
}
