import { PhysicalLocation } from "../types";
import { PermissionsAndroid, Platform } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { LocationAccuracy } from "expo-location";

const BACKGROUND_TASK_NAME ="OUTPUT-LOCATION"

TaskManager.defineTask(BACKGROUND_TASK_NAME, ({ data, error } : any) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  const location = {lat: data.locations[0].coords.latitude, long:  data.locations[0].coords.longitude, title: "Current Location" } as PhysicalLocation  // TODO check if this is the most recent or the oldest value
  UserGeolocationService.instance.cachedLocation = location
  console.log('Received new locations', location);
});

const FOREGROUND_LOCATION_INTERVAL = 30;
const BACKGROUND_LOCATION_INTERVAL = 10;

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

    if (TaskManager.isTaskDefined(BACKGROUND_TASK_NAME)) {
      this.stopBackgroundWatch()
    }


    if (autoRequestPerm) {
      this.requestForegroundPermission() // request permission from the user
      .then(this.requestBackgroundPermission)  // request their background permission
      .then(_this.getLocation); // get the users location
    }
  }

  async startBackgroundWatch() {
    try {
      await this.stopForegroundWatch();  // stop the foreground watch and let background watch takeover
    }
    catch{}  // dont care about successfulness
    console.log("Starting background watch")
    Location.startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      foregroundService: {
        notificationTitle: "SafeStep",
        notificationBody: "test",
      },
      showsBackgroundLocationIndicator: true,
      timeInterval: BACKGROUND_LOCATION_INTERVAL*1000,
      distanceInterval: 30,
      accuracy: LocationAccuracy.Highest,  // this value determines the update interval
      activityType: Location.ActivityType.OtherNavigation,
      pausesUpdatesAutomatically: false
    });
  }

  startForegroundWatch() {
    if (this.watchRemove != defaultWatchRemove) { console.error("Watch already running!") }  // stop the creation of two watches
    console.log("Starting foreground watch")

    let _this = this
     Location.watchPositionAsync({
      accuracy: LocationAccuracy.Balanced,
      timeInterval: FOREGROUND_LOCATION_INTERVAL * 1000
    }, (location) => {_this.cachedLocation = {lat: location.coords.latitude, long: location.coords.longitude, title: "Current Location"}})
    .then(removeCallback => {this.watchRemove = removeCallback.remove})
    .catch(err => {console.error(err)})
  }

  stopBackgroundWatch() {
    console.log("Stopping background watch")
    const _this = this;
    if (TaskManager.isTaskDefined(BACKGROUND_TASK_NAME) && Location.hasStartedLocationUpdatesAsync(BACKGROUND_TASK_NAME)) {  // if the task exists and has started
      Location.stopLocationUpdatesAsync(BACKGROUND_TASK_NAME)
    }
  }

  stopForegroundWatch() {
    console.log("Stopping foreground watch")
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
        Location.getCurrentPositionAsync({accuracy:LocationAccuracy.Highest}).then((location)=> {  // TODO test accuracy of this
          let newLocation = {lat: location.coords.latitude, long: location.coords.longitude, title: "Current Location"} as PhysicalLocation
          _this.cachedLocation = newLocation;
          resolve(newLocation);
        })
        .catch(err => {console.error(err)});
      }
    });
  }

  public requestForegroundPermission(): Promise<Location.LocationPermissionResponse> {
    return Location.requestForegroundPermissionsAsync()
  }

  
  public requestBackgroundPermission(): Promise<Location.LocationPermissionResponse> {
    return Location.requestBackgroundPermissionsAsync()
  }
}

