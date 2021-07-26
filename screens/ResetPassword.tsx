import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import {Input, Button, HeadingCurve} from '../components'

// import {launch} from '../navigation/index'

import {Auth} from 'aws-amplify';

//const styles = require('./styles');


const App : FC = ( { navigation }: any ) => {

    // const [username, setUsername] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [code, setCode] = useState<string | null>(null)
    const [new_password, setNewPassword] = useState<string | null>(null)

    async function sendConfirmationCode() {
        await Auth.forgotPassword(email as string)
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }

    async function submitForgotPass() {
        await Auth.forgotPasswordSubmit(email as string, code as string, new_password as string)
        .then(data => console.log(data))
        .catch(err => console.log(err));
        navigation.navigate('login');
    }
    

    return (
        <View style={styles.container}> 
            <HeadingCurve text='Forgot Password'/>
            
            {/* <Input placeholder='Username' onChangeText={(text) => setUsername(text)} /> */}
            <Input placeholder='E-Mail' onChangeText={(text) => setEmail(text)} />

            <Button title='Send Code' onPress={sendConfirmationCode} />

            <Input placeholder='Code' onChangeText={(text) => setCode(text)} />
            <Input secureTextEntry={true} placeholder='New Password' onChangeText={(text) => setNewPassword(text)} />

            <Button title='Submit Code' onPress={submitForgotPass} />
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '20%'
    },
    stretch: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    altText: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 15,
        color: '#605B5B',
    },
    alternatives: {
        // flex: 1,
        flexDirection: 'row'
    },
    altMethods: {
        width: '25%',
        height: 60,
        marginVertical: 10,

        marginLeft: 5,
        marginRight: 5,


        backgroundColor: 'red',

        // flex: 2,
        // flexDirection: 'row',

        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
    },
    changePage: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    intextButton: {
        color: '#000',
        fontWeight: 'bold'
    }
})