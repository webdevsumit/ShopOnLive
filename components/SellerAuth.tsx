import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

interface Props {
    data: any;
    setData: (params: any) => any;
}

const SellerAuth = ({ data, setData }: Props) => {
    const onPhoneChange = (val: any) => {
        setData({...data, phone: val})
      }
      const onZipCodeChange = (val: any) => {
        setData({...data, zipcode: val})
      }
    
      return (
        <View style={styles.main}>
          <View style={styles.wrapperView}>
            <Text style={styles.text}>Phone Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={onPhoneChange}
              value={data.phone}
              placeholder="Enter 10 digit phone number."
              keyboardType="number-pad"
              autoComplete='tel-national'
              cursorColor='#555'
              inputMode='tel'
              maxLength={10}
              placeholderTextColor='#aaa'
            />
          </View>
          <View style={styles.wrapperView}>
            <Text style={styles.text}>Area Zipcode</Text>
            <TextInput
              style={styles.input}
              onChangeText={onZipCodeChange}
              value={data.zipcode}
              placeholder="Enter zipcode/pincode."
              keyboardType="number-pad"
              autoComplete='postal-code'
              cursorColor='#555'
              inputMode='numeric'
              maxLength={6}
              placeholderTextColor='#aaa'
            />
          </View>
          <View style={styles.wrapperView}>
            <Text style={styles.text}>Shop Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={txt=>setData({...data, shopName: txt})}
              value={data.shopName}
              placeholder="Enter Shop Name."
              keyboardType="default"
              cursorColor='#555'
              maxLength={100}
              placeholderTextColor='#aaa'
            />
          </View>
          <View style={styles.wrapperView}>
            <Text style={styles.text}>Description</Text>
            <TextInput
              style={[styles.input, styles.largeInputBox ]}
              multiline
              numberOfLines={10}
              onChangeText={txt=>setData({...data, description: txt})}
              value={data.description}
              placeholder="Type here. Try to include all the items that you sell and places where you search to come in the searches. (max: 1500 words)."
              keyboardType="default"
              cursorColor='#555'
              maxLength={1500}
              placeholderTextColor='#aaa'
            />
          </View>
        </View>
      );
}

export default SellerAuth

const styles = StyleSheet.create({
    main: {
      width: '85%',
      marginBottom: 15,
      marginTop: 15
    },
    wrapperView: {
      marginTop: 10,
      marginBottom: 10
    },
    text: {
      color: 'black',
      fontWeight: 'bold',
    },
    input: {
      height: 40,
      width: "100%",
      borderWidth: 1,
      padding: 0,
      color: 'black',
      borderTopColor: 'white',
      borderRightColor: 'white',
      borderLeftColor: 'white',
    },
    largeInputBox: {
      height: 300,
      borderColor: 'black', 
      padding: 5, 
      marginTop: 10,
      borderTopColor: 'black',
      textAlign: 'left',
      verticalAlign: 'top',
    }
  });
  