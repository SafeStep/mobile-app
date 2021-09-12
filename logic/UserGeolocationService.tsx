import { PhysicalLocation } from "../types";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { LocationAccuracy } from "expo-location";
import { calcIntersections, Point } from "./GeographicLogic";

const defaultWatchRemove = () => {
  throw "No watch to remove"
}

class UserGeolocationServiceState {
  private trackedPath: Point[]
  private consecOnTracks:number = 0
  private pathJoined: boolean = false
  private panicMode: boolean = false

  constructor(trackedPath: Point[] = []) {
    this.trackedPath = trackedPath;
  }

  setTrackedPath(path: number[][]): void {
    const trackedPath = [] as Point[];
    path.forEach(point => {
      trackedPath.push(new Point(point[0], point[1]));
    });

    this.trackedPath = trackedPath;
  }

  getConsecOnTracks(): number {
    return this.consecOnTracks
  }

  incrimentOnTracks(): void {
    this.consecOnTracks++;
    if (this.consecOnTracks >= UserGeolocationService.CONSEC_ON_TRACK_TO_START) {
      this.pathJoined = true;
      console.log("Users has joined the path, on leave alarm will be triggered")
    }
  }

  resetOnTracks() {
    this.consecOnTracks = 0;
  }

  getPathJoined(): boolean {
    return this.pathJoined
  }

  getTrackedPath(): Point[] {
    return this.trackedPath;
  }

  triggerPanic(): void {
    this.panicMode = true;
  }

  inPanicMode(): boolean {
    return this.panicMode;
  }
}

export class UserGeolocationService {
  public static readonly FOREGROUND_LOCATION_INTERVAL = 30;
  public static readonly BACKGROUND_LOCATION_INTERVAL = 10;
  public static readonly CONSEC_ON_TRACK_TO_START = 3;  // how many times has the user got to be reported as being 'on-track' to start the journey
  public static readonly BACKGROUND_TASK_NAME = "TRACK-PATH"
  public static readonly RANGE_RADIUS = 50  // in meters

  public static instance: UserGeolocationService;

  private cachedLocation: PhysicalLocation | null = null;
  private watchRemove: CallableFunction = defaultWatchRemove
  public state: UserGeolocationServiceState;

  private constructor(state?: UserGeolocationServiceState) {
    UserGeolocationService.instance = this;

    this.cachedLocation = null;

    this.state = state ? state : new UserGeolocationServiceState();

    if (TaskManager.isTaskDefined(UserGeolocationService.BACKGROUND_TASK_NAME)) {
      this.stopBackgroundWatch()
    }
  }

  static build(): UserGeolocationService {  // creates a new UserGeoLocation service 
    if (UserGeolocationService.instance) { throw "UserGeolocationService already exists" }  // enforce singleton
    return new UserGeolocationService();  // create a new 
  }

  reset(): void {  // resets the state
    this.state = new UserGeolocationServiceState();
  }

  setCachedLocation(location: PhysicalLocation): void {
    this.cachedLocation = location;
  }

  getCachedLocation(): PhysicalLocation | null {
    return this.cachedLocation;
  }

  isUserOnPath(): boolean {
    if (!this.cachedLocation) {
      throw "Users position not cached"
    }
    const userPoint = new Point(this.cachedLocation.long, this.cachedLocation.lat)
    return calcIntersections(userPoint, this.state.getTrackedPath(), UserGeolocationService.RANGE_RADIUS);
  }

  async startPathTracking(path: number[][]): Promise<void> {
    try {
      await this.stopForegroundWatch();  // stop the foreground watch and let background watch takeover
    }
    catch{}  // dont care about successfulness
    console.log("Starting background watch")

    this.state.setTrackedPath(path);

    Location.startLocationUpdatesAsync(UserGeolocationService.BACKGROUND_TASK_NAME, {
      foregroundService: {
        notificationTitle: "SafeStep",
        notificationBody: "test",
      },
      showsBackgroundLocationIndicator: true,
      timeInterval: UserGeolocationService.BACKGROUND_LOCATION_INTERVAL*1000,
      distanceInterval: 30,
      accuracy: LocationAccuracy.Highest,  // this value determines the update interval
      activityType: Location.ActivityType.OtherNavigation,
      pausesUpdatesAutomatically: false
    });
  }

  startForegroundWatch(): void {
    if (this.watchRemove != defaultWatchRemove) { console.error("Watch already running!") }  // stop the creation of two watches
    console.log("Starting foreground watch")

    let _this = this
     Location.watchPositionAsync({
      accuracy: LocationAccuracy.Balanced,
      timeInterval: UserGeolocationService.FOREGROUND_LOCATION_INTERVAL * 1000
    }, (location) => {_this.cachedLocation = {lat: location.coords.latitude, long: location.coords.longitude, title: "Current Location"}})
    .then(removeCallback => {this.watchRemove = removeCallback.remove})
    .catch(err => {console.error(err)})
  }

  stopBackgroundWatch(): void {
    console.log("Stopping background watch")
    const _this = this;
    if (TaskManager.isTaskDefined(UserGeolocationService.BACKGROUND_TASK_NAME) && Location.hasStartedLocationUpdatesAsync(UserGeolocationService.BACKGROUND_TASK_NAME)) {  // if the task exists and has started
      Location.stopLocationUpdatesAsync(UserGeolocationService.BACKGROUND_TASK_NAME)
    }
  }

  stopForegroundWatch(): void {
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

TaskManager.defineTask(UserGeolocationService.BACKGROUND_TASK_NAME, ({ data, error } : any) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  const location = {lat: data.locations[0].coords.latitude, long:  data.locations[0].coords.longitude, title: "Current Location" } as PhysicalLocation  // TODO check if this is the most recent or the oldest value
  UserGeolocationService.instance.setCachedLocation(location);
  const isOnPath = UserGeolocationService.instance.isUserOnPath();
  console.log('async location update');

  if (!UserGeolocationService.instance.state.getPathJoined()) {
    if (isOnPath) {
      UserGeolocationService.instance.state.incrimentOnTracks();
      console.log("Incrimented on track consecs")
    }
    else {
      UserGeolocationService.instance.state.resetOnTracks();
      console.log("Rest on track consecs")
    }
  }
  
  else {  // user has joined the path
    if (UserGeolocationService.instance.state.inPanicMode()) {
      console.log("http call with location")
    }
    else {
      if (isOnPath) console.log("User is on path")
      else {
        console.log("User is off path")
        UserGeolocationService.instance.state.triggerPanic();
      }
    }

  }
});