import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props {
    textFontSize: any;
    text: any;
    onPress: (params: any) => any;
    textColor: any;
}

const LinkBtn = ({ textFontSize=14, text, textColor, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.main}>
            <Text style={{...styles.text, fontSize: textFontSize, color: textColor}} >{text}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default LinkBtn

const styles = StyleSheet.create({
    main: {
    },
    text: {
        fontSize: 10,
        color: 'black',
        textDecorationLine: 'underline'
    }
})