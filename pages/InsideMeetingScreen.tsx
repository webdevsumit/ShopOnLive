import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InsideMeetingScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>InsideMeetingScreen: {route.params.MeetingId}</Text>
    </View>
  )
}

export default InsideMeetingScreen

const styles = StyleSheet.create({})