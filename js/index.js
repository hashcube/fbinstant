import device;
import lib.PubSub;
import lib.Callback;


exports.onReady = new lib.Callback();

init();

function init() {
  var FB = window.FBInstant;
  FBInstant.initializeAsync()
    .then(function() {
      exports.onReady.fire();
    });
}
