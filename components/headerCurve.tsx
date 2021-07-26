import React, { FC } from 'react'
import {Dimensions, Text, View, StyleSheet} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const {height, width} = Dimensions.get('screen')

interface Props {
    curveHeight?: number;
    curve?: number;
    text: string;
}

const HeadingCurve : FC<Props> = (props) => {
    return (
     <View style={styles.container}> 
         <View style={styles.curve}> 
         {/* <View>  */}

         </View>
         <Text style={styles.text}> {props.text} </Text>

     </View>
    )
}

export default HeadingCurve;

const styles = StyleSheet.create({
    container: {
        top: 0, 
        width: width,
        height: height * 0.3,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        position: 'absolute',
        // backgroundColor: '#fff',
        // overflow: 'hidden'
    },
    curve: {
        width: width,
        height: width,
        borderRadius: width/2,
        alignSelf: 'center',
        marginBottom: width * 0.6,
        backgroundColor: "#90E4FF",
        transform: [{ scaleX: 1.6}],
        
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 15,
    },
    text: {
        width: width,
        textAlign: 'center',
        fontSize: 50,
        color: '#000',
        position: 'absolute',
        elevation: 16,
    }
})