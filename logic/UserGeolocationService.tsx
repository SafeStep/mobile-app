import { PhysicalLocation } from "../types";
import { PermissionsAndroid, Platform } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { LocationAccuracy } from "expo-location";

TaskManager.defineTask("OUTPUT-LOCATION", ({ data, error } : any) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  const location = {lat: data.locations[0].coords.latitude, long:  data.locations[0].coords.longtitude, title: "Current Location" } as PhysicalLocation  // TODO check if this is the most recent or the oldest value
  UserGeolocationService.instance.cachedLocation = location
  console.log('Received new locations', location);
});

const FOREGROUND_LOCATION_INTERVAL = 30;

const defaultWatchRemove = () => {
  throw "No watch to remove"
}

export class UserGeolocationService {
  cachedLocation: PhysicalLocation | null = null;
  static instance: UserGeolocationService;
  
  watchRemove: CallableFunction = defaultWatchRemove

  constructor(autoRequestPerm=false) {
    if (UserGeolocationService.instance) { return; }

    UserGeolocationService.instance = this;

    this.cachedLocation = null;

    let _this = this;

    Location.stopLocationUpdatesAsync("OUTPUT-LOCATION")  // stop any already created background processes

    if (autoRequestPerm) {
      this.requestForegroundPermission() // request permission from the user
      .then(this.requestBackgroundPermission)  // request their background permission
      .then(_this.getLocation); // get the users location
    }

    this.startForegroundWatch()
  }

  startBackgroundWatch() {
    Location.startLocationUpdatesAsync("OUTPUT-LOCATION", {
      foregroundService: {
        notificationTitle: "SafeStep",
        notificationBody: "test",
      },
      showsBackgroundLocationIndicator: true,
      timeInterval: 10,
      distanceInterval: 30,
    });
  }

  startForegroundWatch() {
    if (this.watchRemove != defaultWatchRemove) { console.error("Watch already running!") }  // stop the creation of two watches

    let _this = this
     Location.watchPositionAsync({
      accuracy: LocationAccuracy.Balanced,
      timeInterval: FOREGROUND_LOCATION_INTERVAL * 1000
    }, (location) => {_this.cachedLocation = {lat: location.coords.latitude, long: location.coords.longitude, title: "Current Location"}})
    .then(removeCallback => {this.watchRemove = removeCallback.remove})
    .catch(err => {console.error(err)})
  }

  stopBackgroundWatch() {
    Location.stopLocationUpdatesAsync("OUTPUT-LOCATION")
  }

  stopForegroundWatch() {
    this.watchRemove();
    this.watchRemove=defaultWatchRemove  // reset the callback
  }

  getLocation(): Promise<PhysicalLocation> {
    const _this = this;
    return new Promise(async (resolve, reject) => {
      let permissionStatus = (await Location.getForegroundPermissionsAsync()).status
      if (permissionStatus === Location.PermissionStatus.DENIED) {
        reject("Location permission denied");
      }

      else if (permissionStatus === Location.PermissionStatus.GRANTED) {
        Location.getCurrentPositionAsync({accuracy:LocationAccuracy.Balanced}).then((location)=> {  // TODO test accuracy of this
          let newLocation = {lat: location.coords.latitude, long: location.coords.longitude, title: "Current Location"} as PhysicalLocation
          _this.cachedLocation = newLocation;
          resolve(newLocation);
        })
        .catch(err => {console.error(err)});
      }
    });
  }

  public requestForegroundPermission(): Promise<Location.LocationPermissionResponse> {
    return Location.getForegroundPermissionsAsync()
  }

  
  public requestBackgroundPermission(): Promise<Location.LocationPermissionResponse> {
    return Location.getBackgroundPermissionsAsync()
  }
}

