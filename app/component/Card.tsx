import React, {useState, useEffect} from 'react'
import {View, Image, Alert} from 'react-native'
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { FIREBASE_DB } from '@/firebaseConfig';
import {collection, Timestamp, setDoc, doc, getDoc, updateDoc, deleteDoc} from "firebase/firestore"
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { FIREBASE_STORAGE } from '@/firebaseConfig';
import moment from 'moment';

const MyComponent = ({item, handleDelete}) => {
    const user = FIREBASE_AUTH.currentUser;
    
    const LeftContent = () =>  <Avatar.Icon  icon="folder" />
    
    
    return(    
    <View className='mt-10'>
        <Card className='mt-5'>
            <Card.Title title='User' subtitle={moment(item.createdAt.toDate()).fromNow()} left={LeftContent} />
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
                {user.uid == item.userid ? null : <Button>Join</Button>}
                {user.uid == item.userid ? <Button onPress={() => handleDelete(item.id)}>Delete</Button> : null}
            </Card.Actions>
        </Card>
    </View>
    )
};


export default MyComponent;