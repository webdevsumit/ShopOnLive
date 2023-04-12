import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ShopDetails = ({ route }) => {
  return (
    <View>
      <Text>ShopDetails: {route.params.shopId}</Text>
    </View>
  )
}

export default ShopDetails

const styles = StyleSheet.create({})