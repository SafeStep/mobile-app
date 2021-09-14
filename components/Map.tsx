import MapboxGL from "@react-native-mapbox-gl/maps";
import React from "react";
import {UserGeolocationService} from "../logic/UserGeolocationService";
import {View, Text} from "react-native";
import * as config from "../configuration.json";
import {makeGeoJSON} from "../logic/GeographicLogic";

const MAPBOX_KEY = config.mapbox_key;

const styles = {
  map: {
    flex: 1,
    width: "100%",
  },

  marker: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 20,
  },
};

interface mapProps {
  path: number[][];
  markers?: Waypoint[];
  adhocMarkerUpdate: CallableFunction;
}

export const Map = ({path, markers, adhocMarkerUpdate}: mapProps) => {
  MapboxGL.setAccessToken(MAPBOX_KEY);
  let userPosition = UserGeolocationService.instance.getCachedLocation();
  return (
    // @ts-ignore
    <MapboxGL.MapView
      style={styles.map}
      onLongPress={feature => {
        adhocMarkerUpdate(
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
        );
      }}>
      <MapboxGL.Camera followUserLocation={true} />

      <MapboxGL.UserLocation />
      {markers?.map((location, index) => {
        if (location && location.point) {
          return (
            <MapboxGL.MarkerView
              key={location.id}
              id={location.id}
              coordinate={[location.point.long, location.point.lat]}>
              <View style={styles.marker}>
                <Text style={{alignSelf: "center"}}>
                  {String.fromCharCode(index + 65)}
                </Text>
              </View>
            </MapboxGL.MarkerView>
          );
        }
      })}
      {path.length !== 0 ? (
        <MapboxGL.ShapeSource id="line1" shape={makeGeoJSON(path)}>
          <MapboxGL.LineLayer id="path" style={{lineColor: "red"}} />
        </MapboxGL.ShapeSource>
      ) : null}
    </MapboxGL.MapView>
  );
};

export default Map;
