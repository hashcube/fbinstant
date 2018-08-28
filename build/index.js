exports.onBeforeBuild = function (api, app, config, cb) {
  if (config.browser) {
    if (config.browser.bodyHTML) {
      config.browser.bodyHTML.push(
        '<script src="https://connect.facebook.net/en_US/fbinstant.6.2.js"></script>'
      );
    }
  }

  cb();
};
