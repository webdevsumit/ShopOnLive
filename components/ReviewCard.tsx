import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ReviewCard = ({review}) => {
  return (
    <View style={styles.main}>
      <View style={[styles.inline]}>
        <MaterialCommunityIcons name="star" color="#DB944B" size={20} />
        <Text style={[styles.text, styles.textTop]}>{review.rating}</Text>
      </View>
      <Text style={[styles.text, styles.textHead]}>{review.user_name}</Text>
      <Text style={[styles.text, styles.textDesc]}>{review.review}</Text>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
    main: {
        marginHorizontal: 20,
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10
    },
    inline: {
        flexDirection: 'row'
    },
    text: {
        color: 'black'
    },
    textTop: {
        fontWeight: 'bold',
        marginLeft: 5
    },
    textHead: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    textDesc: {
        fontWeight: 'normal',
        fontSize: 12,
    }
})
