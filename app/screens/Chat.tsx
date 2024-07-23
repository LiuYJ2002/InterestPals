import React , {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { FIREBASE_DB } from '@/firebaseConfig';
import {collection, Timestamp, setDoc, doc, getDoc, updateDoc, addDoc, query, documentId, where, getDocs} from "firebase/firestore"
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { FIREBASE_STORAGE } from '@/firebaseConfig';
import Loading from '../component/Loading';
import { Divider, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core'
import { useFocusEffect } from '@react-navigation/native';
const Chat = ({navigation}) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const user = FIREBASE_AUTH.currentUser;
  
  //const navigation = useNavigation()
  const getData = async() => {
    const docRef = doc(FIREBASE_DB, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data())
      if(docSnap.data().chats.length == 0){
        setLoading(false)
        setChats([])
        alert("Please join an interest group first")
      }
      else {
        const list = [];
        
        
        
        const chatRooms = query(collection(FIREBASE_DB, "posts"), where(documentId(), 'in', docSnap.data().chats.map((id) => doc(FIREBASE_DB, "posts", id))))
        
        const querySnapshot = await getDocs(chatRooms);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
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
              users,
              messages,
              createdAt
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
              createdAt: createdAt,
              users:users,
              messages:messages
            });
            
        });
        console.log("rooms", list)
        setChats(list)
        if (loading) {
          setLoading(false);
        }
      }
    } else {
      console.log("No such document!");
      if (loading) {
        setLoading(false);
      }
    }
    
  }
  useFocusEffect(
    React.useCallback(() => {
    getData();
  }, []))

  if (loading) {
    return <Loading />;
  }
    return (
      <View style={styles.container}>
  <FlatList
    data={chats}
    keyExtractor={(item) => item.id}
    ItemSeparatorComponent={() => <Divider />}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate("Message", {item, userData})}>
        <List.Item
          title={item.Interest + " at " + item.Location}
          description={"Start at " + item.Time}
          titleNumberOfLines={1}
          titleStyle={styles.listTitle}
          descriptionStyle={styles.listDescription}
          descriptionNumberOfLines={1}
        />
      </TouchableOpacity>
    )}
  />
</View>
    );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});