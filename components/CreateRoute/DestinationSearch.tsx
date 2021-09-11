import React from 'react';
import {  View, Button, Text, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
    RenderItemParams,
  } from 'react-native-draggable-flatlist';
import 'react-native-get-random-values';
import { PhysicalLocation } from '../../types';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import {max_waypoints as MAX_WAYPOINTS} from "../../configuration.json"

const styles = {
    destinationInputContainer: {
        width: '90%',
        height: 50,
        
        backgroundColor: '#fff',
        borderRadius: 10,
    
        marginBottom: '2.5%',
        marginHorizontal: '5%',

        // IOS
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 3,
        position: "relative",
        flexDirection: "row",
      },
      destinationInput: {
          paddingLeft: 10,
          paddingTop: 0,
          flexDirection: "column",
          justifyContent: "center",
          height: "90%"
      },

      destinationInputWrapper: {
        flexDirection: "column", 
        justifyContent: "center", 
        flex: 1,
        marginRight: 10,
        height: "100%"
      },
      
      dragWrapper: {
        justifyContent: "center", 
        height: "90%"
      },

      deleteWrapper: {
        justifyContent: "center", 
        height: "90%"
      }
}

interface destinationInputProps {
    id?: string,
    dragCallback?: any,
    updateCallback: Function,
    deleteCallback: Function,
    navigation: any,
    waypoint: Waypoint
}

const DestinationInput = ({ dragCallback, id, navigation, updateCallback, deleteCallback, waypoint}: destinationInputProps) => {
    return (  
        <View style={styles.destinationInputContainer as any} > 
            <View  style={styles.destinationInputWrapper as any}>
                <TouchableOpacity onPress={() => {navigation.navigate("location_search", {inputId: id, updateCallback: updateCallback})}}>
                    <View style={styles.destinationInput as any}>
                        <Text style={{width: "100%"}}>{waypoint.point ? waypoint.point.title : "Search"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity onLongPress={dragCallback} style={styles.dragWrapper as any}>
                <Text>Drag</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {deleteCallback(waypoint.id)}} style={styles.deleteWrapper as any}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

interface DestinationSearchProps {
    navigation: any, 
    waypointUpdateCallback: Function,
    waypointDeleteCallback: Function,
    waypoints: Waypoint[]
}

export const DestinationSearch = ({ navigation, waypointUpdateCallback, waypoints, waypointDeleteCallback }: DestinationSearchProps) => {
    
    const updateSingleValue = (inputId: string, newValue: PhysicalLocation) => {  // update the value of a marker e.g. marker a is now tescos, not lidl
        console.log(inputId);
        let waypointCopy = [...waypoints]
        // loop through and find the object with the right key then add the changes
        for (let i=0; i < waypointCopy.length; i++) {
            if (waypointCopy[i].id === inputId) {
                waypointCopy[i].point = newValue;
                waypointUpdateCallback(waypointCopy);
                return;  // break the loop as the object has been found
            }
        }
    }

    const renderItem = ({ item, index, drag, isActive }: RenderItemParams<Waypoint>) => {
        return <DestinationInput waypoint={item} updateCallback={updateSingleValue} deleteCallback={waypointDeleteCallback} id={item.id} dragCallback={drag} navigation={navigation} />;
    };

    const addDestination = () => {
        waypointUpdateCallback([...waypoints, {id: uuidv4(), point: null}]);
    }

    return (  // set preferable heights in second view
        <View> 
            <View style={{flexDirection: "row", minHeight: 50, maxHeight: 150}}>
                <DraggableFlatList 
                    data = { waypoints }
                    keyExtractor={(item, index) => item.id}
                    renderItem = {renderItem}
                    onDragEnd={({ data }) => { waypointUpdateCallback(data); }}
                />
            </View>
            <Button title={"Add"} disabled={waypoints.length >= MAX_WAYPOINTS} onPress={addDestination}></Button>
        </View>
        );
};

export default DestinationSearch;