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
            <View style={styles.attributes}> 
                <Text style={styles.text}> {props.attributes.email} </Text>
                <Text style={styles.text}> phone </Text>

            </View>
            

        </View>
    )
}

export default DisplayProfile;

const styles = StyleSheet.create({
    container: {
        top: 0, 
        width: width,
        height: height * 0.3,
        // justifyContent: 'center',
        alignSelf: 'flex-end',
        // backgroundColor: '#fff',
        // overflow: 'hidden'
    },
    attributes: {
        width: width,
        height: width,
        // alignSelf: 'center',
        marginTop: 20,
        backgroundColor: "white",
    },
    text: {
        width: width,
        height: '100%',
        textAlignVertical: 'center',

        // textAlign: 'center',
        fontSize: 20,
        color: '#000',
    }
})