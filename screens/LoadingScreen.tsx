import React, {FC, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {Input, Button, HeadingCurve, RoundButton} from '../components';
import ColorPalette from '../constants/ColorPalette';
import Images from '../assets/images'
import {Auth} from 'aws-amplify';
import { RotationGestureHandler } from 'react-native-gesture-handler';

const App : FC = ( { navigation , route} : any ) => {

    useEffect(() => {
        const checkAuthState = async () => {
            await Auth.currentAuthenticatedUser()
            .then((data) => console.log("User is Signed In",data))
            .catch((err) => navigation.navigate('login'))
            // .finally(() => route.params.updateUser(true));
    
        }

        checkAuthState();
    }, [])

    return (
        <View style={styles.container}>
            <HeadingCurve text='SafeSteps'/>
            <View style={styles.loading}>
                <View style={styles.logo}>
                    <RoundButton icon={Images.logo} onPress={() => {return}} />
                </View>
                <ActivityIndicator size="large" color="#fff" />

            </View>
        </View>
    )
}

export default App;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '10%',
        backgroundColor: ColorPalette.mainBlue
    },
    loading: {
        marginVertical: 10,
        flexDirection: 'column',

    },
    logo: {
        marginTop: 30,
        marginBottom: 200,
    }
})