import React from 'react';
import { TextInput, View } from 'react-native';

const styles = {
}

interface latLong {
    lat: number,
    long: number
}

interface destinationProps {
    location: latLong,
    callback: Function,

}

export const DestinationResult = ( {location, callback} : destinationProps) => {
    const selectLocation = () => {
        console.log("pressed");
        callback(location.lat, location.long);  // call the callback that will add a pin to the map
    };

    return (
    <View> 
        <TextInput placeholderTextColor='#000' placeholder='Destinations' onChangeText={() => console.log('change')} />
    </View>);
};