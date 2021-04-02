import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Header} from '../components'
import Navigation from '../navigation/first_index';
import { PhysicalLocation } from "../types"

const styles = require('./styles');
const axios = require('axios');

interface locationResultInterface extends PhysicalLocation {
    navigation: any,
    inputId: string,
    clickCallback: Function,
}

const LocationResult = ( { navigation, title, lat, long, inputId, clickCallback } : locationResultInterface) => {

    return (
        <TouchableOpacity onPress={() => {navigation.navigate("map", {inputId: inputId, location: {title: title, lat:lat, long:long}}); clickCallback(inputId, {title:title, lat:lat, long:long}); }}>
            <Text>{ title }</Text>
        </TouchableOpacity>
    )
}

const App : FC = ( { route, navigation } : any) => {

    const [inputId, setInputId] = useState(route.params.inputId);
    const [results, setResults] = useState([] as PhysicalLocation[]);
    
    const searchLocations = (inputValue: string) => {  // run the mapbox api 
        const currentLocation = {title:"Current Location", lat:52.5680, long:-1.346074};

        axios.get(`https://y5yyrwkg42.execute-api.eu-west-1.amazonaws.com/dev/places?query=${inputValue}&lat=${currentLocation.lat}&long=${currentLocation.long}`)  // TODO stop hardcoded current position
        .then(function (response: any) {

            let results = [] as PhysicalLocation[]

            response.data.features.forEach((location: any) => {  // for each response
                results.push({ title: location.place_name, long: location.center[0] ,lat: location.center[1]})
            });

            setResults(results);  // update the search results
        })
        .catch(function (error: any) {
            console.log(error)
        });  
    };

    return (
        <SafeAreaView style={styles.mapContainer}>
            <TextInput placeholder={"Search"} onChangeText={(queryString) => searchLocations(queryString)}/>
            {results.map(location => <LocationResult 
                                        clickCallback={route.params.updateCallback}
                                        inputId={inputId} 
                                        title={location.title}
                                        lat={location.lat}
                                        long={location.long}
                                        navigation={navigation}/>)}
        </SafeAreaView>

    )
}

export default App;