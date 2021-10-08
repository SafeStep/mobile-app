import React, {FC, useState, useEffect} from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {Input, Button, Header, AuthError, DisplayProfile} from '../components'
import { Auth } from 'aws-amplify';
import ColorPalette from '../constants/ColorPalette';
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

        <SafeAreaView style={styles.container}>

            { loading 
            ? <ActivityIndicator size="large" color={ColorPalette.mainBlue} />
            : <DisplayProfile title='Profile' attributes={userAttributes} />
            }
        
            <Button title="Attr" onPress={updateProfile} />

        </SafeAreaView>

    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorPalette.white
    },
})