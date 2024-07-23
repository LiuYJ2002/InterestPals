import React, {useState, useEffect} from 'react'
import {View, Image, Alert} from 'react-native'
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { FIREBASE_DB } from '@/firebaseConfig';
import {collection, Timestamp, setDoc, doc, getDoc, updateDoc, deleteDoc, arrayUnion} from "firebase/firestore"
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { FIREBASE_STORAGE } from '@/firebaseConfig';
import moment from 'moment';

const MyComponent = ({item, handleDelete, userData}) => {
    //console.log("userrrrrrrrrrrrrrrrsssb", userData)
    const user = FIREBASE_AUTH.currentUser;
    
    const LeftContent = () =>  <Avatar.Image  size={50} source={{uri: item.image}} />
    
    const handleJoin = async() => {
        const chatRef = doc(FIREBASE_DB, "posts", item.id);
        await updateDoc(chatRef, {
            users: arrayUnion(user.uid)
        });
        const userRef = doc(FIREBASE_DB, "users", user.uid)
        
        await updateDoc(userRef, {
            chats : arrayUnion(item.id)
        }).then(
            Alert.alert("Joined")
        )
        
    }
    return(    
    
        <Card className='mt-3'>
            <Card.Title title={item.name} subtitle={moment(item.createdAt.toDate()).fromNow()} left={LeftContent} />
            <Card.Content>
                <Text variant="bodyMedium">'Activity:' {item.Interest}</Text>
                <Text variant="bodyMedium">'Address:' {item.Location}</Text>
                <Text variant="bodyMedium">'Age:' {item.Age}</Text>
                <Text variant="bodyMedium">'Gender:' {item.Gender}</Text>
                <Text variant="bodyMedium">'Day:' {item.Day}</Text>
                <Text variant="bodyMedium">'Time:' {item.Time}</Text>
                <Text variant="bodyMedium">'Duration:' {item.Duration}</Text>
                <Text variant="bodyMedium">'skill level:' {item.skill}</Text>
                <Text variant="bodyMedium">'Additional comments:' {item.Comments}</Text>
            </Card.Content>
            <Card.Actions>
                {user.uid == item.userid ? null : <Button onPress={() => handleJoin()}>Join</Button>}
                {user.uid == item.userid ? <Button onPress={() => handleDelete(item.id)}>Delete</Button> : null}
            </Card.Actions>
        </Card>
    
    )
};


export default MyComponent;