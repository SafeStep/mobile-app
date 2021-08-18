import MapboxGL from "@react-native-mapbox-gl/maps";
import React from "react";
import { UserGeolocationService } from "../logic/UserGeolocationService";
import { PhysicalLocation } from '../types';
import { View, Text } from "react-native";
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
    markers?: PhysicalLocation[],
}

export const Map = ({ path, markers}: mapProps) => {

  MapboxGL.setAccessToken(MAPBOX_KEY);
  let userPosition = UserGeolocationService.instance.cachedLocation;
  return (       
    <MapboxGL.MapView style={styles.map} >

        <MapboxGL.Camera followUserLocation={true} />

        <MapboxGL.UserLocation/>
        {
        markers?.map((location, index) => {
          if (location && location.long){
            return (  <MapboxGL.MarkerView key={location.lat.toString() + location.long.toString()} id={location.title} coordinate={[location.long,location.lat]}>
                       <View style={styles.marker}>
                         <Text style={{alignSelf:"center"}}>{String.fromCharCode(index+65)}</Text>
                       </View>
                      </MapboxGL.MarkerView> );
          }
        }
          
        )}
        { 
          path.length !== 0 ?
        <MapboxGL.ShapeSource id='line1' shape={makeGeoJSON(path)}>
            <MapboxGL.LineLayer id="path" style={{"lineColor": "red"}} />
        </MapboxGL.ShapeSource>
        : null
        }
    </MapboxGL.MapView>);
};

export default Map;