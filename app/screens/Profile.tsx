import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {
  Avatar,
  Title,
  Text,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Profile = () => {
  return (
    <SafeAreaView className='flex-1'>
      <View className='px-7 mb-6' 
      >
        <View className='flex-row mt-10 flex-row justify-center'>
          <Avatar.Image
            source={require('@/assets/images/react-logo.png')}
            size={100}
          />
        </View> 
        <View className='mt-4 flex-row justify-center' >
          <Title  className='text-3xl font-bold '
          >John</Title>
        </View>
      </View>
      <View className='px-8 mb-6 mt-6'>
        <View className='flex-row mb-10'>
          <MaterialCommunityIcons name='email' color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft:20}}>Email</Text>
        </View>
        <View className='flex-row mb-10'>
        <MaterialCommunityIcons name='cellphone' color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft:20}}>Phone</Text>
        </View>
        <View className='flex-row mb-10'>
        <MaterialCommunityIcons name='human' color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft:20}}>Age</Text>
        </View>
        <View className='flex-row mb-10'>
        <MaterialCommunityIcons name='human-male-female' color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft:20}}>Gender</Text>
        </View>
        <View className='flex-row mb-10'>
        <MaterialCommunityIcons name='map-marker' color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft:20}}>Location</Text>
        </View>
        <View className='flex-row mb-10'>
        <MaterialCommunityIcons name='star' color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft:20}}>Interest</Text>
        </View>
        <View className='flex-row mb-10'>
        <MaterialCommunityIcons name='thumb-up' color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft:20}}>Availability</Text>
        </View>
        



      </View>
  
    </SafeAreaView>
    
    
  )
}

export default Profile

