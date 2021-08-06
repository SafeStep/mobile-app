import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from "@env"
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
        fetch(API_URL+"/1.0/responsibilities", {method: "GET"}) // TODO some authentication will be required here
        .then(response => console.log(response))
        .catch(error => console.log("failed to load contacts" + error))
        .finally(() => updateLoading(false));
        //setTimeout(() => {updateLoading(false)}, 1000)  // update loading as loading has completed after a second for testing
    }, [])
    
    return (

        <SafeAreaView style={{}}>
            {loading ? <Text>{"Spinny Spinny loader"}</Text> : <LoadedPage />}

        </SafeAreaView>

    )
}

export default App;