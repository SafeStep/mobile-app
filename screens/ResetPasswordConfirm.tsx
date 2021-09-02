import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import {Input, Button, HeadingCurve, RoundButton, AuthError} from '../components'
import Images from '../assets/images';
import ColorPalette from '../constants/ColorPalette';

import {Auth} from 'aws-amplify';

//const styles = require('./styles');


const App : FC = ( { navigation, route}: any ) => {

    const [errorMessage, setErrorMsg] = useState<string>("")
    const [code, setCode] = useState<string | null>(null)
    const [newPassword, setNewPassword] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")

    const email = route.params.email;
    // console.log("ALOKDINOAISDN", email)

    const submitForgotPass = async () => {

        if (newPassword !== repeatPassword) {
            setErrorMsg("Password missmatch");
        } else if (newPassword === "" || repeatPassword === "" ) {
            setErrorMsg("Password field empty");
        } else {
            await Auth.forgotPasswordSubmit(email as string, code as string, newPassword as string)
            .then(data => navigation.navigate('reset_password_confirm', {email:email}))
            .catch(err => setErrorMsg(err.message));
        }
    }
    

    return (
        <View style={styles.container}> 
            <HeadingCurve backButton={true} onPress={() => navigation.navigate('reset_password')} text='New Password'/>
            <View style={styles.formContainer}>
                <View style={styles.logo}>
                    <RoundButton icon={Images.logo} onPress={() => {return}} />
                </View>
                <AuthError errMessage = {errorMessage} />

                <Input label="Code" placeholder='Code' onChangeText={(text) => setCode(text)} />
                <Input label="New Password" secureTextEntry={true} placeholder='Password' onChangeText={(text) => setNewPassword(text)} />
                <Input label="Repeat New Password" secureTextEntry={true} placeholder='Password' onChangeText={(text) => setRepeatPassword(text)} />

                <Button title='Confirm Change' onPress={submitForgotPass} />
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
    formContainer: {
        flex: 1,
        width: '100%',
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