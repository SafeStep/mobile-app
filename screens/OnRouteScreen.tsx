import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnRouteMap } from '../components'
import { UserGeolocationService } from "../logic/UserGeolocationService";

let styles = {
    mapContainer: {
        flex: 1
    },
    map: {
        flex: 1
    }
}
const App : FC = ( { route, navigation } : any ) => {

    const endJourney = () => {
        navigation.navigate('map')
        try {
            UserGeolocationService.instance.stopBackgroundWatch()
        }
        catch (err){
            console.error(err)
        }
        UserGeolocationService.instance.startForegroundWatch()
    }

    return (
        <SafeAreaView style={styles.mapContainer} edges={['right', "top", 'left']}>
            <View style={styles.map}>
                {<OnRouteMap path={route.params.path} /> }
                
                <TouchableOpacity onPress={endJourney}>
                    <Text> End </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default App;