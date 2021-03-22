import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";

import mbxClient from "@mapbox/mapbox-sdk";
import mbxDirections from "@mapbox/mapbox-sdk/services/directions";
import polyline from "@mapbox/polyline";

import {MAPBOX_KEY} from "@env"
const baseClient = mbxClient({ accessToken: MAPBOX_KEY });
const directionsClient = mbxDirections(baseClient);

MapboxGL.setAccessToken(MAPBOX_KEY);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  map: {
    flex: 1,
    width: "100%"
  }
});

interface geoJSON {
}

const makeGeoJSON: (data: number[][]) => any = function(data) {

  data.forEach(function(part, index, arr) {
    arr[index] = part.reverse();
  });

  return {
    "type":"Feature",
    "properties":{},
    "geometry":{
      "type":"LineString",
      "coordinates": data
    }
  }
};

const App: React.FC = () => {
  const [path, setPath] = useState([] as number[][]);

  useEffect(() => {
    getRoute().then((_path: number[][]) => {
      setPath(_path);
    }).catch((error: any) => {
      console.warn(error);
    });
  }, []);  // run like component did mount

  return (
      <View style={styles.page}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.ShapeSource id='line1' shape={makeGeoJSON(path)}>
            <MapboxGL.LineLayer id="test" style={{"lineColor": "red"}} />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </View>
  );
};


export default App;

const getRoute = (): Promise<number[][]> => {
  return new Promise((resolve, reject) => {
    directionsClient.getDirections({
      profile: 'walking',
      overview: "full",
      waypoints: [
        {
          coordinates: [-1.213787, 52.771881],  // in order of lat long (East, North)
        },
        {
          coordinates: [-1.2321, 52.7651],
        },
        // {
        //   coordinates: [13.4194, 52.5072],
        // }
      ]
    }).send()
    .then((response: any) => {
      const directions = response.body;
      return resolve(polyline.decode(directions.routes[0].geometry));
    })
    .catch((error: string) => {
      reject(error)
    });
  })
}

//sk.eyJ1Ijoib3B1Z2giLCJhIjoiY2tta3dmbnc2MTUzcDJ3azVmOHhxMDk2cSJ9.XP_hR3TpDYj9i5HMz5WzwA