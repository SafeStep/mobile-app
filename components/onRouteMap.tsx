import MapboxGL from "@react-native-mapbox-gl/maps";
import React, {useState, useMemo} from "react";
import {Button} from "react-native"
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
 
const OnRouteMap = ({ path }: mapProps) => { 
    MapboxGL.setAccessToken(MAPBOX_KEY);

    const [mapLoaded, setMapLoaded] = useState(false)

    const [followUser, setFollowUser] = useState(true)
    const renderPath = useMemo(()=>{
        const geoJsonPath = makeGeoJSON(path); 
        return  <MapboxGL.ShapeSource id='finalLine' shape={geoJsonPath}>
                    <MapboxGL.LineLayer id="finalPath" style={{lineColor: "blue", lineWidth: 15, lineOpacity: 0.4}} />
                </MapboxGL.ShapeSource>}, [mapLoaded])
    
    return <>
    <MapboxGL.MapView style={styles.map} onDidFinishLoadingMap={() => setMapLoaded(true)}>
        <MapboxGL.UserLocation/>
        <MapboxGL.Camera 
        followUserLocation={followUser} 
        followUserMode={MapboxGL.UserTrackingModes.FollowWithHeading} 
        followZoomLevel={20}  // avoid changing this and the follow pitch as IOS really freaks out with any higher numbers
        followPitch={80}
        onUserTrackingModeChange={(data) => {setFollowUser(data.nativeEvent.payload.followUserLocation)}}
        />
        
        {renderPath}
    </MapboxGL.MapView>
    <Button onPress={() => {setFollowUser(true)}} title={"Recenter"}></Button>
    </>;
}

export default OnRouteMap;