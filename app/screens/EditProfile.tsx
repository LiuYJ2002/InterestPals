import React from 'react'
import { Text, View, Button } from 'react-native'

const EditProfile = () => {
    return (
      <View>
        <Text> textInComponent </Text>
        <Button
            title = "click"
            onPress={() => alert('clicked')}
        />
      </View>
    )
}

export default EditProfile;
