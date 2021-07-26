import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {Input, Button, HeadingCurve, AuthError} from '../components'

import { Auth } from 'aws-amplify';

const App : FC = ( { route, navigation }:any ) => {

    // const [email, setEmail] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const [errorMessage, setErrorMessage] = useState<string>("");

    //const navigation = props.navigation
    async function Login() {
        try {
            const user = await Auth.signIn(email as string, password as string);
            // updateAuthState('loggedIn');
            // console.log(updateUser);
            
            // updateUser(true);

            route.params.updateUser(true)

            console.log(user);
        } catch (error) {
            console.log('error signing in',error );
            //console.log('errro obj', Object.keys(error) );

            setErrorMessage(error.message);
        }
    }

    return (
        <View style={styles.container}>
            <HeadingCurve text='SafeSteps'/>
            <AuthError errMessage = {errorMessage} />
            <Input placeholder='E-mail' onChangeText={(text) => setEmail(text)} />

            <Input placeholder='Password' secureTextEntry={true}  onChangeText={(text) => setPassword(text)} />
            <Button title='Login' onPress={Login} />


            <View style={styles.forgot}>
                <Text style={styles.intextButton}>Forgot</Text>

                <TouchableOpacity onPress = {() => navigation.navigate('')}> 
                    <Text style={styles.span}> E-mail </Text>
                </TouchableOpacity>

                <Text style={styles.intextButton}>or</Text>

                <TouchableOpacity onPress = {() => navigation.navigate('reset_password')}> 
                    <Text style={styles.span}> Password </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.altText}> - - Or login with - - </Text>

            <View style={styles.alternatives}>
                <TouchableOpacity style={styles.altMethods}> 
                    <Image styles={styles.stretch} source={require('../assets/images/google-icon.jpg')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.altMethods}> 
                    {/* <Image style={styles.stretch} source={require('../assets/images/google.jpg')} /> */}
                </TouchableOpacity>

            </View>

            <View style={styles.changePage}> 
                <Text style={styles.intextButton}> Don't have an account? </Text>
                <TouchableOpacity onPress = {() => navigation.navigate('signup')}> 
                    <Text style={styles.span}>Signup </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '40%',
        backgroundColor: '#eee'
    },
    forgot: {
        flexDirection: 'row',
        marginTop: 5,
    },
    stretch: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        // alignSelf: 'center',
        borderRadius: 10,
    },
    altText: {
        marginTop: 10,
        marginBottom: 0,
        fontSize: 15,
        color: '#605B5B',
    },
    alternatives: {
        // flex: 1,
        flexDirection: 'row'
    },
    altMethods: {
        width: '35%',
        height: 60,
        marginVertical: 10,
        marginLeft: 5,
        marginRight: 5,


        backgroundColor: '#fff',
        // flex: 1,
        // flexDirection: 'row',
        //borderWidth: 1,
        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
    },
    changePage: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    intextButton: {
        color: '#605B5B',
        fontSize: 15,
    },
    span: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 15,

    }
})