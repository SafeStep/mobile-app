# SafeStep Mobile App

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
