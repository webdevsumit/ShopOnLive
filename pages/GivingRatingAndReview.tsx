import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GivingRatingAndReview = ({ navigation, route}) => {
  return (
    <View>
      <Text>GivingRatingAndReview: {route.params.MeetId}</Text>
    </View>
  )
}

export default GivingRatingAndReview

const styles = StyleSheet.create({})