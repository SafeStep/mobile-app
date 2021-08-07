import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState, useEffect, useCallback} from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from "@env"
import { EC } from "../types"; 
import Auth from '@aws-amplify/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
const styles = require('./styles');

const deleteEC = (ECID: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

const showDeleteAlert = (EC: EC): Promise<void> => {
    return new Promise((resolve, reject) => {
        Alert.alert(
            `Are you sure you want to remove ${EC.firstName}?`,
            `This will remove ${EC.firstName} as an emergency contact for your account, and they will no longer be notified `+
            `in the event of you leaving your generated route.`,
            [
                {
                    text: "Yes",
                    onPress: () => {
                        try {      
                            deleteEC(EC.ECID)  // dont wait for this to happen, let the request happen in the background
                        }
                        catch (err) {
                            console.log(err); // dont throw exception, just log issue
                        }
                        resolve();
                    },
                  },
                  {
                    text: "No",  // do nothing just close dialog
                    onPress: () => {
                        reject();
                    }
                  },
            ],
            {
              cancelable: true,
              onDismiss: () => {
                  reject();
              }
            }
          );
    })
}
    // return promise then resolve the promise if it is deleted so you know whether to delete the user or not from the local list    
  

interface contactProps {
    contact: EC;
    removeContactCallback: CallableFunction;
}

interface allContactProps {
    contacts: EC[];
    removeContactCallback: CallableFunction;
}

const ContactElement: FC<contactProps> = (props) : JSX.Element => {
    return <>
        <Text>{props.contact.firstName}</Text>
        <Text>{props.contact.email}</Text>
        <Text>{props.contact.responsibilities[0].status}</Text> 
        <TouchableOpacity 
        onPress={() => {
                showDeleteAlert(props.contact)  // ask the user for confirmation
                .then(() => {props.removeContactCallback(props.contact)})  // remove the contact
                .catch();  // the user does not want to delete the contact
            }
        }>
            <Text>Delete</Text>
        </TouchableOpacity>
    </>  // safe to use first responsibility because it should be the only responsibility (as shouldnt be able to see other responsibilities of EC)
}

const ContactsList: FC<allContactProps> = (props) : JSX.Element => {  // list of contacts
    return <FlatList
    data={props.contacts}
    renderItem={({item}) => <ContactElement contact={item} removeContactCallback={props.removeContactCallback}/>} 
    keyExtractor={(item) => item.ECID}
    />
}

const LoadedPage: FC<allContactProps> = (props) : JSX.Element => {  // the loaded page    
    return (
    <View> 
        <ContactsList contacts={props.contacts} removeContactCallback={props.removeContactCallback} />
    </View>
    )
}

const App : FC = ( { navigation } : any ) => {

    const [loading, updateLoading] = useState(true);
    const [loadedContacts, setLoadedContacts] = useState([] as EC[]);

    const removeContact = useCallback(
        (contactToDelete) => {
            console.log(contactToDelete);
            const contactIndex = loadedContacts.findIndex(contact => contact.ECID === contactToDelete.ECID);  // find the index of the user
            if (contactIndex > -1) {  // if the user is in the array
                const loadedContactsWithoutUser = [...loadedContacts];  // clone the array
                loadedContactsWithoutUser.splice(contactIndex, 1);  // remove the contact from the array
                setLoadedContacts(loadedContactsWithoutUser);  // update the loaded contacts (saves a call to the server)
            }
        },
        [loadedContacts],  // recache this function whenever loadedContacts changes
    )

    useEffect(() => {
        Auth.currentAuthenticatedUser().then((currentlyLoggedInUser) => 
        fetch(API_URL+"/1.0/responsibilities?greenid="+currentlyLoggedInUser.attributes.sub, {method: "GET"})) // TODO some authentication will be required here
        .then(response => response.json())  // parse the data into js object (is sync action)
        .then(data => setLoadedContacts(data))
        .catch(error => console.log("failed to load contacts" + error))
        .finally(() => updateLoading(false));  // loading has finished
        //setTimeout(() => {updateLoading(false)}, 1000)  // update loading as loading has completed after a second for testing
    }, [])
    
    return (

        <SafeAreaView style={{}}>
            {loading ? <Text>{"Spinny Spinny loader"}</Text> : <LoadedPage contacts={loadedContacts} removeContactCallback={removeContact} />}
        </SafeAreaView>

    )
}

export default App;