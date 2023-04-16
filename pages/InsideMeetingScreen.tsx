import { StyleSheet, Text, View, BackHandler, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import VideoSDKCall from '../components/VideoSDKCall';
import { getMeetDetailsByIdAPI, setNewMeetIdByIdAPI, terminateMeetingByIdAPI } from '../actions/apis';

const InsideMeetingScreen = ({ navigation, route }) => {

  const showToaster = (message: any) => {
    ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER,25,50,);
  }

  const [meetData, setMeetData] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        terminateMeetingByIdAPICall();
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  const onMeetIdGeneration = async (newMeetId) => {
    await setNewMeetIdByIdAPI(route.params.MeetingId, newMeetId).then(res=>{
      if(res.data.status === "success"){
        showToaster("Meeting id saved successfully.");
      }else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
  }

  const fetchMeetDetails = async () => {
    await getMeetDetailsByIdAPI(route.params.MeetingId).then(res=>{
      if(res.data.status === "success"){
        setMeetData(res.data.data);
      }else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
  }

  const terminateMeetingByIdAPICall = async () => {
    await terminateMeetingByIdAPI(route.params.MeetingId).then(res=>{
      if(res.data.status === "success"){
        setMeetData(`Meeting Time: ${res.data.duration_in_seconds}s`);
      }else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
    navigation.navigate("Meetings");
  };

  useEffect(()=>{
    fetchMeetDetails();
  },[]);

  if(!!!meetData)
    return (
      <View style={styles.main}>
        <ActivityIndicator size="large"/>
      </View>
    )
  else return (
      <View style={styles.main}>
        <VideoSDKCall zipcode={meetData.zipcode} onTermination={terminateMeetingByIdAPICall} onMeetIdGeneration={onMeetIdGeneration} meetId={meetData.isMeetIdGenerated ? meetData.meetId : null}/>
      </View>
    );
}

export default InsideMeetingScreen

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: '#121212',
  }
})