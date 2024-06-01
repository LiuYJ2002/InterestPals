import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from '@/firebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Home')
      }
    })

    return unsubscribe
  }, [])
  const auth = FIREBASE_AUTH;
  const handleSignUp = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered user:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    
      signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView
      className = "flex-1 justify-center items-center"
      behavior="padding"
    >
      <Text className='"lg:text-6xl lg:tracking-tighter lg:leading-[4rem] lg:font-extrabold sm:text-5xl sm:tracking-tight sm:font-bold text-4xl tracking-tight font-bold text-slate-900 dark:text-slate-100"'>
        InterestPals
      </Text>
      <View className='w-4/5'>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          className = "bg-white px-3 py-2.5 rounded-lg mt-2"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          className = "bg-white px-3 py-2.5 rounded-lg mt-2"
          secureTextEntry
        />
      </View>

      <View className='w-3/5 justify-center items-center mt-10'>
        <TouchableOpacity
          onPress={handleLogin}
          className='bg-blue-600 w-full p-4 rounded-lg items-center'
        >
          <Text className='text-white font-bold text base'>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          className='bg-blue-600 w-full p-4 rounded-lg items-center bg-white mt-1.5 border-blue-600 bordrer-2'
        >
          <Text className='text-blue-600 font-bold text-base'>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

