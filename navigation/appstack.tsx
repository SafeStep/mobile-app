import React, {FC} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Maps, Contacts} from '../screens'

const {Navigator, Screen} = createStackNavigator();

const AppStack : FC = (props:any) => {
    // console.log([props]);
    
    return (
        
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='map' component={Maps} initialParams={{ updateUser: props.updateUser }}  />
            <Screen name='contacts' component={Contacts} options={{headerShown: true, title: 'Contacts' }} />

        </Navigator>
    )
}

export default AppStack;