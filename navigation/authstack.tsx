import React, {FC} from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {SignUp, Login, ConfirmCode, LoadingScreen, ResetPassword} from '../screens/index'

const {Navigator, Screen} = createStackNavigator();

const AuthStack : FC = (props:any) => {

    return (
        <Navigator screenOptions={{headerShown: false}}>

            
            <Screen name='loading' component={LoadingScreen} initialParams={{ updateUser: props.updateUser }} />
            <Screen name='login' component={Login} initialParams={{ updateUser: props.updateUser }} />
            <Screen name='signup' component={SignUp} />
            <Screen name='confirm_code' component={ConfirmCode} />
            <Screen name='reset_password' component={ResetPassword} />

        </Navigator>
    )
}

export default AuthStack;