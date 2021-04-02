import React, { useState, useEffect, useCallback } from 'react';
import { TextInput, View, Button, Text} from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DraggableFlatList, {
    RenderItemParams,
  } from 'react-native-draggable-flatlist';

import { v4 as uuidv4 } from 'uuid';

const axios = require('axios');

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
    _currentTextValue?: string,
    _latLong?: number[],
    id?: string,
    dragCallback?: any,
    updateCallback: any
}

interface destinationResult {
    lat: number,
    long: number,
    distance: number,
    title: string,
}

const DestinationInput = ({ _currentTextValue, _latLong, dragCallback, id, updateCallback}: destinationInputProps) => {

    const [currentText, setCurrentText] = useState(_currentTextValue as string);
    const [latLong, setLatLong] = useState(_latLong as number[] | null);
    const [inputId, setInputid] = useState(id as string);
    const [searchResults, setSearchResults] = useState([] as destinationResult[]);

    const updateValue = (newValue: string) => {
        setCurrentText(newValue);  // update the value stored in the state
        updateCallback(inputId, newValue);
    }

    return (  // had to put flexDirection in new js object for some reason typescript wasnt happy
        <View style={styles.topContainer as any}>
            <View style={styles.destinationInputContainer as any} > 
                <TextInput style={styles.destinationInput} value={currentText} placeholderTextColor='#000' placeholder='Destinations' onChangeText={(currentInput) =>  updateValue(currentInput)} />
                <TouchableOpacity onLongPress={dragCallback} style={{flexDirection: "column", justifyContent: "center", flex: 1}}>
                    <Text>Drag</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.searchResults as any} >
                <Text>Option1</Text>
                <Text>Option2</Text>
                <Text>Option3</Text>
            </ScrollView>
        </View>
    );
};

export class DestinationSearch extends React.Component {
    state: {currentDestinations: destinationInputProps[]}  // specify the type for the props
    constructor(props: any) {
        super(props);
        this.updateSingleValue = this.updateSingleValue.bind(this);
        this.setCurrentDestinations = this.setCurrentDestinations.bind(this);
        this.addDestination = this.addDestination.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.state = {currentDestinations: [{updateCallback:this.updateSingleValue, _currentTextValue: "test", _latLong:[10,10], id:uuidv4()}]}
    }

    setCurrentDestinations(newDestinations: destinationInputProps[]) {
        this.setState({currentDestinations: newDestinations});  // update the state
    }

    addDestination() {  // add a new destination input to the screen
        this.setState({currentDestinations: [...this.state.currentDestinations, {id:uuidv4(), updateCallback:this.updateSingleValue}]});
    }

    updateSingleValue(inputId: string, newValue: string) {
        // loop through and find the object with the right key then add the changes
        for (let i=0; i <this.state.currentDestinations.length; i++) {
            if (this.state.currentDestinations[i].id === inputId) {
                this.state.currentDestinations[i]._currentTextValue = newValue;
                this.forceUpdate();  // force an update of the components
            }
        }
    }

    renderItem({ item, index, drag, isActive }: RenderItemParams<destinationInputProps>) {
        return <DestinationInput updateCallback={this.updateSingleValue} _currentTextValue={item._currentTextValue} id={item.id} dragCallback={drag} />
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

