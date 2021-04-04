import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import { TextInput, View, Button, Text} from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DraggableFlatList, {
    RenderItemParams,
  } from 'react-native-draggable-flatlist';

import { v4 as uuidv4 } from 'uuid';
import { useLinkProps } from '@react-navigation/native';
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
    physicalLocation?: PhysicalLocation
}

const DestinationInput = ({ physicalLocation, dragCallback, id, navigation, updateCallback}: destinationInputProps) => {

    const [inputId, setInputid] = useState(id as string);

    return (  
        <View style={styles.destinationInputContainer as any} > 
            <View  style={styles.destinationInputWrapper as any}>
                <TouchableOpacity onPress={() => {navigation.navigate("location_search", {inputId: inputId, updateCallback: updateCallback})}}>
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

export class DestinationSearch extends React.Component {
    state: { markerUpdateCallback: Function, currentDestinations: destinationInputProps[], navigation: any}  // specify the type for the props
    constructor({ navigation, markerUpdateCallback } :any) {
        super({ navigation, markerUpdateCallback });
        this.updateSingleValue = this.updateSingleValue.bind(this);
        this.setCurrentDestinations = this.setCurrentDestinations.bind(this);
        this.addDestination = this.addDestination.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.state = { markerUpdateCallback: markerUpdateCallback, navigation: navigation, currentDestinations: [{updateCallback: this.updateSingleValue, id:uuidv4(), navigation: navigation}]}
    }

    setCurrentDestinations(newDestinations: destinationInputProps[]) {
        this.setState({markerUpdateCallback: this.state.markerUpdateCallback, currentDestinations: newDestinations, navigation: this.state.navigation});  // update the state
        this.state.markerUpdateCallback(this.state.currentDestinations);  // update the states of the markers in the parent component
    }

    addDestination() {  // add a new destination input to the screen
        this.setState({markerUpdateCallback: this.state.markerUpdateCallback, navigation: this.state.navigation, currentDestinations: [...this.state.currentDestinations, {id:uuidv4()}]});
        this.state.markerUpdateCallback(this.state.currentDestinations);  // update the states of the markers in the parent component
    }

    updateSingleValue(inputId: string, newValue: PhysicalLocation) {
        let currentDestinations = [...this.state.currentDestinations];
        // loop through and find the object with the right key then add the changes
        for (let i=0; i <this.state.currentDestinations.length; i++) {
            if (currentDestinations[i].id === inputId) {
                currentDestinations[i].physicalLocation = newValue;
                this.setState({markerUpdateCallback: this.state.markerUpdateCallback,currentDestinations: currentDestinations, navigation: this.state.navigation});
                this.state.markerUpdateCallback(this.state.currentDestinations);
            }
        }
    }

    renderItem({ item, index, drag, isActive }: RenderItemParams<destinationInputProps>) {
        return <DestinationInput physicalLocation={item.physicalLocation} updateCallback={this.updateSingleValue} id={item.id} dragCallback={drag} navigation={this.state.navigation} />
    }

    render() {
        return (
        <View>
            <ScrollView style={{maxHeight: 220}}>
                <DraggableFlatList 
                    data = { this.state.currentDestinations }
                    keyExtractor={(item, index) => `draggable-item-${item.id}`}
                    renderItem = {this.renderItem}
                    onDragEnd={({ data }) => { this.setCurrentDestinations(data)}}
                    extraData = { this.state.currentDestinations }
                />
            </ScrollView>
            <Button title={"Add"} disabled={this.state.currentDestinations.length >= 5} onPress={this.addDestination}></Button>
        </View>
        );
    }
}

