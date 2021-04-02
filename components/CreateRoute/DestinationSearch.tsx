import React, { useState, useEffect, useCallback } from 'react';
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
      },

      destinationInputWrapper: {
        flexDirection: "column", 
        justifyContent: "center", 
        flex: 1,
      },
      searchResults: {
          position: "absolute",
          top: 50,
          zIndex: 1,
          elevation: 5,
      },
      topContainer: {
          position: "relative",
          overflow: "visible"
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

    console.log(physicalLocation);

    return (  // had to put flexDirection in new js object for some reason typescript wasnt happy
        <View style={styles.topContainer as any}>
            <View style={styles.destinationInputContainer as any} > 
                <TouchableOpacity style={styles.destinationInputWrapper as any} onPress={() => {navigation.navigate("location_search", {inputId: inputId, updateCallback: updateCallback})}}>
                    <Text style={styles.destinationInput}>{physicalLocation ? physicalLocation.title : "Search"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onLongPress={dragCallback} style={styles.destinationInputWrapper as any}>
                    <Text>Drag</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export class DestinationSearch extends React.Component {
    state: {currentDestinations: destinationInputProps[], navigation: any}  // specify the type for the props
    constructor({ route, navigation } :any) {
        super({route, navigation});
        this.updateSingleValue = this.updateSingleValue.bind(this);
        this.setCurrentDestinations = this.setCurrentDestinations.bind(this);
        this.addDestination = this.addDestination.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.state = { navigation: navigation, currentDestinations: [{updateCallback: this.updateSingleValue, id:uuidv4(), navigation: navigation}]}
    }

    setCurrentDestinations(newDestinations: destinationInputProps[]) {
        this.setState({currentDestinations: newDestinations});  // update the state
    }

    addDestination() {  // add a new destination input to the screen
        this.setState({currentDestinations: [...this.state.currentDestinations, {id:uuidv4()}]});
    }

    updateSingleValue(inputId: string, newValue: PhysicalLocation) {
        let currentDestinations = [...this.state.currentDestinations];
        // loop through and find the object with the right key then add the changes
        for (let i=0; i <this.state.currentDestinations.length; i++) {
            if (currentDestinations[i].id === inputId) {
                currentDestinations[i].physicalLocation = newValue;
                this.setState({currentDestinations: currentDestinations, navigation: this.state.navigation});
            }
        }
    }

    renderItem({ item, index, drag, isActive }: RenderItemParams<destinationInputProps>) {
        console.log(item);
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
                    onDragEnd={({ data }) => { console.log(this.state.currentDestinations); this.setCurrentDestinations(data)}}
                    extraData = { this.state.currentDestinations }
                />
            </ScrollView>
            <Button title={"Add"} disabled={this.state.currentDestinations.length >= 5} onPress={this.addDestination}></Button>
        </View>
        );
    }
}

