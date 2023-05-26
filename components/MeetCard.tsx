import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import NormalGreenBtn from './NormalGreenBtn';
import LinkBtn from './LinkBtn';
import DatePicker from 'react-native-date-picker';
import {
  cancelMeetingByIdAPI,
  confirmMeetingByIdAPI,
  rescheduleMeetingByIdAPI,
	updateGoogleEventAPI,
} from '../actions/apis';

interface Props {
  meeting: any;
  onPressStartMeeting: (params: any) => any;
  onGivingRatingAndReview: (params: any) => any;
}

const MeetCard = ({
  meeting,
  onPressStartMeeting,
  onGivingRatingAndReview,
}: Props) => {
  const [meet, setMeet] = useState(meeting);
  const [meetDateTime, setMeetDateTime] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const showToaster = (message: any) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50,
    );
  };
  let meetingStatusColor = '#9F8F00';
  if (meet.is_confirmed_by_seller && meet.is_confirmed_by_user)
    meetingStatusColor = '#006604';
  if (meet.is_canceled) meetingStatusColor = 'red';

  let canJoin =
    meet.is_confirmed_by_seller &&
    meet.is_confirmed_by_user &&
    moment(meet.datetime).subtract({hours: 0, minutes: 30, seconds: 0}) <
      moment() &&
    !meet.is_canceled;
  let canRechedule =
    moment(meet.datetime).subtract({hours: 0, minutes: 30, seconds: 0}) >
      moment() && !meet.is_canceled;
  let canConfirm =
    ((!meet.is_confirmed_by_seller && meet.is_seller) ||
      (!meet.is_confirmed_by_user && !meet.is_seller)) &&
    !meet.is_canceled;
  let canGiveRatingAndReview =
    meet.is_confirmed_by_seller &&
    meet.is_confirmed_by_user &&
    moment(meet.datetime) < moment() &&
    !meet.is_canceled;

  const onClickJoin = () => {
    if (canJoin) {
      onPressStartMeeting(meet.hangoutLink);
    } else if (canConfirm) {
      showToaster('First, Please confirm to join the meeting.');
    } else if (meet.is_canceled) {
      showToaster('This meeting is canceled by someone.');
    } else if (!meet.is_confirmed_by_seller && !meet.is_seller) {
      showToaster('The meeting is not confirmed by the seller yet to join.');
    } else if (!meet.is_confirmed_by_user && meet.is_seller) {
      showToaster('The meeting is not confirmed by the user yet to join.');
    } else if (
      moment(meet.datetime).subtract({hours: 0, minutes: 30, seconds: 0}) >
      moment()
    ) {
      showToaster('You will be allowed to join the meeting before 30 minutes.');
    }
  };

  const onClickReschedule = () => {
    if (canRechedule) {
      setOpenDatePicker(true);
    } else if (meet.is_canceled) {
      showToaster('This meeting is canceled by someone.');
    } else if (
      moment(meet.datetime).subtract({hours: 0, minutes: 30, seconds: 0}) <
      moment()
    ) {
      showToaster('You can just reschedule the meeting before 30 minutes.');
    }
  };

  const onClickRescheduleCallApi = async (meetTime) => {
		if (canRechedule) {
			await rescheduleMeetingByIdAPI({meetTime}, meet.id)
				.then(res => {
					if (res.data.status === 'success') {
						setMeet(res.data.meeting);
						showToaster('Meeting is rescheduled.');
					} else showToaster(res.data.message);
				})
				.catch(err => showToaster(err.message));
    } else if (meet.is_canceled) {
      showToaster('This meeting is canceled by someone.');
    } else if (
      moment(meet.datetime).subtract({hours: 0, minutes: 30, seconds: 0}) <
      moment()
    ) {
      showToaster('You can just reschedule the meeting before 30 minutes.');
    }
  };

  const onClickConfirm = async () => {
    if (canConfirm) {
      await confirmMeetingByIdAPI(meet.id).then(res => {
        if (res.data.status === 'success') {
          setMeet(res.data.meeting);
          showToaster('Meeting is confirmed by you to join.');
        } else showToaster(res.data.message);
      });
    } else showToaster('You are already confirm to join the meeting.');
  };

  const onClickCancel = async () => {
    if (moment(meet.datetime) < moment())
      showToaster('The meeting cannot be canceled.');
    if (meet.is_canceled) showToaster('The meeting is already canceled.');
    else {
      await cancelMeetingByIdAPI(meet.id).then(res => {
        if (res.data.status === 'success') {
          setMeet(res.data.meeting);
          showToaster('Meeting is canceled by you.');
        } else showToaster(res.data.message);
      });
    }
  };

  const onClickGiveReviewAndRating = async () => {
    if (canGiveRatingAndReview) {
      onGivingRatingAndReview(meet.id);
    } else showToaster('You can give rating and review after meeting.');
  };

  if (!!meet)
    return (
      <View style={styles.main}>
        <View style={[styles.inline]}>
          <MaterialCommunityIcons name="star" color="#DB944B" size={20} />
          <Text style={[styles.text, styles.textTop]}>
            {meet.current_rating}
          </Text>
        </View>
        <DatePicker
          modal
          open={openDatePicker}
          date={meetDateTime}
          title="RESCHEDULE YOUR SHOPING TIME"
          onConfirm={date => {
            setOpenDatePicker(false);
            setMeetDateTime(date);
            onClickRescheduleCallApi(date);
          }}
          onCancel={() => {
            setOpenDatePicker(false);
          }}
        />
        <Text style={[styles.text, styles.textHead]}>{meet.shopName}</Text>
        <Text style={[styles.text, {marginLeft: 5}]}>Date And Time</Text>
        <View style={styles.timeView}>
          <View style={styles.timeViewInner}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>
              {moment(meet.datetime).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View style={styles.timeViewInner}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>
              {moment(meet.datetime).format('hh:mm a')}
            </Text>
          </View>
        </View>
        <View style={{...styles.inline, marginVertical: 3}}>
          <Text
            style={[styles.text, {fontWeight: 'bold', marginHorizontal: 5}]}>
            STATUS:
          </Text>
          <Text
            style={[
              styles.text,
              {fontWeight: 'bold', color: meetingStatusColor},
            ]}>
            {meet.status}
          </Text>
        </View>
        <View
          style={{
            ...styles.inline,
            width: '100%',
            justifyContent: 'space-between',
            padding: 5,
          }}>
          <View>
            <NormalGreenBtn
              text="JOIN"
              onPress={onClickJoin}
              bgColor={canJoin ? '#006604' : '#bbb'}
            />
          </View>
          <View>
            <NormalGreenBtn
              text="RESCHEDULE"
              onPress={onClickReschedule}
              bgColor={canRechedule ? '#006604' : '#bbb'}
            />
          </View>
          <View>
            <NormalGreenBtn
              text="CONFIRM"
              onPress={onClickConfirm}
              bgColor={canConfirm ? '#006604' : '#bbb'}
            />
          </View>
        </View>
        <View
          style={{
            marginVertical: 2,
            marginHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <LinkBtn
            text="cancel meeting"
            textColor={
              meet.is_canceled || moment(meet.datetime) < moment()
                ? '#bbb'
                : 'orange'
            }
            onPress={onClickCancel}
          />
          <LinkBtn
            text="give rating & review"
            textColor={canGiveRatingAndReview ? 'green' : '#bbb'}
            onPress={onClickGiveReviewAndRating}
          />
        </View>
      </View>
    );
  return <Text>loading...</Text>;
};

export default MeetCard;

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  inline: {
    flexDirection: 'row',
  },
  text: {
    color: 'black',
  },
  textTop: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  textHead: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textDesc: {
    fontWeight: 'normal',
    fontSize: 12,
  },
  timeView: {
    flexDirection: 'row',
  },
  timeViewInner: {
    backgroundColor: '#ccc',
    margin: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});
