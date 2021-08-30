import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Input, Button, HeadingCurve, AuthError, RoundButton} from '../components'
import Images from '../assets/images'

import ColorPalette from '../constants/ColorPalette';
import {Auth} from 'aws-amplify';
import { ResetPassword } from '.';

// const styles = require('./styles');


const App : FC = ( { navigation }: any ) => {

    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [passwordRepeat, setPasswordRepeat] = useState<string | null>(null)

    const [errorMessage, setErrorMessage] = useState<string>("");

    const signup = async () => {
        if (!email || !password)  {
            console.log("error, unfilled inputs");
            setErrorMessage("E-mail or Password cannot be empty");
        } else if (password != passwordRepeat) {
            console.log("error, unmatching password");
            setErrorMessage("Password missmatch");
        } else {
            try {
                let username = email;
                const { user } = await Auth.signUp({
                    username,
                    password,
                });
                console.log(user);
                navigation.navigate('confirm_code', {username:username});
            } catch (error) {
                console.log('error signing up:', error);
                setErrorMessage(error.message);
    
            }
        }
    }

    return (
        <View style={styles.container}> 
            <HeadingCurve backButton={true} onPress={() => navigation.navigate('login')} text='Sign Up'/>
            <View style={styles.formContainer}>
                <View style={styles.logo}>
                    <RoundButton icon={Images.logo} onPress={() => {return}} />
                </View>

                <AuthError errMessage = {errorMessage} />

                <Input label="Email" placeholder='Email' onChangeText={(text) => setEmail(text)} />
                <Input label="Password" placeholder='Password'secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                <Input label="Re-enter Password" placeholder='Password'secureTextEntry={true} onChangeText={(text) => setPasswordRepeat(text)} />

                <Button title='SignUp' onPress={signup} />
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
        backgroundColor: ColorPalette.mainBlue
    },
    formContainer: {
        flex: 1,
        width: '100%',
        // justifyContent: 'center',
        // borderRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        backgroundColor: ColorPalette.white
    },
    logo: {
        marginTop: 30,
        marginBottom: 5,
    }
})