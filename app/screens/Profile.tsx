import React , {useState, useEffect}from 'react';
import {View, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Text,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { useNavigation } from '@react-navigation/core'
import { FIREBASE_DB } from '@/firebaseConfig';
import {collection, Timestamp, setDoc, doc, getDoc, updateDoc} from "firebase/firestore"
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { FIREBASE_STORAGE } from '@/firebaseConfig';
import Loading from '../component/Loading';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = FIREBASE_AUTH.currentUser;
  const navigation = useNavigation()
  const auth = FIREBASE_AUTH;
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }
  const getUser = async() => {
    //console.log("hi");
    const docRef = doc(FIREBASE_DB, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserData(docSnap.data());
      if (loading) {
        setLoading(false);
      }
    } else {
      
      console.log("No such document!");
      if (loading) {
        setLoading(false);
      }
    }
    
  }
  
  useEffect(() => {
    getUser();
    navigation.addListener("focus", () => setLoading(loading?loading:!loading));
  }, [navigation, loading]);
  if (loading) {
    return <Loading />;
  }
  return (
    <SafeAreaView className='flex-1'>
      <View className='px-7 mb-4' 
      >
        
        <View className='flex-row mt-6 flex-row justify-center'>
          <Avatar.Image
            source={{uri: userData ? userData.userImg :'@assets/images/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'}}
            size={100}
          />
        </View> 
        <View className='mt-4 flex-row justify-center' >
          <Title  className='text-3xl font-bold '
          >{userData ? userData.name : 'USER'}</Title>
        </View>
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-blue-600 p-4 rounded-xl items-center mt-2 justify-center flex-row"
          >
          <Text className='text-white font-bold text base'>Sign out</Text>
        </TouchableOpacity>
      </View>
      <View className='px-8 mb-6 '>
        <View className='flex-row mb-10'>
          <MaterialCommunityIcons name='email' color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft:20}}>{userData ? userData.email : '-'}</Text>
        </View>
        <View className='flex-row mb-10'>
        <MaterialCommunityIcons name='cellphone' color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft:20}}>{userData ? userData.phone : '-'}</Text>
        </View>
        <View className='flex-row mb-10'>
        <MaterialCommunityIcons name='human' color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft:20}}>{userData ? userData.age : '-'}</Text>
        </View>
        <View className='flex-row mb-10'>
        <MaterialCommunityIcons name='human-male-female' color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft:20}}>{userData ? userData.gender : '-'}</Text>
        </View>
        <View className='flex-row mb-10'>
        <MaterialCommunityIcons name='map-marker' color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft:20}}>{userData ? userData.location : '-'}</Text>
        </View>
        <View className='flex-row mb-10'>
        <MaterialCommunityIcons name='star' color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft:20}}>{userData ? userData.interest : '-'}</Text>
        </View>
        <View className='flex-row mb-10'>
        <MaterialCommunityIcons name='thumb-up' color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft:20}}>{userData ? userData.availability : '-'}</Text>
        </View>
        
      </View>
      
        
    </SafeAreaView>
    
    
  )
}

export default Profile

const styles = StyleSheet.create({
  
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    
    justifyContent: 'center',
    
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})