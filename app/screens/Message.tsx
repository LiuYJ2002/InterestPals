import React, { useState, useCallback, useEffect} from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { ActivityIndicator, View} from 'react-native';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { FIREBASE_DB } from '@/firebaseConfig';
import {collection, doc, updateDoc, addDoc, query, orderBy, onSnapshot} from "firebase/firestore"

const Message = ({route}) => {

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
      <View className='flex-1 flex items-center justify-center'>
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

