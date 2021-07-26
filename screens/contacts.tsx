import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { useEffect } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Header} from '../components'
import Navigation from '../navigation/first_index';

const styles = require('./styles');

const ContactElement: FC = ({ }) : any => {
    return <Text>{"EXAMPLE CONTACT"}</Text>
}

const ContactsList: FC = ({ }) : any => {  // list of contacts
    return <View></View>
}

const LoadedPage: FC = ({ }) : any => {  // the loaded page
    return (
    <View> 
        <ContactsList />
    </View>
    )
}

const App : FC = ( { navigation } : any ) => {

    const [loading, updateLoading] = useState(true);

    useEffect(() => {
        
        console.warn("Loading Contacts");

        setTimeout(() => {updateLoading(false)}, 1000)  // update loading as loading has completed after a second for testing
    }, [])
    
    return (

        <SafeAreaView style={{}}>
            {loading ? <Text>{"Spinny Spinny loader"}</Text> : <LoadedPage />}

        </SafeAreaView>

    )
}

export default App;