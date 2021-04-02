import React, {FC, useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import AppStack from './appstack'
import AuthStack from './authstack'

import Amplify, {Auth} from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);

const MainNav: FC = () => {
    const [user, setUser] = useState<any>(null)

    // const launch = () => {
    //     try {
    //         let user =  Auth.currentAuthenticatedUser()
    //         setUser(user)
    //       } catch {
    //         setUser(null)
    //       }
    // }
    async function checkAuthState() {
            try {
              await Auth.currentAuthenticatedUser();
              console.log(' User is signed in');
              setUser(true);
            } catch (err) {
              console.log(' User is not signed in');
              setUser(null);
            }
    }
    

    interface updateUser {
        (text:any): void,
    
    }
    function updateUser(user:any) {
        setUser(user);
    }

    useEffect(() => {
        checkAuthState()
    }, [])

    return (
        <NavigationContainer>
            {user !== null ? <AppStack {...updateUser} /> : <AuthStack {...updateUser}/>}
        </NavigationContainer>
    )
}

export default MainNav;