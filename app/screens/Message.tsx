import React, { useState, useCallback, useEffect, useContext, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { FIREBASE_DB } from '@/firebaseConfig';
import {collection, Timestamp, setDoc, doc, getDoc, updateDoc, addDoc, query, documentId, where, getDocs, orderBy, onSnapshot} from "firebase/firestore"
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { FIREBASE_STORAGE } from '@/firebaseConfig';
import Loading from '../component/Loading';
const Message = ({route}) => {
  //const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([])
  const user = FIREBASE_AUTH.currentUser;
  const  {item, userData}  = route.params;
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    
    const data = query(collection(doc(FIREBASE_DB, "posts", item.id), "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(data, (querySnapshot) => setMessages(
      querySnapshot.docs.map(doc =>({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }))
    )
    
    );
    return () => unsubscribe();
    
    
  }, [])

  const onSend = useCallback(async(messages = []) => {
    
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
    const {
        _id,
        createdAt,
        text,
        user
    } = messages[0]
    
    const docRef = await addDoc(collection(doc(FIREBASE_DB, "posts", item.id), "messages"), {
      /*_id : messages[0]._id,
      createdAt: new Date().getTime(),
      text : messages[0].text,
      
      user: {
        userid: user.uid,
        name :userData.name,
        avatar: userData.userImg,
        email: userData.email
        
      }*/
        _id,
        createdAt,
        text,
        user
    });
    console.log("Document written with ID: ", docRef.id);
    await updateDoc(doc(FIREBASE_DB, "posts", item.id), {
      lastMessage : {
        text,
        createdAt: new Date().getTime()
      }
    })
    
    
  }, []);
  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee' />
      </View>
    );
  }
  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: userData.email,
        name: userData.name,
        avatar: userData.userImg
      }}
      alwaysShowSend
      scrollToBottom
      renderUsernameOnMessage = {true}
      renderLoading={renderLoading}
    />
  )
}

export default Message;

const styles = StyleSheet.create({
  // rest remains same
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});