import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetBackdropProps, } from '@gorhom/bottom-sheet';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


const EditProfile = () => {
  const [image, setImage] = useState('@/assets/images/react-logo.png');
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
              John Doe
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
              />
            </View>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='email' size={20}/>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
              />
            </View>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='phone' size={20}/>
              <TextInput
                placeholder="Phone"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
              />
            </View>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='human' size={20}/>
              <TextInput
                placeholder="Age"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
              />
            </View>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='human-male-female' size={20}/>
              <TextInput
                placeholder="Gender"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
              />
            </View>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='map-marker' size={20}/>
              <TextInput
                placeholder="Location"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
              />
            </View>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='star' size={20}/>
              <TextInput
                placeholder="Interest"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
              />
            </View>
            <View className='flex flex-row mt-2 mb-2 border-b border-gray-200 pb-1.5'>
              <MaterialCommunityIcons name='thumb-up' size={20}/>
              <TextInput
                placeholder="Availability"
                placeholderTextColor="#666666"
                autoCorrect={false}
                className='flex-1 pl-2 text-gray-800'
              />
            </View>
          </View>
          <TouchableOpacity className='px-6 py-4 rounded-lg bg-rose-600 text-white font-bold items-center' onPress={() => {}}>
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
    
    
   );
};

export default EditProfile;

