import MapboxGL from "@react-native-mapbox-gl/maps";
import React, {useState} from "react";
import * as config from "../configuration.json";
import { makeGeoJSON } from "../logic/GeographicLogic";

const MAPBOX_KEY = config.mapbox_key

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
    MapboxGL.setAccessToken(MAPBOX_KEY);
  
    const [mapLoaded, setMapLoaded] = useState(false)
    
    const geoJsonPath = makeGeoJSON(path); 

    return (       
    <MapboxGL.MapView style={styles.map} onDidFinishLoadingMap={()=>{setMapLoaded(true)}}>

        <MapboxGL.Camera 
        followUserLocation={true} 
        followUserMode={MapboxGL.UserTrackingModes.FollowWithHeading} 
        followZoomLevel={20}
        followPitch={90}
         />

        <MapboxGL.UserLocation/>
        { 
            path.length !== 0 ?
        <MapboxGL.ShapeSource id='finalLine' shape={geoJsonPath}>
            <MapboxGL.LineLayer id="finalPath" style={{lineColor: "blue", lineWidth: 15, lineOpacity: 0.4}} />
        </MapboxGL.ShapeSource>
        : null
        }
    </MapboxGL.MapView>);
};

export default OnRouteMap;