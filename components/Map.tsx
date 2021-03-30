import MapboxGL from "@react-native-mapbox-gl/maps";

import React from "react";

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

const styles = {
    map: {
        flex: 1,
        width: "100%"
      }
}

type mapProps = {
    path: number[][]
}



export const Map = ({ path }: mapProps) => {
    return (       
    <MapboxGL.MapView style={styles.map}>
        <MapboxGL.UserLocation/> 
        <MapboxGL.ShapeSource id='line1' shape={makeGeoJSON(path)}>
            <MapboxGL.LineLayer id="test" style={{"lineColor": "red"}} />
        </MapboxGL.ShapeSource>
    </MapboxGL.MapView>);
};