import React, {FC, useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import AppStack from './appstack'
import AuthStack from './authstack'

const MainNav: FC = () => {
    const [user, setUser] = useState<any>(null)
    console.log('hi');
    const launch = () => {
        //authentication here
        // if (user_) {
        //     setUser(user_);
        //     console.log('hi');
            
        // }
        setUser(true)
    }

    useEffect(() => {
        launch()
    }, [])

    return (
        <NavigationContainer>
            {user !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default MainNav;