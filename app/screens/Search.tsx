import React, {useState, useEffect} from 'react'
import { Text, View, Button, FlatList, StyleSheet, Image } from 'react-native'
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { FIREBASE_DB } from '@/firebaseConfig';
import {collection, Timestamp, setDoc, doc, getDoc, updateDoc, query, getDocs, orderBy} from "firebase/firestore"
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { FIREBASE_STORAGE } from '@/firebaseConfig';
import { Ionicons } from "@expo/vector-icons";
import MyComponent from '../component/Card';

const Search = () => {
  const user = FIREBASE_AUTH.currentUser;
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const getUser = async() => {
    //console.log("hi");
    const docRef = doc(FIREBASE_DB, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserData(docSnap.data());
    } else {
      
      console.log("No such document!");
    }
  }



  const getData = async () => {
    try {
      const list = [];
      const data = query(collection(FIREBASE_DB, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(data);
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
          createdAt
        } = doc.data();
        list.push({
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
          createdAt: createdAt
        });
      });
      
      setPosts(list);

      if (loading) {
        setLoading(false);
      }
      console.log(posts);
      
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
    getData();
    
  }, []);
  
  const ListHeader = () => {
    return null;
  };

  /*const renderPost = (post) => {
    
        <View style={styles.feedItem}>
            
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Text style={styles.name}>{post.Address}</Text>
                        
                    </View>

                    
                </View>
                <Text style={styles.post}>{post.text}</Text>
                <Image source={post.image} style={styles.postImage} resizeMode="cover" />
                <View style={{ flexDirection: "row" }}>
                    
                    
                </View>
            </View>
        </View>
    ;
  };*/
  
      return (
          <View style={styles.container}>
              <View style={styles.header}>
                  <Text style={styles.headerTitle}>Feed</Text>
              </View>

              <FlatList
                  style={styles.feed}
                  data={posts}
                  //renderItem={({ item }) => renderPost(item)}
                  renderItem={({ item }) => <MyComponent className="mt-10" item = {item} userData = {userData}></MyComponent>}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={ListHeader}
                  ListFooterComponent={ListHeader}
              ></FlatList>
          </View>
      );
    

}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#EBECF4"
  },
  header: {
      paddingBottom: 10,
      backgroundColor: "#FFF",
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#EBECF4",
      shadowColor: "#454D65",
      shadowOffset: { height: 5 },
      shadowRadius: 15,
      shadowOpacity: 0.2,
      zIndex: 10
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: "500"
  },
  feed: {
      marginHorizontal: 16
  },
  feedItem: {
      backgroundColor: "#FFF",
      borderRadius: 5,
      padding: 8,
      flexDirection: "row",
      marginVertical: 8
  },
  avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      marginRight: 16
  },
  name: {
      fontSize: 15,
      fontWeight: "500",
      color: "#454D65"
  },
  timestamp: {
      fontSize: 11,
      color: "#C4C6CE",
      marginTop: 4
  },
  post: {
      marginTop: 16,
      fontSize: 14,
      color: "#838899"
  },
  postImage: {
      width: undefined,
      height: 150,
      borderRadius: 5,
      marginVertical: 16
  }
});

export default Search;