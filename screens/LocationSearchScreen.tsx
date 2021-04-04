import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState, useRef, useEffect} from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Header} from '../components'
import Navigation from '../navigation/first_index';
import { PhysicalLocation } from "../types"

const axios = require('axios');

const styles = {
    inputBox: {
        margin: 10,
        padding: 10, 
        height: 50,
        borderRadius: 5,
        backgroundColor: "white",
        elevation: 5,

        //IOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        flex: 1
    },

    searchContainer: {
        flexDirection: "row",
        width: "100%",
    },

    backButton: {
        flexDirection: "column",
        justifyContent: "center",
        width: 50,
    },

    resultsContainer: {
        width: "95%",
        height: 500,
        alignSelf: "center",
        borderTopWidth: 2,
        borderColor: "grey",
        padding: 10
    },

    result: {
        width: "100%",
        borderRadius: 5,
        borderColor: "#C4C4C4",
        borderWidth: 2,
        height: 50,
        padding: 10,
        marginVertical: 5,
        flexDirection: "column",
        justifyContent: "center",
    }
}

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
    const [typingTimeout, setTypingTimeout] = useState(null as any);
    
    const textInputRef = useRef(null as any);  // store a reference to the text input

    const handleTypingTimeout = (inputValue: string) => {
        if (typingTimeout) {  // if its not null
            clearTimeout(typingTimeout); // reset the timeout
        } 
        const searchDelay = 200;

        setTypingTimeout(setTimeout((inputValue) => { searchLocations(inputValue) }, searchDelay, inputValue));
    }

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

    useEffect(() => {
        textInputRef.current.focus();
    },[])

    return (
        <SafeAreaView style={{}}>
            <View style={styles.searchContainer as any}>
                <TouchableOpacity style={styles.backButton as any} onPress={() => {navigation.navigate("map")}}>
                    <Text style={{alignSelf:"center"}}>{"<-"}</Text>
                </TouchableOpacity>
                <TextInput ref={textInputRef} style={styles.inputBox} placeholder={"Search"} onChangeText={(queryString) => handleTypingTimeout(queryString)}/>
                <View style={styles.backButton as any}></View>
            </View>
            <KeyboardAvoidingView style={{}}>
                <ScrollView style={styles.resultsContainer as any}>
                {results.map(location => <View style={styles.result as any}>
                                            <LocationResult 
                                                clickCallback={route.params.updateCallback}
                                                inputId={inputId} 
                                                title={location.title}
                                                lat={location.lat}
                                                long={location.long}
                                                navigation={navigation}/>
                                        </View>)}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

export default App;