import React, { FC } from 'react'
import {Dimensions, View, StyleSheet, Text} from 'react-native'
import {TextInput } from 'react-native-gesture-handler'

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
        // alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        // borderRadius: 10,
        marginVertical: 15,

        // IOS
        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 4},
        // shadowOpacity: 0.5,
        // shadowRadius: 1,

        // // Android
        // elevation: 3,

    },
    label: {
        color: '#7F7F7F',
        fontWeight: 'bold',
        fontSize: 17,
    },
    input: {
        height: 40,
        // padding: 15, 5, 0 5,
        borderBottomWidth: 0.5,
        paddingTop: 10,
        paddingBottom: 0,
        paddingLeft: 5
        // textAlign: 'center'
        //fontWeight: 'bold',
 

    }
})