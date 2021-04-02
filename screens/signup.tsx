import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import {Input, Button, HeadingCurve} from '../components'


import { Auth } from 'aws-amplify';


const styles = require('./styles');


const App : FC = (props:any ) => {

    const [username, setUsername] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const [code, setComCode] = useState<string | null>(null)


    const signup = async () => {
        if (username && email && password)  {
            try {
                const { user } = await Auth.signUp({
                    username,
                    password,
                    attributes: {
                        email,          // optional
                        // other custom attributes 
                    }
                });
                // console.log(user);
                props.navigation.navigate('confirm_code', {username:username});
            } catch (error) {
                console.log('error signing up:', error);
            }
        
        } else {
            console.log("error, unfilled inputs");
        }
    }

    return (
        <View style={styles.container}> 
            <HeadingCurve text='SignUp'/>
            <Input placeholder='Username' onChangeText={(text) => setUsername(text)} />
            <Input placeholder='E-mail' onChangeText={(text) => setEmail(text)} />
            <Input placeholder='Password' secureTextEntry={true} onChangeText={(text) => setPassword(text)} />

            <Button title='SignUp' onPress={signup} />


            <Text style={styles.altText}> - - Or signup with - - </Text>

            <View style={styles.alternatives}>
                <TouchableOpacity style={styles.altMethods}> 
                    <Image style={styles.stretch} source={require('../assets/images/google.jpg')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.altMethods}> 
                    <Image style={styles.stretch} source={require('../assets/images/google.jpg')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.altMethods}> 
                    <Image style={styles.stretch} source={require('../assets/images/google.jpg')} />
                </TouchableOpacity>
            </View>

            <View style={styles.changePage}> 
                <Text style={styles.intextButton}> Already have an account? </Text>
                <TouchableOpacity onPress = {() => props.navigation.navigate('login')}> 
                    <Text style={styles.span}>Login </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default App;
