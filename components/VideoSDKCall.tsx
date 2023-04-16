import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MediaStream,
  RTCView,
} from "@videosdk.live/react-native-sdk";
import { createMeeting, token } from "./../actions/videoSdkApis";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function ControlsContainer({ join, leave, toggleWebcam, toggleMic, setShowSideVideo, cameraOn, setCameraOn, onTermination }) {
  const [showButtons, setShowButtons] = useState(true);
  const [micOn, setMicOn] = useState(true);

    return (
      <>
        <View style={{...styles.bottomButtonsView, bottom: (showButtons?0:-100)}}>
          <View style={{...styles.bottomMenuButton, backgroundColor: 'rgba(0,0,0,0)'}}></View>
          <TouchableOpacity onPress={()=>{toggleWebcam(); setCameraOn(!cameraOn)}}>
            <View style={{...styles.bottomMenuButton}}>
              <MaterialCommunityIcons name={cameraOn ? "video-off" : "video"} color="white" size={25} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{toggleMic(); setMicOn(!micOn)}}>
            <View style={{...styles.bottomMenuButton}}>
              <MaterialCommunityIcons name={micOn ? "microphone-off" : "microphone"} color="white" size={25} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{leave(); onTermination();}}>
            <View style={{...styles.bottomMenuButton, backgroundColor: '#d10606'}}>
              <MaterialCommunityIcons name="sword-cross" color="white" size={25} />
            </View>
          </TouchableOpacity>
          <View style={{...styles.bottomMenuButton, backgroundColor: 'rgba(0,0,0,0)'}}></View>
        </View>
        <TouchableOpacity onPress={()=>{setShowButtons(!showButtons); setShowSideVideo(!showButtons);}}>
          <View style={styles.bottomOpenMenuButtonView}>
            <MaterialCommunityIcons name={showButtons?"menu-right":"menu-left"} color="white" size={40} />
          </View>
        </TouchableOpacity>
      </>
    );
}

function ParticipantView({ participantId, cameraOn, isMain=false }) {
  const { webcamStream, webcamOn } = useParticipant(participantId);
  return webcamOn && webcamStream ? (
    <RTCView
      streamURL={new MediaStream([webcamStream.track]).toURL()}
      objectFit={"cover"}
      style={isMain ? styles.mainVideoContainer : styles.sideVideoContainer}
    />
  ) : (
    <View style={[isMain ? styles.mainVideoContainer : styles.sideVideoContainer, {justifyContent: "center", alignItems: 'center', alignContent: 'center'}]}>
      {(cameraOn && isMain)?<>
        <ActivityIndicator size="large"/>
      </>:<>
        <MaterialCommunityIcons name={cameraOn ? "video-off" : "video"} color="white" size={25} />
      </>}
    </View>
  );
}



function ParticipantList({ participants, showSideVideo, cameraOn }) {
  const [mainVideo, setMainVideo] = useState(0);
  return participants.length > 0 ? (
    <View>
      <ParticipantView participantId={participants[mainVideo]} cameraOn={cameraOn} isMain={true} />
      <View style={{...styles.sideVideoContainerView, left: 25, bottom: (showSideVideo? 1 : -100)}}>
        <TouchableOpacity onPress={()=>setMainVideo((mainVideo===0 && participants.length>1) ? 1 : 0)}>
          <ParticipantView participantId={participants[(mainVideo===0 && participants.length>1) ? 1 : 0]} cameraOn={cameraOn} />
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.noVideoView}>
      <Text style={{ fontSize: 20, color: "black" }}>PLEASE GIVE US FEEDBACK</Text>
    </View>
  );
}

function MeetingView({ onTermination }) {
  // Get `participants` from useMeeting Hook
  const { join, leave, toggleWebcam, toggleMic, participants } = useMeeting({});
  const participantsArrId = [...participants.keys()]; // Add this line
  const [showSideVideo, setShowSideVideo] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      join();
    },10);
    return(()=>{
      leave();
    })
  },[])

  return (
    <View style={{ flex: 1, zIndex: 2 }}>
      <ParticipantList participants={participantsArrId} showSideVideo={showSideVideo} cameraOn={cameraOn} />
      <ControlsContainer
        join={join}
        leave={leave}
        toggleWebcam={toggleWebcam}
        toggleMic={toggleMic}
        setShowSideVideo={setShowSideVideo}
        cameraOn={cameraOn}
        setCameraOn={setCameraOn}
        onTermination={onTermination}
      />
    </View>
  );
}

export default function VideoSDKCall({ zipcode, onTermination, meetId=null, onMeetIdGeneration }) {
  const [meetingId, setMeetingId] = useState(meetId);

  const getMeetingId = async (id) => {
    const tempMeetingId = id == null ? await createMeeting({ token }) : id;
    setMeetingId(tempMeetingId);
    onMeetIdGeneration(tempMeetingId);
  };

  useEffect(()=>{
    if(!meetId) getMeetingId(meetId);
  },[]);

  if(!!meetingId)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: `ZIPCODE: ${zipcode}`,
        }}
        token={token}
      >
        <MeetingView onTermination={onTermination} />
      </MeetingProvider>
    </SafeAreaView>
  );

  return (
    <View style={styles.connectingView}>
      <ActivityIndicator size="large"/>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomOpenMenuButtonView: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 10,
    right: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  bottomButtonsView: {
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row'
  },
  bottomMenuButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  connectingView: {
    width: '100%', 
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainVideoContainer: {
    height: "100%",
    width: "100%",
  },
  sideVideoContainer: {
    height: 72,
    width: 48,
  },
  sideVideoContainerView: {
    position: 'absolute',
    height: 74,
    width: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems:'center',
    alignContent: "center",
  },
  noVideoView: {
    flex: 1,
    backgroundColor: "#F6F6FF",
    justifyContent: "center",
    alignItems: "center",
  }
})