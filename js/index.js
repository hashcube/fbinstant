var FacebookInstant = Class(function () {
  "use strict";

  this.FBInstant = window.FBInstant;

  this.initialise = function (cb, opts) {
    var FBInstant = this.FBInstant;

    FBInstant.initializeAsync()
      .then(function () {
        FBInstant.setLoadingProgress(100);
        FBInstant.startGameAsync()
        .then(function (){
          cb(opts);
        })
      });
  };

  this.getUserInfo = function () {
    "use strict";

    var FBInstant = window.FBInstant,
      contextId = FBInstant.context.getID(),
      contextType = FBInstant.context.getType(),
      playerName = FBInstant.player.getName(),
      playerPic = FBInstant.player.getPhoto(),
      playerId = FBInstant.player.getID();

      return {
        name: playerName,
        id: playerId,
        user_pic: playerPic,
        cxt_type: contextType,
        cxt_id: contextId
      };
  };

  this.getUserPhoto = function () {
    return this.FBInstant.player.getPhoto();
  };

  this.getUserName = function () {
    return this.FBInstant.player.getName();
  };
});

exports = new FacebookInstant();
