import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const SearchScreen = ({ navigation: { navigate }}) => {
  const [searchedText, setSearchedText] = useState('');
  return (
    <View style={styles.main}>
      <TextInput
              style={styles.input}
              onChangeText={txt=>setSearchedText(txt)}
              value={searchedText}
              placeholder="Search"
              keyboardType="default"
              cursorColor='#555'
              inputMode='search'
              maxLength={40}
              placeholderTextColor='#aaa'
              autoFocus={true}
              onSubmitEditing={()=>navigate("AfterSearchScreen", {"searchedText": searchedText})}
              returnKeyType="search"
            />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: "97%",
    borderWidth: 1,
    padding: 0,
    color: 'black',
    padding: 10,
    marginTop: 3,
    borderRadius: 4,
    borderColor: 'gray'
  },
})