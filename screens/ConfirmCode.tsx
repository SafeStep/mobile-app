import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import {Input, Button, HeadingCurve} from '../components'


import { Auth } from 'aws-amplify';


const styles = require('./styles');


const App : FC = (props:any ) => {

    const [code, setComCode] = useState<string | null>(null)

    const username = props.route.params.username;

    async function confirmSignUp() {
        try {
          await Auth.confirmSignUp(username as string, code as string);
          props.navigation.navigate('login')
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }

    async function resendConfirmationCode() {
        try {
            await Auth.resendSignUp(username as string);
            console.log('code resent successfully');
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }

    return (
        <View style={styles.container}> 
            <HeadingCurve text='SignUp'/>

            <Input placeholder='Code' onChangeText={(text) => setComCode(text)} />
            <Button title='Confirm' onPress={confirmSignUp} />
            <Button title='Resend Code' onPress={resendConfirmationCode} />



        </View>
    )
}

export default App;
