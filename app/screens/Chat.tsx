import React from 'react'
import { Text, View, Button } from 'react-native'

const Chat = () => {
    return (
      <View>
        <Text> Chat </Text>
        <Button
            title = "click"
            onPress={() => alert('clicked')}
        />
      </View>
    )
}

export default Chat;
