import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppTitle from './AppTitle'

const Landing = ({ onPressGoogleButton }) => {
  return (
    <View style={styles.main}>
      <AppTitle />
			<View style={styles.centerContainer}>
				<Text style={styles.text}>let's make the shopping simple</Text>
			</View>
      <Button title='CONTINUE WITH GOOGLE' onPress={onPressGoogleButton} />
    </View>
  )
}

export default Landing

const styles = StyleSheet.create({
    main: {
			width: '100%',
			height: '100%',
			justifyContent: 'center',
			alignItems: 'center'
    },
		centerContainer: {
			marginTop: 10,
			marginBottom: 100
		},
		text: {
			color: 'black'
		}
})