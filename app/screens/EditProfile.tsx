import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetBackdropProps, } from '@gorhom/bottom-sheet';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { FIREBASE_DB } from '@/firebaseConfig';
import {doc, getDoc, updateDoc} from "firebase/firestore"
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { FIREBASE_STORAGE } from '@/firebaseConfig';

const EditProfile = () => {
  const [image, setImage] = useState('@/assets/images/react-logo.png');
  const [userData, setUserData] = useState(null);
  const user = FIREBASE_AUTH.currentUser;
  
  const getUser = async() => {
    const docRef = doc(FIREBASE_DB, "users", user.uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  const storageref = ref(FIREBASE_STORAGE);
  
  const uploadImage =  async() => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const fileRef = ref(FIREBASE_STORAGE, `photos/${filename}`);
    try{
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      const result = await uploadBytes(fileRef, blob);
      blob.close();
      const img = await getDownloadURL(fileRef)
      .then((url) => {
        setImage(null);
        console.log("new imgaaaa", url)
        return url;
        
      })
      .catch((error) => {
        return null;
      });
      
      return img;
    } catch (e) {
      return null;
    }
    
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = async() => {
   
    let imgUrl = await uploadImage();
    
    if( imgUrl == null && userData.userImg ) {
      imgUrl = userData.userImg;
    }

    const Ref = doc(FIREBASE_DB, "users", user.uid);
    updateDoc(Ref, {
      name: userData.name,
      phone: userData.phone,
      age: userData.age,
      gender: userData.gender,
      location: userData.location,
      interest: userData.interest,
      availability: userData.availability,
      userImg: imgUrl,
    })
      .then(() => {
        console.log('User Updated!');
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.'
        );
      })
  }
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(true);
  const handleSnap = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);
  const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
        pressBehavior={'close'}
				appearsOnIndex={0}
        disappearsOnIndex={-1}
        enableTouchThrough={false}
        opacity={0.5}
			/>
		),
		[]
	);

  const snapPoints = ["50%" , "100%"];
 
  const takePhotoFromCamera = () => {
    const options = {
      mediaType: 'photo',
      base64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    ImagePicker.launchCameraAsync(options).then((response) => {
      console.log(response); 
      if (!response.cancelled && !response.errorCode) {
          
          setImage( response.assets[0].uri); 
          console.log(response.assets[0].uri); 
      } else {
          console.log(response); 
      }
  })
  }

  const choosePhotoFromLibrary = () => {
    const options = {
      mediaType: 'photo',
      base64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchImageLibraryAsync(options).then((response) => {
      console.log(response); 
      if (!response.cancelled && !response.errorCode) {
          
          setImage( response.assets[0].uri); 
      } else {
          console.log(response); 
      }
  });
  }

  const RenderContent = () => (
    <View className='p-5 pt-5 opacity-100'>
      <View className='items-center'>
        <Text className='text-2xl h-9'>Upload Photo</Text>
        <Text className='text-sm text-gray-500 h-7 mb-2.5'>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity className='px-6 py-4 rounded-lg bg-rose-600 text-white font-bold items-center' onPress={takePhotoFromCamera}>
        <Text className='text-lg font-bold text-white '>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity className='mt-6 px-6 py-4 rounded-lg bg-rose-600 text-white font-bold items-center' onPress={choosePhotoFromLibrary}>
        <Text className='text-lg font-bold text-white'>Choose From Library</Text>
      </TouchableOpacity>
      
    </View>
  );
  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    >
    <View className='flex-1'>
        <View style={{margin: 20,
      }}>
          <View className='items-center'>
            <TouchableOpacity onPress={() => handleSnap(0)}>
              <View
                className="h-100 w-100 rounded-lg flex justify-center items-center">
                <ImageBackground
                  source={{uri: image}}
                  style={{height: 100, width: 100}}
                  imageStyle={{borderRadius: 15}}>
                  <View
                    className="flex-1 justify-center items-center"
                  >
                      <MaterialCommunityIcons
                        name='camera'
                        size={35}
                        color="#fff"
                        className="opacity-70 flex items-center justify-center border border-white rounded-lg"
                      />
                    
                  </View>
                </ImageBackground>
              </View>
              </TouchableOpacity>
            <Text className="mt-6 text-2xl font-bold">
              {userData ? userData.name : ''}
            </Text>
          </View>

          
          <View className='px-8 mb-6 mt-6'>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='rename-box' size={20}/>
              <TextInput
                placeholder="Name"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
                value={userData ? userData.name : ''}
                onChangeText={(txt) => setUserData({...userData, name: txt})}
              />
            </View>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='email' size={20}/>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
                value={userData ? userData.email : ''}
                onChangeText={(txt) => setUserData({...userData, email: txt})}
              />
            </View>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='phone' size={20}/>
              <TextInput
                placeholder="Phone"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
                value={userData ? userData.phone : ''}
                onChangeText={(txt) => setUserData({...userData, phone: txt})}
              />
            </View>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='human' size={20}/>
              <TextInput
                placeholder="Age"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
                value={userData ? userData.age : ''}
                onChangeText={(txt) => setUserData({...userData, age: txt})}
              />
            </View>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='human-male-female' size={20}/>
              <TextInput
                placeholder="Gender"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
                value={userData ? userData.gender : ''}
                onChangeText={(txt) => setUserData({...userData, gender: txt})}
              />
            </View>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='map-marker' size={20}/>
              <TextInput
                placeholder="Location"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
                value={userData ? userData.location : ''}
              onChangeText={(txt) => setUserData({...userData, location: txt})}
              />
            </View>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='star' size={20}/>
              <TextInput
                placeholder="Interest"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
                value={userData ? userData.interest : ''}
                onChangeText={(txt) => setUserData({...userData, interest: txt})}
              />
            </View>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='thumb-up' size={20}/>
              <TextInput
                placeholder="Availability"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
                value={userData ? userData.availability : ''}
                onChangeText={(txt) => setUserData({...userData, availability: txt})}
              />
            </View>
          </View>
          <TouchableOpacity className='px-6 py-4 rounded-lg bg-rose-600 text-white font-bold items-center' onPress={handleChange}>
            <Text className='text-lg font-bold text-white'>Submit</Text>
          </TouchableOpacity>
        </View>
        <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
    
        index={-1}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView className='flex-1 '>
          <RenderContent/>
        </BottomSheetView>
      </BottomSheet>
        
        
    </View>
    
    </KeyboardAvoidingView>
   );
};

export default EditProfile;

