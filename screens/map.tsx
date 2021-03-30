import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState, useEffect} from 'react';
import { TextInput, View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import mbxClient from "@mapbox/mapbox-sdk";
import mbxDirections from "@mapbox/mapbox-sdk/services/directions";
import polyline from "@mapbox/polyline";

import {MAPBOX_KEY} from "@env"

const baseClient = mbxClient({ accessToken: MAPBOX_KEY });
const directionsClient = mbxDirections(baseClient);
import { Map } from "../components/Map";

const styles = require('./styles');


const getRoute = (wayPoints: number[][]): Promise<number[][]> => {
    return new Promise((resolve, reject) => {
      directionsClient.getDirections({
        profile: 'walking',
        overview: "full",
        waypoints: [  // TODO make this actually work with different routes
          {
            coordinates: [-1.213787, 52.771881],  // in order of lat long (East, North)
          },
          {
            coordinates: [-1.2321, 52.7651],
          },
          // {
          //   coordinates: [13.4194, 52.5072],
          // }
        ]
      }).send()
      .then((response: any) => {
        const directions = response.body;
        return resolve(polyline.decode(directions.routes[0].geometry));
      })
      .catch((error: string) => {
        reject(error)
      });
    })
  }

const App : FC = ( { navigation } : any ) => {

    const [path, setPath] = useState([] as number[][]);

    useEffect(() => {
        getRoute([[-1.213787, 52.771881], [-1.2321, 52.7651]]).then((_path: number[][]) => {
        setPath(_path);
        }).catch((error: any) => {
        console.warn(error);
        });
    }, []);  // run like component did mount

    return (

        <SafeAreaView style={styles.mapContainer}>

            <View style={styles.map}>
                <Map path={path}/>
                <View style={styles.mapTopNav}>
                    <TouchableOpacity style={styles.mapTopNavButtons}>
                        <Text style={styles.mapTopNavText}> Recent </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mapTopNavButtons} onPress={() => navigation.navigate('contacts')}>
                        <Text style={styles.mapTopNavText}> Contacts </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.mapFooter}>
                <View style={styles.destinationContainer}> 
                    <TextInput style={styles.destinationInput} placeholderTextColor='#000' placeholder='Destinations' onChangeText={() => console.log('change')} />
                </View>

                <TouchableOpacity style={styles.goButton}>
                    <Text style={styles.goButtonText}> Go </Text>
                </TouchableOpacity>


            </View>
        </SafeAreaView>

    )
}

export default App;