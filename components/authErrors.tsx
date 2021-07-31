import React, { FC } from 'react'
import {Dimensions, Text, View, StyleSheet} from 'react-native'

const {height, width} = Dimensions.get('screen')

interface Props {
    errMessage: string,
}

const AuthError : FC<Props> = ({errMessage}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}> {errMessage} </Text>
        </View>
    )
}

export default AuthError;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: '12%',
        flexDirection: 'column',
        // backgroundColor: 'pink',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 4,
    },
    title: {
        color: 'red',
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: '5%',
    }
})