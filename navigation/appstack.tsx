import React, {FC} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Maps, Contacts} from '../screens'

const {Navigator, Screen} = createStackNavigator();

const AppStack : FC = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='map' component={Maps} />
            <Screen name='contacts' component={Contacts} options={{headerShown: true, title: 'Contacts' }} />

        </Navigator>
    )
}

export default AppStack;