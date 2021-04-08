import React, {FC} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {SignUp, Login, ConfirmCode} from '../screens'

const {Navigator, Screen} = createStackNavigator();

const AuthStack : FC = (props:any) => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='login' component={Login} initialParams={{ updateUser: props.updateUser }}/>
            <Screen name='signup' component={SignUp} />
            <Screen name='confirm_code' component={ConfirmCode} />

        </Navigator>
    )
}

export default AuthStack;