import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState, useEffect} from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from "@env"
import { EC } from "../types"; 
import Auth from '@aws-amplify/auth';
const styles = require('./styles');

interface contactProps {
    contact: EC;
}

interface allContactProps {
    contacts: EC[];
}

const ContactElement: FC<contactProps> = (props) : JSX.Element => {
    return <>
        <Text>{props.contact.firstName}</Text>
        <Text>{props.contact.email}</Text>
        <Text>{props.contact.responsibilities[0].status}</Text> 
    </>  // safe to use first responsibility because it should be the only responsibility (as shouldnt be able to see other responsibilities of EC)
}

const ContactsList: FC<allContactProps> = (props) : JSX.Element => {  // list of contacts
    return <FlatList
    data={props.contacts}
    renderItem={({item}) => <ContactElement contact={item}/>} 
    keyExtractor={(item) => item.ECID}
    />
}

const LoadedPage: FC<allContactProps> = (props) : JSX.Element => {  // the loaded page    
    return (
    <View> 
        <ContactsList contacts={props.contacts} />
    </View>
    )
}

const App : FC = ( { navigation } : any ) => {

    const [loading, updateLoading] = useState(true);
    const [loadedContacts, updateLoadedContacts] = useState([] as EC[]);

    useEffect(() => {
        Auth.currentAuthenticatedUser().then((currentlyLoggedInUser) => 
        fetch(API_URL+"/1.0/responsibilities?greenid="+currentlyLoggedInUser.attributes.sub, {method: "GET"})) // TODO some authentication will be required here
        .then(response => response.json())  // parse the data into js object (is sync action)
        .then(data => updateLoadedContacts(data))
        .catch(error => console.log("failed to load contacts" + error))
        .finally(() => updateLoading(false));  // loading has finished
        //setTimeout(() => {updateLoading(false)}, 1000)  // update loading as loading has completed after a second for testing
    }, [])
    
    return (

        <SafeAreaView style={{}}>
            {loading ? <Text>{"Spinny Spinny loader"}</Text> : <LoadedPage contacts={loadedContacts} />}

        </SafeAreaView>

    )
}

export default App;