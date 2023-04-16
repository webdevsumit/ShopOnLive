import { StyleSheet, Text, View, BackHandler } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native';
import VideoSDKCall from '../components/VideoSDKCall';

const InsideMeetingScreen = ({ navigation, route }) => {

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Meetings");
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  const onMeetIdGeneration = async (newMeetId) => {

  }

  return (
    <View style={styles.main}>
      <VideoSDKCall zipcode={123456} onTermination={()=>navigation.navigate("Meetings")} meetId={null} onMeetIdGeneration={onMeetIdGeneration} />
      {/* <Text>InsideMeetingScreen: {route.params.MeetingId}</Text> */}
    </View>
  )
}

export default InsideMeetingScreen

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: '#121212',
  }
})