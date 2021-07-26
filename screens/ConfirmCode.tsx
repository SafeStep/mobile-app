import React, {FC, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import {Input, Button, HeadingCurve, AuthError} from '../components'
import { Auth } from 'aws-amplify';


const styles = require('./styles');


const App : FC = ({ navigation, route } : any ) => {

    const [code, setComCode] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string>("");

    const username = route.params.username;

    async function confirmSignUp() {
        try {
          await Auth.confirmSignUp(username as string, code as string);
          navigation.navigate('login')
        } catch (error) {
            console.log('error confirming sign up', error);
            setErrorMessage(error.message);
        }
    }

    async function resendConfirmationCode() {
        try {
            await Auth.resendSignUp(username as string);
            console.log('code resent successfully');
        } catch (error) {
            console.log('error resending code: ', error);
            setErrorMessage(error.message);
        }
    }

    return (
        <View style={styles.container}> 
            <HeadingCurve text='SignUp'/>
            <AuthError errMessage = {errorMessage} />

            <Input placeholder='Code' onChangeText={(text) => setComCode(text)} />
            <Button title='Confirm' onPress={confirmSignUp} />
            <Button title='Resend Code' onPress={resendConfirmationCode} />



        </View>
    )
}

export default App;