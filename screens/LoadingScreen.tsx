import React, {FC, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Input, Button, HeadingCurve} from '../components';

import {Auth} from 'aws-amplify';
import { RotationGestureHandler } from 'react-native-gesture-handler';

const styles = require('./styles');

const App : FC = ( { navigation , route} : any ) => {

    async function checkAuthState() {
        try {
            await Auth.currentAuthenticatedUser();
            console.log(' User is signed in');
            route.params.updateUser(true);
        } catch (err) {
            console.log(' User is not signed in');
            navigation.navigate('login');
        }
    }

    useEffect(() => {
        checkAuthState()
    }, [])

    return (
        <View style={styles.container}>
            <HeadingCurve text='SafeSteps'/>

        </View>
    )
}

export default App;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingTop: '40%'
//     },
//     stretch: {
//         width: '100%',
//         height: '100%',
//         alignSelf: 'center',
//         borderRadius: 10,
//     },
//     altText: {
//         marginTop: 10,
//         marginBottom: 5,
//         fontSize: 15,
//         color: '#605B5B',
//     },
//     alternatives: {
//         // flex: 1,
//         flexDirection: 'row'
//     },
//     altMethods: {
//         width: '25%',
//         height: 60,
//         marginVertical: 10,

//         marginLeft: 5,
//         marginRight: 5,


//         backgroundColor: 'red',

//         // flex: 2,
//         // flexDirection: 'row',

//         borderRadius: 10,

//         shadowColor: '#000',
//         shadowOffset: { width: 1, height: 4},
//         shadowOpacity: 0.5,
//         shadowRadius: 1,
//         elevation: 5,
//     },
//     changePage: {
//         flexDirection: 'row',
//         marginVertical: 10,
//     },
//     intextButton: {
//         color: '#000',
//         fontWeight: 'bold'
//     }
// })