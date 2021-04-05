import React, { FC } from 'react'
import {Dimensions, Text, View, StyleSheet} from 'react-native'
import {TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const {height, width} = Dimensions.get('screen')

interface Props {
    title: string,
    onBackPress: () => void,
}

const Header : FC<Props> = (props) => {
    return (
        <SafeAreaView style={styles.headeContainer}> 
            <View style={styles.backButtonContainer}>
                <TouchableOpacity style={styles.backButton} onPress={props.onBackPress}>
                    <Text style={styles.backButtonText}> Back </Text>
                </TouchableOpacity>
            </View>


            <View style={styles.titleContainer}>
                <Text style={styles.title}> {props.title} </Text>
            </View>
        </SafeAreaView>
    )
}

export default Header;

const styles = StyleSheet.create({
    headeContainer: {
        width: width,
        height: '12%',
        flexDirection: 'row',
        // backgroundColor: 'pink',
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 4,
    },
    backButtonContainer: {
        width: '20%',
        height: '100%',
        backgroundColor: 'red',
    },
    backButton: {
        width: '100%',
        height: '100%',
    },
    backButtonText: {
        fontSize: 15,
        alignSelf: 'center',
        paddingTop: '20%',
    },
    titleContainer: {
        width: '80%',
        height: '100%',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: '5%',
    }
})