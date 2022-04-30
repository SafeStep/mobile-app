# SafeStep Mobile App

SafeStep was an app (no longer being developed) for users that felt uncomfortable making journeys on their own, they would enter their destination into the app, then SafeSteps would create a route for them, then if they were to walk too far off of the generated route, something was most likely wrong, and an SMS would be sent to the users emergency contacts with a link to track the user and come to their aid.

## Installation

Ensure machine is setup for react-native  
[React Native Installation Guide](https://reactnative.dev/docs/environment-setup)

### Adding keys

The `configuration-example.json` file contains the example contents of a config you need to create called `configuration.json`. Ensure you add values to any blank fields, e.g. MapBox keys. **A key file would be created in an upcoming update**

You will also need to add the `aws-exports.js` file and add it to the root folder. This file contains sensitive data and should be retrieved from another contributor.

### Install dependencies

```
yarn install
```

### IOS Only

```
npx pod-install ios
```

## Start App

### Android

```
npx react-native run-android
```

### IOS

```
npx react-native run-ios
```
