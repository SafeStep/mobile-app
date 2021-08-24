import React, { FC } from 'react'
import {Dimensions, Text, StyleSheet} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'

const {height, width} = Dimensions.get('screen')

interface Props {
    title: string;
    onPress: () => void;
}

const Button : FC<Props> = (props) => {
    return (
     <TouchableOpacity style={styles.container} onPress={props.onPress}> 
         <Text style={styles.text}>{props.title}</Text>
     </TouchableOpacity>
    )
}

export default Button;

const styles = StyleSheet.create({
    container: {
        width: width *0.9,
        height: 50,
        backgroundColor: '#0779E4',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,

        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }
})