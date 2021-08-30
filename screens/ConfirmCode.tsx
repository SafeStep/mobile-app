import React, {FC, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import {Input, Button, HeadingCurve, AuthError, RoundButton} from '../components'
import Images from '../assets/images';
import { Auth } from 'aws-amplify';

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
            <HeadingCurve backButton={true} onPress={() => navigation.navigate('signup')} text='Verify Email'/>

            <View style={styles.formContainer}>
                <View style={styles.logo}>
                    <RoundButton icon={Images.logo} onPress={() => {return}} />
                </View>
                <AuthError errMessage = {errorMessage} />

                <Input label="Code" placeholder='Code' onChangeText={(text) => setComCode(text)} />
                <Button title='Confirm' onPress={confirmSignUp} />
                <Button title='Resend Code' onPress={resendConfirmationCode} />


            </View>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10%',
        backgroundColor: '#0779E4'
    },
    formContainer: {
        flex: 1,
        width: '100%',
        // justifyContent: 'center',
        // borderRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    logo: {
        marginTop: 30,
        marginBottom: 5,
    }
})