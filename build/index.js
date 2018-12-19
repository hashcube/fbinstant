exports.onBeforeBuild = function (api, app, config, cb) {
  if (config.browser) {
    if (config.browser.headHTML) {
      config.browser.headHTML.push(
        '<script src="https://connect.facebook.net/en_US/fbinstant.6.2.js"></script> \
        <script> \
          if (window.FBInstant) { \
            window.FBInstant.initializeAsync() \
            .then(function () { \
              return FBInstant.setLoadingProgress(100); \
            }) \
            .then(FBInstant.startGameAsync) \
          } \
        </script>'
      );
    }
  }

  cb();
};
