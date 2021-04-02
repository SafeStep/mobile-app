import React, {FC, useState, useEffect} from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mbxClient from "@mapbox/mapbox-sdk";
import mbxDirections from "@mapbox/mapbox-sdk/services/directions";
import polyline from "@mapbox/polyline";

import { MAPBOX_KEY } from "@env"

const baseClient = mbxClient({ accessToken: MAPBOX_KEY });
const directionsClient = mbxDirections(baseClient);

import { Map } from "../components/Map";
import { DestinationSearch } from "../components/CreateRoute/DestinationSearch";

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
        <SafeAreaView style={styles.mapContainer} edges={['right', "top", 'left']}>
            <View style={styles.mapTopNav}>
              <DestinationSearch />
            </View>
            <View style={styles.map}>
                <Map path={path}/>
                
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