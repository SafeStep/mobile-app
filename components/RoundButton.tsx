import React, { FC } from 'react'
import {Dimensions, Text, StyleSheet} from 'react-native'
import {TouchableOpacity, Image} from 'react-native'

interface Props {
    icon: any;
    onPress: () => void;
}

const Button : FC<Props> = (props) => {
    return (
     <TouchableOpacity style={styles.container} onPress={props.onPress}> 
        <Image style={styles.stretch} source={props.icon} />
     </TouchableOpacity>
    )
}

export default Button;

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        borderWidth: 0.3,
    },
    stretch: {
        width: 25,
        height: 25,
        borderRadius: 10,
    }
})