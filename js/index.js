import util.underscore as _;

var FacebookInstant = Class(function () {
  "use strict";

  this.FBInstant = window.FBInstant;

  this.payments_ready = false;

  this.initialise = function (cb, opts) {
    var FBInstant = this.FBInstant;

    opts = opts || {};
    FBInstant.initializeAsync()
      .then(function () {
        return FBInstant.setLoadingProgress(100);
      })
      .then(FBInstant.startGameAsync)
      .then(bind(this, function () {
        this.setPaymentsReady();
        opts.entry_data = this.getEntryPointData();
        cb(opts);
      }));
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

  this.setPaymentsReady = function () {
    this.onReady(bind(this, function () {
      if (this.FBInstant.getSupportedAPIs()
        .includes('payments.purchaseAsync')) {
        this.payments_ready = true;
      }
    }));
  };

  this.getConnectedPlayersAsync = this.FBInstant.player.getConnectedPlayersAsync;

  this.getEntryPointData = this.FBInstant.getEntryPointData;

  this.updateAsync = this.FBInstant.updateAsync;

  this.createAsync = this.FBInstant.context.createAsync;

  this.getSupportedAPIs = this.FBInstant.getSupportedAPIs;

  this.consumePurchaseAsync = this.FBInstant.payments.consumePurchaseAsync;

  this.purchaseAsync = this.FBInstant.payments.purchaseAsync;

  this.onReady = this.FBInstant.payments.onReady;

  this.getCatalogAsync = this.FBInstant.payments.getCatalogAsync;

  // The player's localized display name.
  this.getName = this.FBInstant.player.getName;

  // A url to the player's public profile photo.
  // The photo will always be a square, and with dimensions of at least 200x200.
  this.getPhoto = this.FBInstant.player.getPhoto;

  // Retrieve stats from the designated cloud storage of the current player.
  // Parameters 
  // obj : 
  //  An array containing a set of keys
  this.getDataAsync = this.FBInstant.player.getDataAsync;

  // Set data to be saved to the designated cloud storage of the current player.
  // Parameters 
  // obj :
  //  An object containing a set of key-value pairs
  this.setDataAsync = this.FBInstant.player.setDataAsync;

  // Retrieve stats from the designated cloud storage of the current player.
  // Parameters 
  // obj : 
  //  An array containing a set of keys
  this.getStatsAsync = this.FBInstant.player.getStatsAsync;

  // Set stats to be saved to the designated cloud storage of the current player.
  // Parameters 
  // obj : 
  //  An object containing a set of key-value pairs
  //  value must be INTEGER TYPE!!
  this.setStatsAsync = this.FBInstant.player.setStatsAsync;

  // Parameters 
  // obj : 
  //  An object containing a set of key-value pairs
  //  indicating how much to increment each stat in storage
  // returns new stats
  this.incrementStatsAsync = this.FBInstant.player.incrementStatsAsync;

  // Immediately flushes any changes to the player data to the designated cloud storage.
  this.flushDataAsync = this.FBInstant.player.flushDataAsync;

  // Info about the current game context
  this.getContextInfo = function () {
    return {
      id: this.FBInstant.context.getID(),
      type: this.FBInstant.context.getType()
    };
  };

  // Sets the data associated with the individual gameplay session for the current context.
  // returns void
  this.setSessionData = this.FBInstant.setSessionData;

  // This invokes a dialog to let the user share specified content,
  // paramters : Object with below mentioned props
  //  intent ("INVITE" | "REQUEST" | "CHALLENGE" | "SHARE") Indicates the intent of the share.
  //  image string A base64 encoded image to be shared.
  //  text string A text message to be shared.
  //  data (Object) A blob of data to attach to the share. 
  //  All game sessions launched from the share will be able to access this blob through FBInstant.getEntryPointData().
  this.shareAsync = this.FBInstant.shareAsync

  // Returns the entry point that the game was launched from.
  this.getEntryPointAsync = this.FBInstant.getEntryPointAsync;

  // Request that the client switch to a different Instant Game.
  this.switchGameAsync = this.FBInstant.switchGameAsync;

  // Returns whether or not the user is eligible to have shortcut creation requested.
  this.canCreateShortcutAsync = this.FBInstant.canCreateShortcutAsync;

  // Prompts the user to create a shortcut to the game if they are eligible
  this.createShortcutAsync = this.FBInstant.createShortcutAsync;

  // Log an app event with FB Analytics.
  this.logEvent = this.FBInstant.logEvent;

  // parameters : (func: Function A function to call when a pause event occurs.)
  this.onPause = this.FBInstant.onPause;

  // Attempt to create an instance of rewarded video. This instance can then be preloaded and presented.
  this.getRewardedVideoAsync = this.FBInstant.getRewardedVideoAsync;

  // Parameters
  // name string The name of the leaderboard.
  this.getLeaderboardAsync = this.FBInstant.getLeaderboardAsync;

  // Attempt to create an instance of interstitial ad
  this.getInterstitialAdAsync = this.FBInstant.getInterstitialAdAsync;

  // create an instance of rewarded video
  this.getRewardedVideoAsync = this.FBInstant.getRewardedVideoAsync;

  // Returns a promise that resolves with whether the player can subscribe to the game bot or not.
  this.canSubscribeBotAsync = this.FBInstant.player.canSubscribeBotAsync;

  // Request that the player subscribe the bot associated to the game
  this.subscribeBotAsync = this.FBInstant.player.subscribeBotAsync;

  // Preload the ad.
  this.loadAsync = this.FBInstant.loadAsync;

  // Present the ad.
  this.showAsync = this.FBInstant.showAsync;

  this.getLocale = this.FBInstant.getLocale;

  this.getPlatform = this.FBInstant.getPlatform;

  this.getSDKVersion = this.FBInstant.getSDKVersion;

  this.quit = this.FBInstant.quit;

  this.requestLife = function (opts) {
    var fbInstant = this.FBInstant,
      player = fbInstant.player;

    fbInstant.context.chooseAsync()
      .then(bind(this, function () {
        this.sendMessage({
          data: {
            id: Date.now() + '_' + player.getID(),
            type: 'life',
            player_id: player.getID(),
            name: player.getName(),
            action: opts.action
          },
          text: opts.message,
          image: opts.image
        })
      }))
      .catch(function (ex) {
        console.log(ex);
      });
  };

  this.selectPlayer = function (cb) {
    var fbInstant = this.FBInstant,
      curr_player_id = fbInstant.player.getID();

    fbInstant.context.chooseAsync()
      .then(function () {
        fbInstant.context.getPlayersAsync()
        .then(function(players) {
          players.map(function(player) {
            if (player.getID() !== curr_player_id) {
              cb(player);
            }
          });
        });
      });
  };

  this.invite = function (opts) {
    var fbInstant = this.FBInstant,
      player = fbInstant.player;

    this.selectPlayer(bind(this, function () {
      this.sendMessage({
        data: {
          id: Date.now() + '_' + player.getID(),
          type: 'invite',
          player_id: player.getID(),
          name: player.getName()
        },
        text: opts.message,
        image: opts.image
      })
    }));
  };

  this.sendMessage = function (opts) {
    this.FBInstant.updateAsync({
      action: 'CUSTOM',
      data: opts.data,
      text: opts.text,
      strategy: 'IMMEDIATE',
      notification: 'NO_PUSH',
      template: 'play_turn',
      image: opts.image
    })
    .catch(function (ex) {
      console.log(ex);
    });
  };

  this.acceptRequest = function (params) {
    var fbInstant = this.FBInstant,
      player = fbInstant.player,
      sendMessage = bind(this, this.sendMessage),
      player_id = params.player_id,
      data = {
        id: Date.now() + '_' + player.getID(),
        type: 'life',
        player_id: player.getID(),
        name: player.getName(),
        action: 'send'
      },
      opts = {
        data:  data,
        text: params.message,
        image: params.image
      };

    fbInstant.context.createAsync(player_id)
      .then(function () {
        sendMessage(opts);
      })
      .catch(function (ex) {
        if (ex.code === 'SAME_CONTEXT') {
          sendMessage(opts);
        }
      });
  };

  this.getEntryPointData = function () {
    var data = this.FBInstant.getEntryPointData();

    return data;
  };
});

exports = new FacebookInstant();