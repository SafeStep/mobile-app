import { PhysicalLocation } from "../types";
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from "react-native";
import { throwStatement } from "@babel/types";

const LOCATION_REFRESH_FREQ_SECS = 30;

type locationPermissionOption= "granted" | "denied";

export class UserGeolocationService {
  cachedLocation: PhysicalLocation | null = null;
  locationPermission: locationPermissionOption = "denied";
  static instance: UserGeolocationService;

  constructor(autoRequestPerm=false) {
    if (UserGeolocationService.instance) { return; }

    UserGeolocationService.instance = this;

    this.cachedLocation = null;

    let _this = this;

    if (autoRequestPerm) {
      this.requestPermission() // request permission from the user
        .then(result => { _this.locationPermission = result; }) // set the result to property in this object
        .then(_this.getLocation); // get the users location
    }

    setInterval(() => {
      _this.getLocation().then(result => console.log(result))
      .catch()
    }, LOCATION_REFRESH_FREQ_SECS * 1000);  // get the location every X seconds
  }

  getLocation(): Promise<PhysicalLocation> {
    const _this = this;
    console.log("Getting location");
    return new Promise((resolve, reject) => {
      if (_this.locationPermission === "denied") {
        reject("Location permission denied");
      }

      else if (_this.locationPermission === "granted") { // if changed to granted then try and get the location
        Geolocation.getCurrentPosition(
          position => {
            _this.cachedLocation = { title: "Current Location", long: position.coords.longitude, lat: position.coords.latitude };
            resolve(_this.cachedLocation);
          },
          () => {
            alert("SafeStep can't access your location currently! Please make sure that the app has access in your settings");
            reject("Location permission denied");
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
      }
    });
  }

  public requestPermission(): Promise<locationPermissionOption> {
    let _this = this;
    return new Promise((resolve, reject) => {
      if (Platform.OS === "ios") {
        Geolocation.requestAuthorization("always").then(result => {
          _this.locationPermission = result as any;  // god knows why it doesnt like that
          resolve(result as locationPermissionOption);
        })
          .catch(err => reject(err));
      }
      else if (Platform.OS === "android") {
        UserGeolocationService.requestAndroidPermission().then(result => {
          _this.locationPermission = result;
          resolve(result);
        })
          .catch(err => reject(err));
      }
    });
  }

  private static requestAndroidPermission(): Promise<locationPermissionOption> {
    return new Promise((resolve, reject) => {
      PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]).then((result) => {
        for (let i = 0; i < Object.values(result).length; i++) { // loop through each permission requested
          console.log(result);
          if (Object.values(result)[i] !== "granted")
            resolve("denied"); // if any are denied assume all denied

        }
        resolve("granted"); // if promise resolved by here then must all be granted as all permissions were 
      })
        .catch(err => reject(err));
    });
  }
}
