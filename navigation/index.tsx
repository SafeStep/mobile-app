import React, {FC, useEffect, useState, useCallback} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import AppStack from './appstack'
import AuthStack from './authstack'

import Amplify, {Auth} from 'aws-amplify';
import awsconfig from '../aws-exports';
// import awsconfig from '../aws_config';

Amplify.configure(awsconfig);

const MainNav: FC = (props) => {

    console.log(props)
    const [user, setUser] = useState<any>(null)

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
 
    // function updateUser(user:any) {
    //     // setUser(user);
    // }

    const updateUser = useCallback((user) => {
        setUser(user);
    }, [user]);

    useEffect(() => {
        checkAuthState()
    }, [])

    return (
        <NavigationContainer>
            {user !== null ? <AppStack updateUser={updateUser} /> : <AuthStack updateUser={updateUser} />}
        </NavigationContainer>
    )
}

export default MainNav;