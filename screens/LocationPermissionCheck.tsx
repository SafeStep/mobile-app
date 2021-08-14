import React, {FC, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { UserGeolocationService } from "../logic/UserGeolocationService";

const App : FC = ( { navigation }: any ) => {

    const [foregroundLocationPermission, setForegroundLocationPermission] = useState("waiting");
    const [backgroundLocationPermission, setBackgroundLocationPermission] = useState("waiting");

    useEffect(()=> {
        new UserGeolocationService(false);  // create the geolocation service
        UserGeolocationService.instance.requestForegroundPermission()
        .then(result => {
            setForegroundLocationPermission(result.status);
        })
        .then(UserGeolocationService.instance.requestBackgroundPermission)
        .then(result => {
            setBackgroundLocationPermission(result.status)
        })
        .catch(() => {setForegroundLocationPermission("denied")})  // if it fails set as denied
    }, []);

    useEffect(() => {
        console.log("Foreground Location Permission: " + foregroundLocationPermission);
        if (foregroundLocationPermission === "granted" && backgroundLocationPermission === "granted") {
            navigation.navigate("map")  // redirect to map because both permissions have been granted
        }
    }, [foregroundLocationPermission, backgroundLocationPermission]);

    if (foregroundLocationPermission === "denied"){
        return (
            <View><Text>Instructions on how to change foreground to allow</Text></View>
        )
    }

    else if (backgroundLocationPermission === "denied") {
        return (
            <View><Text>Instructions on how to change background to allow</Text></View>
        ) 
    }
    
    else { // waiting for checks still
        return (
            <View><Text>Checking Permission...</Text></View>
        )
    }
}

export default App;