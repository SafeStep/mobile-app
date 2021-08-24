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
         {/* <View style={styles.curve}> 

         </View> */}
         <Text style={styles.text}> {props.text} </Text>

     </View>
    )
}

export default HeadingCurve;

const styles = StyleSheet.create({
    container: {
        top: 0, 
        width: width*0.95,
        height: height * 0.3,
        justifyContent: 'flex-start',
        marginTop: 50,
        // marginLeft: 20,
        // alignSelf: 'flex-end',
        position: 'absolute',
        // backgroundColor: '#fff',
        // overflow: 'hidden'
    },
    curve: {
        width: width,
        height: 100,
        // borderRadius: width/2,
        alignSelf: 'center',
        // marginBottom: width * 0.6,
        // backgroundColor: "#0779E4",
        // transform: [{ scaleX: 1.6}],
        
        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 4},
        // shadowOpacity: 0.5,
        // shadowRadius: 1,
        // elevation: 5,
    },
    text: {
        width: width,
        textAlign: 'left',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        position: 'absolute',
        elevation: 6,
    }
})