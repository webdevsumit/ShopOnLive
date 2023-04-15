import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const engine = createAgoraRtcEngine();

const AgoraVideoCall = () => {
  const rtcProps = {
    appId: '5d3193abc114461e88c27700e2b97ce3',
    channel: "abcdefghijklmnop",
  };
  
  return(
      <View>
          <Text>TEXT</Text>
      </View>
  )
};

export default AgoraVideoCall;

const styles = StyleSheet.create({});
