import React, {FC, useState, useEffect} from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import {Input, Button, Header, AuthError, DisplayProfile} from '../components'
import { Auth } from 'aws-amplify';

const App : FC = ({ navigation, route } : any ) => {

    const [loading, updateLoading] = useState(true);
    const [userAttributes, setAttributes] = useState<any>(null)
    const [errorMessage, setErrorMessage] = useState<string>("");

    function updateProfile() {
        console.log( userAttributes );    
    }


    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then((currentlyLoggedInUser) => setAttributes(currentlyLoggedInUser.attributes))
        .catch(error => console.log("err" + error))
        .finally(() => updateLoading(false));  

    }, [])
    
    return (

        <SafeAreaView style={{}}>
            <Header title="Profile" onBackPress={navigation.navigate("map")}/>

            {loading ? <Text>{"loader go vroom"}</Text> : <DisplayProfile title='Profile' attributes={userAttributes} />}
        
            <Button title="Attr" onPress={updateProfile} />

        </SafeAreaView>

    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '40%'
    },
})