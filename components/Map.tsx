import MapboxGL from "@react-native-mapbox-gl/maps";
import React from "react";
import { MAPBOX_KEY } from "@env"
import { UserGeolocationInteractions } from "../logic/UserGeolocationInteractions";
import { PhysicalLocation } from '../types';
import { View, Text } from "react-native";
import { useEffect } from "react";

new UserGeolocationInteractions();

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
  let userPosition = UserGeolocationInteractions.instance.cachedLocation;
  return (       
    <MapboxGL.MapView style={styles.map} >

        <MapboxGL.Camera centerCoordinate={(userPosition !== null ? [userPosition?.long, userPosition?.lat] as any : [0,0])} zoomLevel={userPosition !== null ? 15 : 1} />

        <MapboxGL.UserLocation/>
        {
        markers?.map((location, index) => {
          if (location){
            return (  <MapboxGL.MarkerView id={location.title} coordinate={[location.long,location.lat]}>
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