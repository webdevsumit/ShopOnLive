import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GoogleShop = ({shop}) => {
  return (
    <TouchableOpacity onPress={()=>Linking.openURL(`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${shop.place_id}`)}>
        <View style={styles.main}>
            <View style={[styles.inline]}>
                <MaterialCommunityIcons name="star" color="#DB944B" size={20} />
                <Text style={[styles.text, styles.textTop]}>{shop.rating} ({shop.user_ratings_total})</Text>
            </View>
            <Text style={[styles.text, styles.textHead]}>{shop.name}</Text>
            <Text style={[styles.text, styles.warning]}>Search from Google and not registered on ShopOnLive.</Text>
            <Text style={[styles.text, styles.green]}>Click To Know More.</Text>
        </View>
    </TouchableOpacity>
  )
}

export default GoogleShop

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
    green: {
        color: 'green',
        fontWeight: 'normal',
        fontSize: 12,
    },
    textTop: {
        fontWeight: 'bold',
        marginLeft: 5
    },
    textHead: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    warning: {
        fontWeight: 'normal',
        fontSize: 12,
        color: 'red'
    }
})