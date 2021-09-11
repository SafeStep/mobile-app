import React, {FC} from 'react'
import { Button, Text } from "react-native"
import {createStackNavigator} from '@react-navigation/stack'
import {MapScreen, Contacts, LocationSearchScreen, LocationPermCheckScreen, OnRouteScreen } from '../screens/index';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddContactScreen from '../screens/AddContactScreen';

const {Navigator, Screen} = createStackNavigator();

const AppStack : FC = () => {
    // console.log([props]);
    
    return (
        
        <Navigator screenOptions={{headerShown: false}}>

            <Screen name="location_perm_check" component={LocationPermCheckScreen} />
            <Screen name='map' component={MapScreen} />
            <Screen name="on_route" component={OnRouteScreen}/>
            <Screen name='contacts' component={Contacts} options={contactsOptions} />
            <Screen name="location_search" component={LocationSearchScreen} />
            <Screen name="add_contact" component={AddContactScreen} options={{ headerShown: true, title: 'New Emergency Contact'}} />
            
            
        </Navigator>
    )
}

const contactsOptions = ({route, navigation}:any) => ({ headerShown: true, title: 'Emergency Contacts', headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("add_contact")}> 
        <Text>
            { "New" }
        </Text>
    </TouchableOpacity>)})

export default AppStack;