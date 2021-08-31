import React, {FC, useState, useEffect, useRef, useCallback} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mbxClient from "@mapbox/mapbox-sdk";
import mbxDirections from "@mapbox/mapbox-sdk/services/directions";
import polyline from "@mapbox/polyline";
import { UserGeolocationService } from "../logic/UserGeolocationService";
import * as config from "../configuration.json";

const MAPBOX_KEY = config.mapbox_key

const baseClient = mbxClient({ accessToken: MAPBOX_KEY });
const directionsClient = mbxDirections(baseClient);

import {Map, DestinationSearch} from '../components'

import { PhysicalLocation } from '../types';

let styles = require('./styles');

styles = {...styles,
  mapContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "white",
  },
  map: {
      width: '100%',
      flex: 1,
      backgroundColor: '#eee',
  },
  mapBottomNav: {
      position: "absolute",
      bottom: 30,
      width: '100%',
      height: '10%',
      flexDirection: 'row',
      justifyContent: "space-evenly",
      alignSelf: "center"
  },
  mapBottomNavButtons: {
      width: 150,
      height: 40,
      backgroundColor: '#fff',

      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 5,

      flexDirection: "column",
      justifyContent: "center"
  },
  mapBottomNavText: {
      alignSelf: 'center',
  },
  mapTopNav: {
      width: '100%',
      backgroundColor: '#fff',
  },
  goButton: {
      width: 150,
      height: 40,
      backgroundColor: '#90E4FF',
      borderRadius: 50,

      position: "absolute",
      alignSelf: "center",
      bottom: 120,
      flexDirection: "column",
      justifyContent:"center",

      // IOS
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 4,
  },
  goButtonText: {
      fontSize: 18,
      alignSelf: 'center',
  },
}

interface coordinatesObject {
  coordinates: number[]
}

const getRoute = (wayPoints: coordinatesObject[]): Promise<number[][]> => {
    return new Promise((resolve, reject) => {
      directionsClient.getDirections({
        profile: 'walking',
        overview: "full",
        waypoints: wayPoints
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

import {Auth} from 'aws-amplify';

const App : FC = ( { navigation, route } : any ) => {


  async function LogOut() {
    try {
        await Auth.signOut();
        // updateAuthState('loggedOut');
        // props.updateUser(null);
        route.params.updateUser(null)
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

    const [path, setPath] = useState([] as number[][]);
    const [markers, setMarkers] = useState([] as PhysicalLocation[]);  // store list of markers

    useEffect(() => {  // need to get the users location here too
      if (UserGeolocationService.instance.cachedLocation === null) {
        console.warn("Cant create path as no user location available");
        UserGeolocationService.instance.getLocation();  // bypass the 30 second timer
        return;
      }      
      let waypoints = [UserGeolocationService.instance.cachedLocation, ...markers]  // append the user location to the start of the array

      let latLongs = [] as coordinatesObject[];

      waypoints.forEach(element => {  // convert to lat longs instead of physicalLocations
        if (!element || !element.long) {
          return;  // skip this current element as it is empty
        }
        latLongs.push({ coordinates: [element.long, element.lat]});
      });

      if (latLongs.length < 2) {
        setPath([]);
        return;  // not enough waypoints to create a path
      }

      getRoute(latLongs).then((_path: number[][]) => {
        setPath(_path);
        }).catch((error: any) => {
        console.warn(error);
        });

      // get the users current location and add it to the start of the list then generate the path and set it as the path variable

    }, [markers]) // run whenever markers is updated

    const markersUpdate=useCallback((positions: any[])=>{
      let toUpdate = [] as PhysicalLocation[];

      positions.forEach(element => {
        if (element.physicalLocation !== undefined) toUpdate.push(element.physicalLocation);  // will be null if search has not been fulfilled
      });
      setMarkers(toUpdate);
   }, [])

   const startJourney= useCallback(() => {
     try {
       UserGeolocationService.instance.stopForegroundWatch(); // if throws an error something is really wrong 
     }
     catch {
      console.log("Foreground watch not defined in foreground mode :(")
     }
     UserGeolocationService.instance.startPathTracking(path); 
     navigation.navigate("on_route", {
       path: path
     });
   }, [path])

    return (
        <SafeAreaView style={styles.mapContainer} edges={['right', "top", 'left']}>
            <View style={styles.mapTopNav}>
              <DestinationSearch markerUpdateCallback={markersUpdate} navigation={navigation}/>
            </View>
            <View style={styles.map}>
                {<Map path={path} markers={markers} /> }
                
                <TouchableOpacity style={styles.goButton} onPress={() => {startJourney()}}>
                    <Text style={styles.goButtonText}> Go </Text>
                </TouchableOpacity>

                <View style={styles.mapBottomNav}>

                    <TouchableOpacity onPress={LogOut} style={styles.mapBottomNavButtons}>
                        <Text style={styles.mapBottomNavText}> Logout </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mapBottomNavButtons} onPress={() => navigation.navigate('contacts')}>
                        <Text style={styles.mapBottomNavText}> Contacts </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default App;