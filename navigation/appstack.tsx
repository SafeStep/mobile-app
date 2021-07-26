import React, {FC} from 'react'
import {createStackNavigator} from '@react-navigation/stack'


import {MapScreen, Contacts, LocationSearchScreen} from '../screens/Index'

const {Navigator, Screen} = createStackNavigator();

const AppStack : FC = (props:any) => {
    // console.log([props]);
    
    return (
        
        <Navigator screenOptions={{headerShown: false}}>

            <Screen name='map' component={MapScreen} initialParams={{ updateUser: props.updateUser }}  />
            <Screen name='contacts' component={Contacts} options={{headerShown: true, title: 'Contacts' }} />
            <Screen name="location_search" component={LocationSearchScreen} />
        </Navigator>
    )
}

export default AppStack;