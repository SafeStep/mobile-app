import React, {FC, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserGeolocationService } from "../logic/UserGeolocationService";

const App : FC = ( { navigation }: any ) => {

    const [foregroundLocationPermission, setForegroundLocationPermission] = useState("waiting");
    const [backgroundLocationPermission, setBackgroundLocationPermission] = useState("waiting");

    useEffect(()=> {
        new UserGeolocationService(false);  // create the geolocation service
        UserGeolocationService.instance.requestForegroundPermission()
        .then(result => {
            setForegroundLocationPermission(result.granted.toString());
        })
        .then(UserGeolocationService.instance.requestBackgroundPermission)
        .then(result => {
            setBackgroundLocationPermission(result.granted.toString())
        })
        .catch(() => {setForegroundLocationPermission("false")})  // if it fails set as denied
    }, []);

    useEffect(() => {
        console.log("Foreground Location Permission: " + foregroundLocationPermission);
        if (foregroundLocationPermission === "true" && backgroundLocationPermission === "true") {
            UserGeolocationService.instance.startForegroundWatch();  // start tracking the foreground
            navigation.navigate("map")  // redirect to map because both permissions have been granted
        }
    }, [foregroundLocationPermission, backgroundLocationPermission]);

    if (foregroundLocationPermission === "false"){
        return (
            <SafeAreaView><Text>Instructions on how to change foreground to allow</Text></SafeAreaView>
        )
    }

    else if (backgroundLocationPermission === "false") {
        return (
            <SafeAreaView><Text>Instructions on how to change background to allow</Text></SafeAreaView>
        ) 
    }
    
    else { // waiting for checks still
        return (
            <SafeAreaView><Text>Checking Permission...</Text></SafeAreaView>
        )
    }
}

export default App;