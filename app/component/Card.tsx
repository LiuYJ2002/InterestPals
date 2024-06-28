import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { FIREBASE_DB } from '@/firebaseConfig';
import {collection, Timestamp, setDoc, doc, getDoc, updateDoc} from "firebase/firestore"
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { FIREBASE_STORAGE } from '@/firebaseConfig';

const MyComponent = ({item, userData}) => {
    
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    
    
    
    return(    
    <View className='mt-10'>
        <Card className='mt-5'>
            <Card.Title title={userData.name} subtitle='tt' left={LeftContent} />
            <Card.Content>
            <Text variant="titleLarge">{item.Address}</Text>
            <Text variant="bodyMedium">Card content</Text>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
            </Card.Actions>
        </Card>
    </View>
    )
};


export default MyComponent;