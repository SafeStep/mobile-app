'use strict';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '40%',
        backgroundColor: '#eee'
    },
    forgot: {
        flexDirection: 'row',
        marginTop: 5,
    },
    stretch: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    altText: {
        marginTop: 10,
        marginBottom: 0,
        fontSize: 15,
        color: '#605B5B',
    },
    alternatives: {
        // flex: 1,
        flexDirection: 'row'
    },
    altMethods: {
        width: '25%',
        height: 60,
        marginVertical: 10,

        marginLeft: 5,
        marginRight: 5,


        // backgroundColor: 'red',
        // flex: 1,
        // flexDirection: 'row',

        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
    },
    changePage: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    intextButton: {
        color: '#605B5B',
        fontSize: 15,
    },
    span: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 15,

    },
    mapContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    map: {
        width: '100%',
        height: '85%',
        backgroundColor: '#eee',
    },
    mapTopNav: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        // backgroundColor:'#fff',
        position: 'absolute',
        marginTop: '10%',
    },
    mapTopNavButtons: {
        width: '40%',
        height: '60%',

        backgroundColor: '#fff',

        marginTop: '4%',
        marginHorizontal: '5%',


        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
    },
    mapTopNavText: {
        alignSelf: 'center',
        paddingTop: '7%',
    },
    mapFooter: {
        width: '100%',
        height: '15%',
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    destinationContainer: {
        width: '60%',
        height: '50%',

        alignSelf: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,

        marginVertical: '7.5%',
        marginHorizontal: '5%',

        // IOS
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 3,

    },
    destinationInput: {
        paddingLeft: 10,
        paddingTop: 0,
    },
    goButton: {
        width: '20%',
        aspectRatio: 1,
        backgroundColor: '#90E4FF',
        borderRadius: 50,

        marginVertical: '5%',
        marginLeft: '2%',

        // IOS
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 4,
    },
    goButtonText: {
        fontSize: 20,
        
        alignSelf: 'center',
        // alignItems: 'center',
        paddingTop: '30%',
    }
});