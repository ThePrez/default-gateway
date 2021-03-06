"use strict";

const platform = require("os").platform();

if ([
  "android",
  "darwin",
  "freebsd",
  "linux",
  "openbsd",
  "sunos",
  "win32",
  "aix",
].indexOf(platform) !== -1) {
  let platformModule = `./${platform}`;
  if (platform === "aix") {
    platformModule = (require("os").type() === "OS400") ? "./ibmi.js" : "./sunos.js";
  }
  const families = require(platformModule);
  module.exports.v4 = () => families.v4();
  module.exports.v6 = () => families.v6();
  module.exports.v4.sync = () => families.v4.sync();
  module.exports.v6.sync = () => families.v6.sync();
} else {
  const noop = () => { throw new Error(`Unsupported Platform: ${platform}`); };
  module.exports.v4 = noop;
  module.exports.v6 = noop;
  module.exports.v4.sync = noop;
  module.exports.v6.sync = noop;
}
