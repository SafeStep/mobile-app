import React, { FC } from 'react'
import {Dimensions, View, StyleSheet, Text} from 'react-native'
import {TextInput } from 'react-native-gesture-handler'
import ColorPalette from '../constants/ColorPalette'
const {height, width} = Dimensions.get('screen')

interface Props {
    label: string,
    placeholder: string,
    onChangeText: (text:string) => void,
    secureTextEntry?: boolean;

}

const Input : FC<Props> = (props) => {
    return (
    <View style={styles.container}> 
        <Text style={styles.label}> {props.label} </Text>
        <TextInput style={styles.input} placeholderTextColor='#808080' placeholder={props.placeholder} onChangeText={props.onChangeText} secureTextEntry={props.secureTextEntry || false} />
    </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    container: {
        width: width * 0.8,
        justifyContent: 'center',
        backgroundColor: ColorPalette.white,
        marginVertical: 15,

    },
    label: {
        color: ColorPalette.fontDarkGrey,
        fontWeight: 'bold',
        fontSize: 17,
    },
    input: {
        height: 40,
        borderBottomWidth: 0.5,
        paddingTop: 10,
        paddingBottom: 0,
        paddingLeft: 5
    }
})