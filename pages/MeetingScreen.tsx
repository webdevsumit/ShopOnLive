import { StyleSheet, View, Text, ToastAndroid, FlatList, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import MeetCard from '../components/MeetCard'
import { getUpcomingMeetingsAPI } from '../actions/apis';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import NormalGreenBtn from '../components/NormalGreenBtn';

var googleTextCallBackFunc = () => {};

const MeetingScreen = ({navigation: { navigate }}) => {

  const showToaster = (message: any) => {ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER,25,50,);}
  const [meetings, setMeetings] = useState<any>([]);
	const [totalMeetings, setTotalMeetings] = useState(0);
  const [page, setPage] = useState(1);
	const [caughtAll, setCaughtAll] = useState(false);
	const [pendingCall, setPendingCall] = useState(false);
  const [isRefereshing, setIsRefereshing] = useState(false)
  const [google_provider_token, set_google_provider_token] = useState('');
  const [isSignedInByGoogle, setIsSignedInByGoogle] = useState(false);
  const [showGoogleSignInMessage, setShowGoogleSignInMessage] = useState(false);

  const configureGoogleSingin = async () => {

    if(!!google_provider_token){
      return;
    }

    GoogleSignin.configure({
      androidClientId: '983190905763-4j2fm6r4lrau3mtr9012sipttckloobt.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    continueWithGoogle();
    
  };

  const continueWithGoogle = async () => {
    await GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(async (userInfo) => {
              GoogleSignin.getTokens().then(({accessToken})=>{
                set_google_provider_token(accessToken);
              }).catch(err=>console.log("Shop Details, line 46: ", err))
            })
            .catch(e => {
              showToaster('ERROR: ' + JSON.stringify(e));
            });
        }else showToaster('You do not have Play Service.');
      })
      .catch(e => {
        showToaster('ERROR: ' + JSON.stringify(e));
      });

  };

  const fetchUpcomingMeetings = async (pageNum) => {
    setPendingCall(true);
    await getUpcomingMeetingsAPI(pageNum).then(res=>{
      if(res.data.status === "success"){
        if(res.data.page===1){
          setMeetings(res.data.upcoming_meetings);
        }else{
          setMeetings(prevShops=>[...prevShops, ...res.data.upcoming_meetings]);
        }
        setCaughtAll(res.data.caughtAll);
        setTotalMeetings(res.data.upcoming_meetings_count)
        setPage(res.data.page);
      }else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
    setPendingCall(false);
    setIsRefereshing(false);
  }

  const resetParamOnReferesh = () => {
    setMeetings([]);
    setIsRefereshing(true); 
    fetchUpcomingMeetings(1);
  }

  const checkGoogleSignInStatus = async () => {
    setIsSignedInByGoogle(await GoogleSignin.isSignedIn());
  }

  useEffect(()=>{
    fetchUpcomingMeetings(page);
    checkGoogleSignInStatus();
  },[]);

  const onMeetJoin = (url) => {
    // navigate('InsideMeeting', {'MeetingId': id});
    Linking.openURL(url);
  }

  const onGivingRatingAndReview = (id) => {
    navigate('givingRatingAndReview', {'MeetId': id});
  }

  const onShowGoogleText = (func) => {
    googleTextCallBackFunc = func;
    setShowGoogleSignInMessage(true);
  }

  return (<>
        {showGoogleSignInMessage && <View style={{...styles.messagePopupOuter}}>
          <View style={styles.messagePopup}>
            <Text style={styles.textMessage}>
              We need your google calendar access to schedule a meeting and to add time on calendar. Please click the below button to continue. 
            </Text>
            <NormalGreenBtn text="CONTINUE" onPress={googleTextCallBackFunc} />
          </View>
        </View>}
      <FlatList
        data={meetings}
        renderItem={({item}:any)=><MeetCard key={item.id} meeting={item} google_provider_token={google_provider_token} configureGoogleSingin={configureGoogleSingin} isSignedInByGoogle={isSignedInByGoogle} setShowGoogleSignInMessage={setShowGoogleSignInMessage} onShowGoogleText={onShowGoogleText} onPressStartMeeting={onMeetJoin} onGivingRatingAndReview={onGivingRatingAndReview} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={()=><Text style={styles.noResult}>{caughtAll ? "You do not have any meeting." : ""}</Text>}
        initialNumToRender={10}
        onEndReachedThreshold={1}
        onEndReached={(info) => {
          if(!caughtAll && !pendingCall){
            fetchUpcomingMeetings(page+1);
          }
        }}
        ListFooterComponent={()=><Text style={styles.noResult}>{!caughtAll ? "loading..." : ""}</Text>}
        refreshing={isRefereshing}
        onRefresh={resetParamOnReferesh}
      />
  </>
  )
}

export default MeetingScreen

const styles = StyleSheet.create({
  noResult: {
    width: '100%',
    textAlign: 'center',
    marginVertical: 10,
    color: 'black'
  },
  textMessage: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 20
  },
  messagePopupOuter: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 3,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  messagePopup: {
    width: '90%',
    minHeight: "30%",
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center'
  }
})