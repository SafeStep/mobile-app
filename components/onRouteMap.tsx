import MapboxGL from "@react-native-mapbox-gl/maps";
import React from "react";
import * as config from "../configuration.json";

const MAPBOX_KEY = config.mapbox_key

const makeGeoJSON: (data: number[][]) => any = function(data) {

    data.forEach(function(part, index, arr) {
      arr[index] = part.reverse(); // to fix mapbox's criminal ways of long then lat
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

const styles = {
    map: {
        flex: 1,
        width: "100%"
    },
    
    marker: {
      backgroundColor: "white", 
      borderColor: "gray",
      borderWidth: 1,
      width:20,
      height:20,
      borderRadius: 20,
    }
}

interface mapProps {
    path: number[][],
}

export const OnRouteMap = ({ path }: mapProps) => {
    console.log(path)
    MapboxGL.setAccessToken(MAPBOX_KEY);
    return (       
    <MapboxGL.MapView style={styles.map} >

        <MapboxGL.Camera followUserLocation={true} followUserMode={MapboxGL.UserTrackingModes.FollowWithHeading} />

        <MapboxGL.UserLocation/>
        { 
            path.length !== 0 ?
        <MapboxGL.ShapeSource id='line1' shape={makeGeoJSON(path)}>
            <MapboxGL.LineLayer id="path" style={{"lineColor": "red"}} />
        </MapboxGL.ShapeSource>
        : null
        }
    </MapboxGL.MapView>);
};

export default OnRouteMap;