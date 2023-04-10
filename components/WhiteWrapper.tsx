import { View, Text, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'

interface Props {
    children?: ReactNode
    // any props that come into the component
}

const WhiteWrapper = ({ children }: Props) => {
  return (
    <View style={styles.whiteWrapper}>
      { children }
    </View>
  )
}

export default WhiteWrapper;


const styles = StyleSheet.create({
    whiteWrapper: {
      width: '85%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor:'#fff',
      minHeight: 100,
      borderRadius: 10
    },
  });