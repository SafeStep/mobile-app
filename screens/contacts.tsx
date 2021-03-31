import { useLinkProps } from '@react-navigation/native';
import React, {FC, useState} from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Header} from '../components'
import Navigation from '../navigation/first_index';

const styles = require('./styles');

const App : FC = (props ) => {

    return (

        <SafeAreaView style={styles.mapContainer}>

        </SafeAreaView>

    )
}

export default App;