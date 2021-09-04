import React, {FC} from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {SignUp, Login, ConfirmCode, LoadingScreen, ResetPassword, ResetPasswordConfirm} from '../screens/index'

const {Navigator, Screen} = createStackNavigator();

const AuthStack : FC = () => {

    return (
        <Navigator screenOptions={{headerShown: false}}>

            
            {/* <Screen name='loading' component={LoadingScreen} /> */}
            <Screen name='login' component={Login} />
            <Screen name='signup' component={SignUp} />
            <Screen name='confirm_code' component={ConfirmCode} />
            <Screen name='reset_password' component={ResetPassword} />
            <Screen name='reset_password_confirm' component={ResetPasswordConfirm} />

        </Navigator>
    )
}

export default AuthStack;