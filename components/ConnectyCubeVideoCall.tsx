import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import ConnectyCube, {RTCView} from "react-native-connectycube";

const CREDENTIALS = {
  appId: 7062,
  authKey: "3MOK4-F9AvEuXz5",
  authSecret: "WDNzxrmFZjnSQkd"
};

const CONFIG = {
  debug: { mode: 1 }, // enable DEBUG mode (mode 0 is logs off, mode 1 -> console.log())
};

ConnectyCube.init(CREDENTIALS, CONFIG);

const ConnectyCubeVideoCall = () => {

  const [localStreamObj, setLocalStreamObj] = useState(null);
  
  const calleesIds = [56, 76, 34]; // User's ids
  const sessionType = ConnectyCube.videochat.CallType.VIDEO; // AUDIO is also possible
  const additionalOptions = {};
  const session = ConnectyCube.videochat.createNewSession(calleesIds, sessionType, additionalOptions);
  const extension = {};

  const mediaParams = {
    audio: true,
    video: true
  };
  
  session
    .getUserMedia(mediaParams)
    .then((localStream) => {
      setLocalStreamObj(localStream);
      console.log("=====================LOCALSTREAM START===========================");
      console.log(localStream);
      console.log("======================LOCALSTREAM END============================");
    })
    .catch((error) => {});


    useEffect(()=>{
      session.call(extension, (error) => {console.log(error)});
    },[])

    ConnectyCube.videochat.onCallListener = function (session, extension) { console.log("Incoming call.")};
    ConnectyCube.videochat.onUserNotAnswerListener = function (session, userId) {console.log("User not answering.")};
  
  return(
      <View>
          <RTCView  objectFit="cover" style={styles.rtcView} key={56} streamURL={localStreamObj.toURL()} />
      </View>
  )
};

export default ConnectyCubeVideoCall;

const styles = StyleSheet.create({
  rtcView: {

  }
});
