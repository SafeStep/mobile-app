import React, {FC, useState, useEffect, useCallback} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import ColorPalette from "../constants/ColorPalette";
import {SafeAreaView} from "react-native-safe-area-context";
// @ts-ignore
import mbxClient from "@mapbox/mapbox-sdk";
import mbxDirections from "@mapbox/mapbox-sdk/services/directions";
import polyline from "@mapbox/polyline";
import {UserGeolocationService} from "../logic/UserGeolocationService";
import * as config from "../configuration.json";
// @ts-ignore
import {v4 as uuidv4} from "uuid";
import {max_waypoints as MAX_WAYPOINTS} from "../configuration.json";
import {Point} from "../logic/GeographicLogic";
import {Map, DestinationSearch} from "../components";
import {
  create_journey_lambda as CREATE_JOURNEY_LAMBDA,
  aws_region as AWS_REGION,
} from "../configuration.json";

const MAPBOX_KEY = config.mapbox_key;

const baseClient = mbxClient({accessToken: MAPBOX_KEY});
const directionsClient = mbxDirections(baseClient);
interface coordinatesObject {
  coordinates: number[];
}

const getRoute = (wayPoints: coordinatesObject[]): Promise<number[][]> => {
  return new Promise((resolve, reject) => {
    directionsClient
      .getDirections({
        profile: "walking",
        overview: "full",
        // @ts-ignore
        waypoints: wayPoints,
      })
      .send()
      .then((response: any) => {
        const directions = response.body;
        return resolve(polyline.decode(directions.routes[0].geometry));
      })
      .catch((error: string) => {
        reject(error);
      });
  });
};

import {Auth} from "aws-amplify";
import {Lambda} from "aws-sdk";
import CreateJourneyLambda from "../logic/CreateJourneyLambda";

const App: FC = ({navigation, route}: any) => {
  const [path, setPath] = useState([] as number[][]);
  const [markers, setMarkers] = useState([] as Waypoint[]); // store list of markers

  useEffect(() => {
    // add the first search Input
    if (markers.length == 0) {
      setMarkers([...markers, {id: uuidv4(), point: null}]);
    }
  }, []);

  useEffect(() => {
    // when ever a marker is updated need to re route the path
    if (UserGeolocationService.instance.getCachedLocation() === null) {
      console.warn("Cant create path as no user location available");
      UserGeolocationService.instance.getLocation(); // bypass the 30 second timer
      return;
    }

    let waypoints = [UserGeolocationService.instance.getCachedLocation()]; // append the user location to the start of the array

    markers.forEach(waypoint => {
      waypoints.push(waypoint.point);
    });

    let latLongs = [] as coordinatesObject[];

    waypoints.forEach(element => {
      // convert to lat longs instead of physicalLocations
      if (!element || !element.long) {
        return; // skip this current element as it is empty
      }
      latLongs.push({coordinates: [element.long, element.lat]});
    });

    if (latLongs.length < 2) {
      setPath([]);
      return; // not enough waypoints to create a path
    }

    getRoute(latLongs)
      .then((_path: number[][]) => {
        setPath(_path);
      })
      .catch((error: any) => {
        console.warn(error);
      });

    // get the users current location and add it to the start of the list then generate the path and set it as the path variable
  }, [markers]); // run whenever markers is updated

  const markersUpdate = (positions: Waypoint[]) => {
    // called when destination search has modified the waypoints in some form
    let toUpdate = [] as Waypoint[];
    positions.forEach(element => {
      if (element.point !== undefined) toUpdate.push(element); // will be null if search has not been fulfilled
    });
    setMarkers(toUpdate);
  };

  const markersDelete = (id: string) => {
    setMarkers(
      markers.filter(item => {
        return item.id !== id;
      }),
    ); // filter out the bad id
  };

  const createAdhocMarker = (lat: number, long: number): void => {
    // will place adhoc marker in position closest to two nodes
    if (markers.length >= MAX_WAYPOINTS) {
      return;
    }

    let markersCopy = [...markers];
    const userLocation = UserGeolocationService.instance.getCachedLocation();
    let closestIndex: number = -1; // default to use the end of the array

    if (userLocation) {
      // if the location is not null
      markersCopy.unshift({
        id: "user-location",
        point: {
          lat: userLocation!.lat,
          long: userLocation!.long,
          title: "user-location",
        },
      });
    }
    let closestDistance = Infinity;

    for (let i = 0; i < markersCopy.length - 1; i++) {
      if (!(markersCopy[i].point && markersCopy[i + 1].point)) {
        continue;
      } // if either havnt been defined

      const startMarker = new Point(
        markersCopy[i].point.long,
        markersCopy[i].point.lat,
      );
      const endMarker = new Point(
        markersCopy[i + 1].point.long,
        markersCopy[i + 1].point.lat,
      );
      const longPressPoint = new Point(long, lat);
      const totalDistance =
        startMarker.distanceTo(longPressPoint) +
        endMarker.distanceTo(longPressPoint);

      if (totalDistance < closestDistance) {
        closestDistance = totalDistance;
        closestIndex = i + 1; // place it inbetween these two waypoints
      }
    }

    if (closestIndex === -1) {
      markersCopy.splice(closestIndex, 0, {
        id: uuidv4(),
        point: {lat: lat, long: long, title: "Long Press Marker"},
      });
    } else {
      markersCopy.push({
        id: uuidv4(),
        point: {lat: lat, long: long, title: "Long Press Marker"},
      });
    }

    if (userLocation) markersCopy.shift(); // remove the users location from the start of the array

    setMarkers(markersCopy);
  };

  const startJourney = useCallback(async () => {
    try {
      UserGeolocationService.instance.stopForegroundWatch(); // if throws an error something is really wrong
    } catch {
      console.log("Foreground watch not defined in foreground mode :(");
    }

    let journeyId;

    try {
      const result = await CreateJourneyLambda.invoke(
        path[0],
        path[path.length - 1],
        path,
      );
      journeyId = JSON.parse(result!.Payload!.toString()).journeyId;
    } catch (err) {
      console.error(err);
      alert("Could not start journey... try again later");
      return;
    }

    UserGeolocationService.instance.startPathTracking(path);
    navigation.navigate("on_route", {
      path: path,
      journeyId: journeyId,
    });
  }, [path]);

  return (
    <SafeAreaView style={styles.mapContainer} edges={["right", "top", "left"]}>
      <View style={styles.mapTopNav}>
        <DestinationSearch
          waypoints={markers}
          waypointUpdateCallback={markersUpdate}
          waypointDeleteCallback={markersDelete}
          navigation={navigation}
        />
      </View>
      <View style={styles.map}>
        {
          <Map
            path={path}
            markers={markers}
            adhocMarkerUpdate={createAdhocMarker}
          />
        }

        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            startJourney();
          }}>
          <Text style={styles.goButtonText}> Go </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: ColorPalette.white,
  },
  map: {
    width: "100%",
    flex: 1,
    backgroundColor: ColorPalette.fontGrey,
  },
  mapBottomNav: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  mapBottomNavButtons: {
    width: 150,
    height: 40,
    backgroundColor: ColorPalette.white,

    borderRadius: 20,
    shadowColor: ColorPalette.black,
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,

    flexDirection: "column",
    justifyContent: "center",
  },
  mapBottomNavText: {
    alignSelf: "center",
  },
  mapTopNav: {
    width: "100%",
    backgroundColor: ColorPalette.white,
  },
  goButton: {
    width: 150,
    height: 40,
    backgroundColor: ColorPalette.mainBlue,
    borderRadius: 50,

    position: "absolute",
    alignSelf: "center",
    bottom: 50,
    flexDirection: "column",
    justifyContent: "center",

    // IOS
    shadowColor: "#000",
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 4,
  },
  goButtonText: {
    fontSize: 18,
    alignSelf: "center",
    color: ColorPalette.white,
  },
});
