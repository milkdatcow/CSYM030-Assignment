import {StyleSheet} from 'react-native'
/*
Colours
https://coolors.co/palette/f08080-f4978e-f8ad9d-fbc4ab-ffdab9


*/
const base = '#6096BA';
const dark = '#274C77';
const light = '#A3CEF1';
const grey = '8B8C89';
const offwhite = '#E7ECEF';
const styles = StyleSheet.create({
    container: { 
        padding: 20 
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 20 
    },
    input: { 
        borderWidth: 1, 
        marginBottom: 10, 
        padding: 10, 
        borderRadius: 5 
    },
    link: { 
        marginTop: 10, 
        color: 'blue' 
    },
    subTitle: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    picker: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 8,
        marginBottom: 15
    },
  });

export default styles;
  