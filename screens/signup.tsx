import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import {Input, Button, HeadingCurve} from '../components'

// import {launch} from '../navigation/index'

const styles = require('./styles');


const App : FC = (props ) => {

    const [username, setUsername] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const signup = async () => {
        if (username && email && password)  {
            try {
                //try creating an account
                console.log("success, account created", username, email, password);
                // const user = true;
                
            } catch (error) {
                console.log(error);
                
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
            <Input placeholder='Password'secureTextEntry={true} onChangeText={(text) => setPassword(text)} />

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

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingTop: '40%'
//     },
//     stretch: {
//         width: '100%',
//         height: '100%',
//         alignSelf: 'center',
//         borderRadius: 10,
//     },
//     altText: {
//         marginTop: 10,
//         marginBottom: 5,
//         fontSize: 15,
//         color: '#605B5B',
//     },
//     alternatives: {
//         // flex: 1,
//         flexDirection: 'row'
//     },
//     altMethods: {
//         width: '25%',
//         height: 60,
//         marginVertical: 10,

//         marginLeft: 5,
//         marginRight: 5,


//         backgroundColor: 'red',

//         // flex: 2,
//         // flexDirection: 'row',

//         borderRadius: 10,

//         shadowColor: '#000',
//         shadowOffset: { width: 1, height: 4},
//         shadowOpacity: 0.5,
//         shadowRadius: 1,
//         elevation: 5,
//     },
//     changePage: {
//         flexDirection: 'row',
//         marginVertical: 10,
//     },
//     intextButton: {
//         color: '#000',
//         fontWeight: 'bold'
//     }
// })