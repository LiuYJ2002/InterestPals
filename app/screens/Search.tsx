import React, {useState, useEffect} from 'react'
import { Text, View, FlatList, Alert } from 'react-native'
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { FIREBASE_DB } from '@/firebaseConfig';
import {collection,doc, getDoc, updateDoc, query, getDocs, orderBy, deleteDoc, where} from "firebase/firestore"
import { useNavigation} from '@react-navigation/core'
import MyComponent from '../component/Card';
import Loading from '../component/Loading';
import { useFocusEffect } from '@react-navigation/native';

const Search = () => {
  const user = FIREBASE_AUTH.currentUser;
  const navigation = useNavigation();
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [deleted, setDeleted] = useState(false);
  
    const handleDelete = async(postId) => {
      // get the users array first
      Alert.alert(
        'Delete post',
        'Action is irreversible',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed!'),
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: async() => {
              const docRef = doc(FIREBASE_DB, "posts", postId);
              const docSnap = await getDoc(docRef);
              console.log('userchatarray', docSnap.data().users)
              docSnap.data().users.map(async(x) => {
                const userRef = doc(FIREBASE_DB, "users", x);
                await updateDoc(userRef, {
                  chats: arrayRemove(postId)
              });
              })
              await deleteDoc(doc(FIREBASE_DB, "posts", postId));
              Alert.alert('Deleted')
              setDeleted(true)},
          },
        ],
        {cancelable: false},
      );
      
    }
  const getData = async () => {
    try {
      const list = [];
      const users =[];
      const data = query(collection(FIREBASE_DB, "posts"), orderBy("createdAt", "desc"), where("userid", "!=", user.uid));
      const querySnapshot = await getDocs(data);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const {
          Address,
          Age,
          Day,
          Duration,
          Gender,
          Interest,
          Location,
          Time,
          skill,
          userid,
          name,
          image,
          createdAt,
          Comments
        } = doc.data();
        list.push({
          id : doc.id,
          Address : Address,
          Age : Age,
          Day : Day,
          Duration : Duration,
          Gender : Gender,
          Interest : Interest,
          Location : Location,
          Time : Time,
          skill : skill,
          userid : userid,
          name : name,
          image : image,
          createdAt: createdAt,
          Comments: Comments
        });
        users.push({
          name:name,
          image:image
        })
      });
      
      setPosts(list);
      setUserData(users)
      

      if (loading) {
        setLoading(false);
      }
      console.log(posts);
      
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [navigation])
  )
  
  useFocusEffect(
    React.useCallback(() => {
      getData();
      setDeleted(false);
      
    }, [deleted, navigation])
  );
  if (loading) {
    return <Loading />;
  }
  const ListHeader = () => {
    return null;
  };
  
      return (
          <View className='flex-1 bg-gray-200'>
              <View className='pb-2.5 bg-white flex items-center justify-center border-b border-gray-200 shadow-md z-10'>
                  <Text className='text-xl font-medium'>Explore</Text>
              </View>

              <FlatList
                  className='mx-4'
                  data={posts}
                  renderItem={({ item }) => <MyComponent className="mt-10" item = {item} userData = {userData} handleDelete = {handleDelete}></MyComponent>}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={ListHeader}
                  ListFooterComponent={ListHeader}
              ></FlatList>
              <View className='mb-24'></View>
          </View>
      );
    

}

export default Search;