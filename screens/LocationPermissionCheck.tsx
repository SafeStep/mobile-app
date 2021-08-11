import React, {FC, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { UserGeolocationService } from "../logic/UserGeolocationService";

const App : FC = ( { navigation }: any ) => {

    const [locationPermission, setLocationPermission] = useState("waiting");

    useEffect(()=> {
        new UserGeolocationService(false);  // create the geolocation service
        UserGeolocationService.instance.requestPermission()
        .then(result => {
            setLocationPermission(result);
        })
        .catch(() => {setLocationPermission("denied")})  // if it fails set as denied
    }, []);

    useEffect(() => {
        console.log("Location Permission: " + locationPermission);
        if (locationPermission === "granted") {
            navigation.navigate("map")  // redirect to map because permission has been granted
        }
    }, [locationPermission]);
    
    if (locationPermission === "waiting" ){
        return (
            <View><Text>Checking Permission...</Text></View>
        )
    }
    
    else { // has been denied
        return (
            <View><Text>Instructions on how to change to allow</Text></View>
        )
    }
}

export default App;