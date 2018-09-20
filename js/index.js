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

    var FBInstant = this.FBInstant,
      playerName = FBInstant.player.getName(),
      playerPic = FBInstant.player.getPhoto(),
      playerId = FBInstant.player.getID();

      return {
        name: playerName,
        id: playerId,
        user_pic: playerPic
      };
  };

  // The player's localized display name.
  this.getUserName = function () {
    return this.FBInstant.player.getName();
  };

  // A url to the player's public profile photo.
  // The photo will always be a square, and with dimensions of at least 200x200.
  this.getUserPhoto = function () {
    return this.FBInstant.player.getPhoto();
  };

  // Retrieve stats from the designated cloud storage of the current player.
  // Parameters 
  // obj : 
  //  An array containing a set of keys
  // cb : callback
  this.getDataAsync = function (attr, cb) {
    this.FBInstant.player.getDataAsync(attr)
    .then(function (data) {
      cb(data);
    })
  };

  // Set data to be saved to the designated cloud storage of the current player.
  // Parameters 
  // obj :
  //  An object containing a set of key-value pairs
  // cb : callback (optional)
  this.setDataAsync = function (obj, cb) {
    this.FBInstant.player.setDataAsync(obj)
    .then(function () {
      if (cb) {
        cb(true);
      }
    })
  };

  // Retrieve stats from the designated cloud storage of the current player.
  // Parameters 
  // obj : 
  //  An array containing a set of keys
  // cb : callback
  this.getStatsAsync = function (attr, cb) {
    this.FBInstant.player.getStatsAsync(attr)
    .then(function (data) {
      cb(data);
    })
    .catch(function(e) {
      debugger
    });
  };

  // Set stats to be saved to the designated cloud storage of the current player.
  // Parameters 
  // obj : 
  //  An object containing a set of key-value pairs
  //  value must be INTEGER TYPE!!
  // cb : callback (optional)
  this.setStatsAsync = function (obj, cb) {
    this.FBInstant.player.setStatsAsync(obj)
    .then(function () {
      if (cb) {
        cb(true);
      }
    })
  };

  // Parameters 
  // obj : 
  //  An object containing a set of key-value pairs
  //  indicating how much to increment each stat in storage
  // cb : callback (optional)
  // returns new stats
  this.incrementStatsAsync = function (obj, cb) {
    this.FBInstant.player.incrementStatsAsync(obj)
    .then(function (stats) {
      if (cb) {
        cb(stats);
      }
    })
  };

  // Immediately flushes any changes to the player data to the designated cloud storage.
  this.setAndFlushDataAsync = function (obj, cb) {
    this.FBInstant.player.setStatsAsync(obj)
    .then(window.FBInstant.player.flushDataAsync)
    .then(function () {
      if (cb) {
        cb(true);
      }
    })
  };

  // Info about the current game context
  this.getContextInfo = function () {
    return {
      id: this.FBInstant.context.getID(),
      type: this.FBInstant.context.getType()
    };
  };

  // Sets the data associated with the individual gameplay session for the current context.
  // returns void
  this.setSessionData = function (data) {
    this.FBInstant.setSessionData(data);
  };

  // This invokes a dialog to let the user share specified content,
  // paramters : Object with below mentioned props
  //  intent ("INVITE" | "REQUEST" | "CHALLENGE" | "SHARE") Indicates the intent of the share.
  //  image string A base64 encoded image to be shared.
  //  text string A text message to be shared.
  //  data (Object) A blob of data to attach to the share. 
  //  All game sessions launched from the share will be able to access this blob through FBInstant.getEntryPointData().
  this.shareAsync = function (obj, cb) {
    FBInstant.shareAsync(obj).then(function() {
      if (cb) {
        cb();
      }
    });
  };

  // Returns the entry point that the game was launched from.
  this.getEntryPointAsync = function (cb) {
    this.FBInstant.getEntryPointAsync().then(function (entry){
      cb(entry);
    });
  };
});

exports = new FacebookInstant();