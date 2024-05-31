import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import ImagePicker from 'react-native-image-picker';

const ProfilePage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setName(docSnap.data().name);
          setEmail(docSnap.data().email);
          setBio(docSnap.data().bio);
          setProfileImage(docSnap.data().profileImage);
        } else {
          console.log('No such document!');
        }
      }
      setIsLoading(false);
    };
    fetchProfileData();
  }, []); 

  const handleSaveProfile = async () => {
    setIsLoading(true);
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, {
          name: name,
          bio: bio,
          profileImage: profileImage, 
        });
        Alert.alert('Profile Updated', 'Your profile has been updated!');
        setIsEditing(false); // Stop editing mode
      } catch (error) {
        console.error('Error updating profile: ', error);
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleImagePicker = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setName(auth.currentUser.displayName); // Reset name
    setEmail(auth.currentUser.email); // Reset email
    setBio(''); // Reset bio
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity onPress={handleImagePicker} style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imagePlaceholder}>Add Profile Image</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={[styles.input, { marginBottom: 10 }]}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        editable={isEditing}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        editable={false} 
      />

      <TextInput
        style={[styles.input, { marginBottom: 20 }]}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        editable={isEditing}
        multiline={true}
        numberOfLines={4}
      />

      {/* Buttons */}
      {isEditing ? (
        <>
          <Button title="Save Changes" onPress={handleSaveProfile} disabled={isLoading} />
          <Button title="Cancel" onPress={handleCancelEdit} />
        </>
      ) : (
        <Button title="Edit Profile" onPress={handleEditProfile} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imagePlaceholder: {
    fontSize: 16,
    color: 'gray',
  },
});

export default ProfilePage;