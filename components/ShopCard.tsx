import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    shop: any;
    onPress: (params: any) => any;
}

const ShopCard = ({shop, onPress}: Props) => {
    if(!!shop)
        return (
            <TouchableOpacity onPress={()=>onPress(shop.id)}>
                <View style={styles.main}>
                    <View style={[styles.inline]}>
                        <MaterialCommunityIcons name="star" color="#DB944B" size={20} />
                        <Text style={[styles.text, styles.textTop]}>{shop.rating}</Text>
                    </View>
                <Text style={[styles.text, styles.textHead]}>{shop.shopName}</Text>
                <Text style={[styles.text, styles.textDesc]}>{shop.description.length > 170 ? `${shop.description.substring(0, 170)}..... more>>>` : shop.description}</Text>
                </View>
            </TouchableOpacity>
        )
    return (<Text>loading...</Text>)
}

export default ShopCard

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