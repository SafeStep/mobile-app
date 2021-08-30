import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {Input, Button, HeadingCurve, AuthError, RoundButton} from '../components'
import Images from '../assets/images'

import { Auth } from 'aws-amplify';

const App : FC = ( { route, navigation }:any ) => {

    // const [email, setEmail] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const [errorMessage, setErrorMessage] = useState<string>("");

    //const navigation = props.navigation
    async function Login() {
        try {
            if (!email || !password ) {
                return 
            }
            const user = await Auth.signIn(email!, password!);

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
            <View style={styles.formContainer}>
                <View style={styles.logo}>
                    <RoundButton icon={Images.logo} onPress={() => console.log("logo")} />

                </View>
                <AuthError errMessage = {errorMessage} />
                <Input label='E-mail' placeholder='E-mail' onChangeText={(text) => setEmail(text)} />

                <Input label='Password' placeholder='Password' secureTextEntry={true}  onChangeText={(text) => setPassword(text)} />
                
                <View style={styles.forgot}>
                    <Text style={styles.intextButton}>Forgot</Text>

                    <TouchableOpacity onPress = {() => navigation.navigate('reset_password')}> 
                        <Text style={styles.span}> Password </Text>
                    </TouchableOpacity>
                </View>

                <Button title='Login' onPress={Login} />
    
                <View  style={styles.alternatives}>
                    <RoundButton icon={Images.login.googleIcon} onPress={() => console.log("pressed")} />
                    <RoundButton icon={Images.login.facebookIcon} onPress={() => console.log("pressed")} />
                    <RoundButton icon={Images.login.appleIcon} onPress={() => console.log("pressed")} />

                </View>

                <View style={styles.changePage}>
                    <Text style={styles.intextButton}> Don't have an account? </Text>
                    <TouchableOpacity onPress = {() => navigation.navigate('signup')}> 
                        <Text style={styles.span}>Signup </Text>
                    </TouchableOpacity>
                </View>
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
        // backgroundColor: '#0779E4'
    },
    forgot: {
        flexDirection: 'row',
        marginTop: 5,
    },
    alternatives: {
        width: 150,
        marginVertical: 10,
        // backgroundColor: '#fef',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    changePage: {
        // backgroundColor: '#fef',
        marginTop: 50,
        flexDirection: 'row',
        alignSelf: 'center'
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