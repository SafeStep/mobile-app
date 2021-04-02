import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Input, Button, HeadingCurve} from '../components'

import { Auth } from 'aws-amplify';


const styles = require('./styles');

const App : FC = (props:any, updateUser ) => {

    // const [email, setEmail] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    async function signIn() {
        try {
            const user = await Auth.signIn(username as string, password as string);
            // updateAuthState('loggedIn');
            // console.log(updateUser);
            
            // updateUser(true);
            props.route.params.updateUser(true)

            console.log(user);
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    return (
        <View style={styles.container}>
            <HeadingCurve text='SafeSteps'/>
            <Input placeholder='Username' onChangeText={(text) => setUsername(text)} />
            <Input placeholder='Password'secureTextEntry={true}  onChangeText={(text) => setPassword(text)} />
            <Button title='Login' onPress={signIn} />

            <View style={styles.forgot}>
                <Text style={styles.intextButton}>Forgot</Text>

                <TouchableOpacity onPress = {() => props.navigation.navigate('')}> 
                    <Text style={styles.span}> E-mail </Text>
                </TouchableOpacity>

                <Text style={styles.intextButton}>or</Text>

                <TouchableOpacity onPress = {() => props.navigation.navigate('')}> 
                    <Text style={styles.span}> Password </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.altText}> - - Or login with - - </Text>

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
                <Text style={styles.intextButton}> Don't have an account? </Text>
                <TouchableOpacity onPress = {() => props.navigation.navigate('signup')}> 
                    <Text style={styles.span}>Signup </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default App;