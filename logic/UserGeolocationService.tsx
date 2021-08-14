import { PhysicalLocation } from "../types";
import { PermissionsAndroid, Platform } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

TaskManager.defineTask("OUTPUT-LOCATION", ({ data, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  console.log('Received new locations', data);
});

const LOCATION_REFRESH_FREQ_SECS = 30;

export class UserGeolocationService {
  cachedLocation: PhysicalLocation | null = null;
  locationPermission: Location.PermissionStatus = Location.PermissionStatus.DENIED;
  static instance: UserGeolocationService;

  constructor(autoRequestPerm=false) {
    if (UserGeolocationService.instance) { return; }

    UserGeolocationService.instance = this;

    this.cachedLocation = null;

    let _this = this;

    Location.stopLocationUpdatesAsync("OUTPUT-LOCATION")  // stop any already created background processes

    if (autoRequestPerm) {
      this.requestForegroundPermission() // request permission from the user
        .then(result => { _this.locationPermission = result.status; }) // set the result to property in this object
        .then(_this.getLocation); // get the users location
    }

    setInterval(() => {
      _this.getLocation()
      .catch()
    }, LOCATION_REFRESH_FREQ_SECS * 1000);  // get the location every X seconds
  }

  startBackgroundLocation() {
    Location.startLocationUpdatesAsync("OUTPUT-LOCATION", {
      foregroundService: {
        notificationTitle: "SafeStep",
        notificationBody: "test",
      },
      showsBackgroundLocationIndicator: true
    });
  }

  getLocation(): Promise<PhysicalLocation> {
    const _this = this;
    return new Promise((resolve, reject) => {
      if (_this.locationPermission === "denied") {
        reject("Location permission denied");
      }

      else if (_this.locationPermission === "granted") {
        // TODO IMPLIMENT FOREGROUND GET LOCATION
      }
    });
  }

  public requestForegroundPermission(): Promise<Location.LocationPermissionResponse> {
    let _this = this;
    return Location.getForegroundPermissionsAsync()
  }

  
  // public requestBackgroundPermission(): Promise<locationPermissionOption> {
    
  // }
}

