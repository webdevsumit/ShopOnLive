import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import NormalGreenBtn from './NormalGreenBtn';

interface Props {
    otp: any;
    setOtp: (params: any) => any;
    onVerify: (params: any) => any;
}

const OtpVerification = ({ otp, setOtp, onVerify }: Props) => {
    
      return (
        <View style={styles.main}>
          <View style={styles.wrapperView}>
            <Text style={styles.text}>OTP</Text>
            <TextInput
              style={styles.input}
              onChangeText={txt=>setOtp(txt)}
              value={otp.shopName}
              placeholder="OTP is sent to your whatsapp."
              keyboardType="numeric"
              cursorColor='#555'
              inputMode='numeric'
              maxLength={6}
              placeholderTextColor='#aaa'
            />
          </View>
          <NormalGreenBtn textFontSize={18} text="VERIFY OTP" onPress={onVerify} />
        </View>
      );
}

export default OtpVerification

const styles = StyleSheet.create({
    main: {
      width: '85%',
      marginBottom: 15,
      marginTop: 15
    },
    wrapperView: {
      marginTop: 10,
      marginBottom: 20
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
    }
  });
  