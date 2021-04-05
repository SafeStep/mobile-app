import React, {FC, useState, useEffect, useRef, useCallback} from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mbxClient from "@mapbox/mapbox-sdk";
import mbxDirections from "@mapbox/mapbox-sdk/services/directions";
import polyline from "@mapbox/polyline";

import Geolocation from 'react-native-geolocation-service';

import { MAPBOX_KEY } from "@env"

const baseClient = mbxClient({ accessToken: MAPBOX_KEY });
const directionsClient = mbxDirections(baseClient);

import { Map } from "../components/Map";
import { DestinationSearch } from "../components/CreateRoute/DestinationSearch";
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
  console.log(wayPoints);
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

const App : FC = ( { navigation } : any ) => {

    const [path, setPath] = useState([] as number[][]);
    const [markers, setMarkers] = useState([] as PhysicalLocation[]);  // store list of markers
    const [locationSetting, setLocationSetting] = useState("denied");
    const [userLocation, setUserLocation] = useState(null as PhysicalLocation | null);

    useEffect(() => {
      Geolocation.requestAuthorization("always").then((result) => {
        setLocationSetting(result);
        if (result !== "granted") {
          alert("Allow Always is required");
        }
        else {
          Geolocation.getCurrentPosition((position) => {setUserLocation({title: "Current Location", long: position.coords.longitude, lat: position.coords.latitude})}, () => { alert("SafeStep can't access your location currently! Please make sure that the app has access in your settings") }
          , {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000});
        }
      });
      // getRoute([[-1.213787, 52.771881], [-1.2321, 52.7651]]).then((_path: number[][]) => {
      // setPath(_path);
      // }).catch((error: any) => {
      // console.warn(error);
      // });
    }, []);  // run like component did mount

    useEffect(() => {  // need to get the users location here too
      if (userLocation === null) {
        console.warn("Cant create path as no user location available");
        return;
      }      
      let waypoints = [userLocation, ...markers]  // append the user location to the start of the array

      let latLongs = [] as coordinatesObject[];

      waypoints.forEach(element => {  // convert to lat longs instead of physicalLocations
        if (element === undefined) {
          return;  // skip this current element as it is empty
        }
        latLongs.push({ coordinates: [element.long, element.lat]});
      });

      getRoute(latLongs).then((_path: number[][]) => {
        setPath(_path);
        }).catch((error: any) => {
        console.warn(error);
        });

      // get the users current location and add it to the start of the list then generate the path and set it as the path variable

    }, [markers]) // run whenever markers is updated

    const markersUpdate=useCallback((positions: any[])=>{
      let toUpdate = [] as PhysicalLocation[]

      positions.forEach(element => {
        toUpdate.push(element.physicalLocation);  // will be null if search has not been fulfilled
      });
      setMarkers(toUpdate);
   },[markers])

    return (
        <SafeAreaView style={styles.mapContainer} edges={['right', "top", 'left']}>
            <View style={styles.mapTopNav}>
              <DestinationSearch currentLocation={userLocation as any} markerUpdateCallback={markersUpdate} navigation={navigation}/>
            </View>
            <View style={styles.map}>
                <Map path={path} markers={markers} locationSetting={locationSetting} userPosition={userLocation}/>
                
                <TouchableOpacity style={styles.goButton}>
                    <Text style={styles.goButtonText}> Go </Text>
                </TouchableOpacity>

                <View style={styles.mapBottomNav}>
                    <TouchableOpacity style={styles.mapBottomNavButtons}>
                        <Text style={styles.mapBottomNavText}> Recent </Text>
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