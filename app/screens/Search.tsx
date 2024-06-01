import React from 'react'
import { Text, View, Button } from 'react-native'

const Search = () => {
    return (
      <View>
        <Text> Profile </Text>
        <Button
            title = "click"
            onPress={() => alert('clicked')}
        />
      </View>
    )
}

export default Search;