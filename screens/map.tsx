import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Input, Button, HeadingCurve} from '../components'

import { Auth } from 'aws-amplify';

const styles = require('./styles');

const App : FC = (props:any, route ) => {

    // console.log(updateUser);
    console.log();


    async function signOut() {
        try {
            await Auth.signOut();
            // updateAuthState('loggedOut');
            // props.updateUser(null);
            props.route.params.updateUser(null)
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (

        <SafeAreaView style={styles.mapContainer}>

            <View style={styles.map}>
                <View style={styles.mapTopNav}>
                    <TouchableOpacity style={styles.mapTopNavButtons}>
                        <Text style={styles.mapTopNavText}> Recent </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mapTopNavButtons} onPress={() => props.navigation.navigate('contacts')}>
                        <Text style={styles.mapTopNavText}> Contacts </Text>
                    </TouchableOpacity>

                </View>

                
                <TouchableOpacity style={styles.sighOut} onPress={signOut}>
                        <Text style={styles.mapTopNavText}> SignOut </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.mapFooter}>
                <View style={styles.destinationContainer}> 
                    <TextInput style={styles.destinationInput} placeholderTextColor='#000' placeholder='Destinations' onChangeText={() => console.log('change')} />
                </View>

                <TouchableOpacity style={styles.goButton}>
                    <Text style={styles.goButtonText}> Go </Text>
                </TouchableOpacity>


            </View>
        </SafeAreaView>

    )
}

export default App;