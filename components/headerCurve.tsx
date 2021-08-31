import React, { FC } from 'react'
import {Dimensions, Text, View, StyleSheet, Image} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Images from '../assets/images'

const {height, width} = Dimensions.get('screen')

interface Props {
    backButton?: boolean;
    onPress?: () => void;
    text: string;
}

const HeadingCurve : FC<Props> = (props) => {
    return (
        <View style={styles.container}> 
            { props.backButton 
                ?   <TouchableOpacity style={styles.backButton} onPress={props.onPress}>
                        <Image style={styles.backIcon} source={Images.backIcon} />

                    </TouchableOpacity>
                :   <></>
            }
            
            <Text style={styles.text}> {props.text} </Text>

     </View>
    )
}

export default HeadingCurve;

const styles = StyleSheet.create({
    container: {
        width: width,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    curve: {
        alignSelf: 'center',
    },
    text: {
        width: width,
        textAlign: 'left',
        fontSize: 35,
        fontWeight: 'bold',
        color: '#fff',
        elevation: 6,
    },
    backButton: {
        width: 50,
        height: 20,
    },
    backIcon: {
        width: 50,
        height: 20
    }
})