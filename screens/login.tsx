import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Input, Button, HeadingCurve} from '../components'

const styles = require('./styles');

const App : FC = (props ) => {

    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)


    return (
        <View style={styles.container}>
            <HeadingCurve text='SafeSteps'/>
            <Input placeholder='E-mail' onChangeText={(text) => setEmail(text)} />
            <Input placeholder='Password' onChangeText={(text) => setPassword(text)} />
            <Button title='Login' onPress={() => console.log('hi')} />

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