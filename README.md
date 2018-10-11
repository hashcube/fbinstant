Facebook Instant Module for GameClosure Devkit
===============

The devkit facebook instant plugin provides native support with a matching API to the
JavaScript facebook instant games API.

## Setup

### Installation

Add devkit-facebook to your dependencies section of the manifest.

Run
``` "devkit install https://github.com/hashcube/fbinstant.git" ```

### Config

There are a few keys you need to add to your _manifest.json_. This should cover
both iOS and Android.

```json
"addons": {
  "facebook": {
    "facebookAppID": "your-app-id",
    "facebookDisplayName": "your-app-display-name",
  }
}
```

### Integration

Import the facebook sdk into your code. You will want to wait for the SDK to
be ready before you do anything.

```javascript
import fbinstant as fbinstant;;

fbinstant.initialise(callback, opts);
```

### FBInstant.initialise
Initializes and starts the game

### FBInstant.setDataAsync/FBInstant.getDataAsync

Instant games lets you save and retrieve data using these two methods for further game sessions.

### FBInstant.subscribeBotAsync

For rich gameplay facebook lets user to interact with the messenger bot.`subscribeBotAsync` returns a `promise`.

## Documentation
To check list of all supported method.Refer to:
```https://github.com/hashcube/fbinstant/blob/master/js/index.js```
Additional method are documented here:
```https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.2/```
