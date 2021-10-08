import React, { FC } from 'react'
import {Dimensions, Text, View, StyleSheet} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const {height, width} = Dimensions.get('screen')

interface Props {
    title: string;
    attributes: any;
}

const DisplayProfile : FC<Props> = (props) => {
    return (
        <View style={styles.container}> 
            <Text style={styles.text}> {props.attributes.email} </Text>
            <Text style={styles.text}> phone </Text>
        </View>
    )
}

export default DisplayProfile;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height * 0.3,
        // justifyContent: 'center',
        // alignSelf: 'flex-end',
        // backgroundColor: '#fff',
    },
    text: {
        width: width,
        textAlignVertical: 'center',

        // textAlign: 'center',
        fontSize: 20,
        color: '#000',
    }
})