import { ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import NormalGreenBtn from '../components/NormalGreenBtn';
import { giveReviewAndRatingToMeetingByIdAPI } from '../actions/apis';

const GivingRatingAndReview = ({ navigation, route}) => {
  // route.params.MeetId

  const showToaster = (message: any) => {ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER,25,50,);}
  const [name, setName] = useState('');
  const [rating, setRating] = useState('5');
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeRating = (txt) => {
    if(parseFloat(txt)> 5 || parseFloat(txt)< 0){
      showToaster("Rating cannot be more than 5 and less than 0.");
      setRating('');
      return;
    }
    setRating(txt);
  } 

  const onSubmitReview = async () => {
    if(isSubmitting){
      showToaster("Please wait.");
      return;
    }
    let payload = {
      username: name,
      rating: rating,
      review: review
    }
    setIsSubmitting(true)
    await giveReviewAndRatingToMeetingByIdAPI(payload, route.params.MeetId).then(res=>{
      if(res.data.status === "success"){
        showToaster("Submitted Successfully.");
        navigation.goBack();
      }else showToaster(res.data.message);
    }).catch(err=>showToaster(err.message));
    setIsSubmitting(false);
  }

  return (
    <View style={styles.main} >
      <View style={styles.mainInner}>
        <Text style={[styles.text, styles.head]}>GIVE RATING AND REVIEW</Text>
        <View style={styles.rating} >
          <Text style={[styles.text]}>NAME: </Text>
          <TextInput
              style={{...styles.input, height: 25, width: '70%'}}
              onChangeText={txt=>setName(txt)}
              value={name}
              placeholder="Your Name"
              keyboardType="default"
              cursorColor='#555'
              autoComplete='name'
              inputMode='text'
              maxLength={150}
              placeholderTextColor='#aaa'
              textAlignVertical="center"
              textAlign="center"
            />
        </View>
        <View style={styles.rating} >
          <Text style={[styles.text]}>RATING (0-5): </Text>
          <TextInput
              style={styles.input}
              onChangeText={onChangeRating}
              value={rating}
              placeholder="0-5"
              keyboardType="number-pad"
              cursorColor='#555'
              inputMode='decimal'
              maxLength={3}
              placeholderTextColor='#aaa'
              textAlignVertical="center"
              textAlign="center"
            />
        </View>
        <TextInput
            style={[styles.input, styles.largeInputBox ]}
            multiline
            numberOfLines={10}
            onChangeText={txt=>{
              if(txt.length<1000) setReview(txt);
              else showToaster("Review should be in less than 1000 words.")
            }}
            value={review}
            placeholder="Type your review here. Try to add all goods and bads about the shop or store (max: 1000 words)."
            keyboardType="default"
            cursorColor='#555'
            maxLength={1500}
            placeholderTextColor='#aaa'
          />
        <NormalGreenBtn text={isSubmitting ? "SUBMITTING..." : "SUBMIT"} onPress={onSubmitReview} />
      </View>
    </View>
  )
}

export default GivingRatingAndReview

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainInner: {
    width: '90%',
    minHeight: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10
  },
  text: {
    color: 'black',
    fontWeight: 'bold'
  },
  head: {
    fontWeight: 'bold',
    fontSize: 18
  },
  input: {
    height: 40,
    width: 50,
    borderWidth: 1,
    padding: 0,
    color: 'black',
    borderColor: 'black',
  },
  largeInputBox: {
    width: '98%',
    height: 300,
    borderColor: 'black', 
    padding: 5, 
    marginTop: 10,
    borderTopColor: 'black',
    textAlign: 'left',
    verticalAlign: 'top',
    marginBottom: 15
  },
  rating: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  }
})