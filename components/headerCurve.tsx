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
        // top: 0, 
        width: width,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        // height: height * 0.3,
        // justifyContent: 'center',
        // marginTop: 50,
        // marginLeft: 20,
        // alignSelf: 'flex-end',
        // position: 'absolute',
        // backgroundColor: 'pink',
        // overflow: 'hidden'
    },
    curve: {
        // width: width,
        // height: 100,
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
        // position: 'absolute',
        elevation: 6,
    },
    backButton: {
        width: 50,
        height: 20,
        // backgroundColor: 'orange',

    },
    backIcon: {
        width: 50,
        height: 20
    }
})