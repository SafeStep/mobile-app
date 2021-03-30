import React, {FC} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {map, temphome2} from '../screens'

const {Navigator, Screen} = createStackNavigator();

const AppStack : FC = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='temp' component={map} />
            <Screen name='temp2' component={temphome2} />

        </Navigator>
    )
}

export default AppStack;