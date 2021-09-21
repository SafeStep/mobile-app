import React, {FC} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Auth} from 'aws-amplify';

const App : FC = ( ) => {
    const LogOut = async () => {
        await Auth.signOut()
        .catch((err) => console.log("Error Siging Out:", err));
    }
    return (
        <View style={styles.container}> 
            <Text>Profile</Text>
            <TouchableOpacity onPress={LogOut} >
                        <Text> Logout </Text>
            </TouchableOpacity>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})