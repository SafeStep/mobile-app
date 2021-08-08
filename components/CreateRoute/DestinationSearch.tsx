import React, { useState, useEffect, useCallback, useRef } from 'react';
import {  View, Button, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DraggableFlatList, {
    RenderItemParams,
  } from 'react-native-draggable-flatlist';
import { UserGeolocationService } from "../../logic/UserGeolocationService";
import { v4 as uuidv4 } from 'uuid';
import { PhysicalLocation } from '../../types';

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
      }
}

interface destinationInputProps {
    id?: string,
    dragCallback?: any,
    updateCallback: Function
    navigation: any,
    physicalLocation?: PhysicalLocation | null
}

const DestinationInput = ({ dragCallback, id, navigation, updateCallback, physicalLocation}: destinationInputProps) => {

    return (  
        <View style={styles.destinationInputContainer as any} > 
            <View  style={styles.destinationInputWrapper as any}>
                <TouchableOpacity onPress={() => {navigation.navigate("location_search", {inputId: id, updateCallback: updateCallback})}}>
                    <View style={styles.destinationInput as any}>
                        <Text style={{width: "100%"}}>{physicalLocation ? physicalLocation.title : "Search"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity onLongPress={dragCallback} style={styles.dragWrapper as any}>
                <Text>Drag</Text>
            </TouchableOpacity>
        </View>
    );
};

interface DestinationSearchProps {
    navigation: any, 
    markerUpdateCallback: Function,
}

export const DestinationSearch = ({ navigation, markerUpdateCallback }: DestinationSearchProps) => {

    const [currentDestinations, setCurrentDestinations] = useState([] as destinationInputProps[]);
    const currentDestinationsRef = useRef([] as destinationInputProps[]);

    const updateSingleValue = useCallback((inputId: string, newValue: PhysicalLocation) => {
        let newCurrentDestinations = [...currentDestinationsRef.current] as destinationInputProps[];
        // loop through and find the object with the right key then add the changes
        for (let i=0; i <newCurrentDestinations.length; i++) {
            if (newCurrentDestinations[i].id === inputId) {
                newCurrentDestinations[i].physicalLocation = newValue;
                markerUpdateCallback(newCurrentDestinations);
                setCurrentDestinations(newCurrentDestinations);
                return;  // break the loop as the object has been found
            }
        }
    }, [currentDestinationsRef.current]);

    const renderItem = useCallback( ({ item, index, drag, isActive }: RenderItemParams<destinationInputProps>) => {
        return <DestinationInput physicalLocation={item.physicalLocation} updateCallback={updateSingleValue} id={item.id} dragCallback={drag} navigation={navigation} />;
    }, [UserGeolocationService.instance.cachedLocation]);

    const addDestination = useCallback(() => {  // add a new destination input to the screen
        setCurrentDestinations( oldValues => [...oldValues, {updateCallback: updateSingleValue, id:uuidv4(), navigation: navigation}]);
    }, [setCurrentDestinations]);

    useEffect(() => {
        currentDestinationsRef.current = currentDestinations;  // update the ref
        markerUpdateCallback(currentDestinations);
    }, [currentDestinations])

    useEffect(() => {  // add the first input value
            setCurrentDestinations([{updateCallback: updateSingleValue, id:uuidv4(), navigation: navigation, physicalLocation: UserGeolocationService.instance.cachedLocation}]);
    }, []);

    return (  // set preferable heights in second view
        <View> 
            <View style={{flexDirection: "row", minHeight: 50, maxHeight: 150}}>
                <DraggableFlatList 
                    data = { currentDestinations }
                    keyExtractor={(item, index) => `draggable-item-${item.id}`}
                    renderItem = {renderItem}
                    onDragEnd={({ data }) => { setCurrentDestinations(data); markerUpdateCallback(data); }}
                    extraData = { currentDestinations }
                />
            </View>
            <Button title={"Add"} disabled={currentDestinations.length >= 5} onPress={addDestination}></Button>
        </View>
        );
};
