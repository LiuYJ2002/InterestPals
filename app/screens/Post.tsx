import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { FIREBASE_DB } from '@/firebaseConfig';
import {collection, Timestamp, setDoc, doc, getDoc, updateDoc, addDoc} from "firebase/firestore"
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { FIREBASE_STORAGE } from '@/firebaseConfig';

const Interestdata = [
  { label: 'Basketball', value: 'Basketball' },
  { label: 'Swimming', value: 'Swimming' },
  { label: 'Soccer', value: 'Soccer' },
  { label: 'Tennis', value: 'Tennis' },
  { label: 'Baseball', value: 'Baseball' },
  { label: 'Golf', value: 'Golf' },
  { label: 'Cycling', value: 'Cycling' },
  { label: 'Running', value: 'Running' },
  { label: 'Volleyball', value: 'Volleyball' },
  { label: 'Badminton', value: 'Badminton' },
  { label: 'Table Tennis', value: 'Table Tennis' },
  { label: 'Rugby', value: 'Rugby' },
  { label: 'Cricket', value: 'Cricket' },
  { label: 'Hockey', value: 'Hockey' },
  { label: 'Boxing', value: 'Boxing' },
  { label: 'Martial Arts', value: 'Martial Arts' },
  { label: 'Gymnastics', value: 'Gymnastics' },
  { label: 'Skateboarding', value: 'Skateboarding' },
  { label: 'Surfing', value: 'Surfing' },
  { label: 'Skiing', value: 'Skiing' },
  { label: 'Snowboarding', value: 'Snowboarding' },
  { label: 'Wrestling', value: 'Wrestling' },
  { label: 'Diving', value: 'Diving' },
  { label: 'Rowing', value: 'Rowing' },
];
const Daydata = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' },
];
const Agedata = [
  { label: '0 - 10', value: '0 - 10' },
  { label: '11 - 20', value: '11 - 20' },
  { label: '21 - 30', value: '21 - 30' },
  { label: '31 - 40', value: '31 - 40' },
  { label: '41 - 50', value: '41 - 50' },
  { label: '51 - 60', value: '51 - 60' },
  { label: '61 - 70', value: '61 - 70' },
  { label: '71 - 80', value: '71 - 80' },
  { label: '81 - 90', value: '81 - 90' },
  { label: '91 - 100', value: '91 - 100' },
];
const Locationdata = [
  { label: 'Ang Mo Kio', value: 'Ang Mo Kio' },
  { label: 'Bedok', value: 'Bedok' },
  { label: 'Bishan', value: 'Bishan' },
  { label: 'Bugis', value: 'Bugis' },
  { label: 'Bukit Batok', value: 'Bukit Batok' },
  { label: 'Bukit Gombak', value: 'Bukit Gombak' },
  { label: 'Buona Vista', value: 'Buona Vista' },
  { label: 'Changi Airport', value: 'Changi Airport' },
  { label: 'Choa Chu Kang', value: 'Choa Chu Kang' },
  { label: 'City Hall', value: 'City Hall' },
  { label: 'Clementi', value: 'Clementi' },
  { label: 'Dhoby Ghaut', value: 'Dhoby Ghaut' },
  { label: 'Eunos', value: 'Eunos' },
  { label: 'HarbourFront', value: 'HarbourFront' },
  { label: 'Hougang', value: 'Hougang' },
  { label: 'Jurong East', value: 'Jurong East' },
  { label: 'Kallang', value: 'Kallang' },
  { label: 'Kembangan', value: 'Kembangan' },
  { label: 'Khatib', value: 'Khatib' },
  { label: 'Kranji', value: 'Kranji' },
  { label: 'Lakeside', value: 'Lakeside' },
  { label: 'Lavender', value: 'Lavender' },
  { label: 'Little India', value: 'Little India' },
  { label: 'Marina Bay', value: 'Marina Bay' },
  { label: 'Newton', value: 'Newton' },
  { label: 'Novena', value: 'Novena' },
  { label: 'Orchard', value: 'Orchard' },
  { label: 'Outram Park', value: 'Outram Park' },
  { label: 'Pasir Ris', value: 'Pasir Ris' },
  { label: 'Paya Lebar', value: 'Paya Lebar' },
  { label: 'Pioneer', value: 'Pioneer' },
  { label: 'Punggol', value: 'Punggol' },
  { label: 'Queenstown', value: 'Queenstown' },
  { label: 'Raffles Place', value: 'Raffles Place' },
  { label: 'Redhill', value: 'Redhill' },
  { label: 'Sembawang', value: 'Sembawang' },
  { label: 'Sengkang', value: 'Sengkang' },
  { label: 'Serangoon', value: 'Serangoon' },
  { label: 'Somerset', value: 'Somerset' },
  { label: 'Tampines', value: 'Tampines' },
  { label: 'Tanjong Pagar', value: 'Tanjong Pagar' },
  { label: 'Tiong Bahru', value: 'Tiong Bahru' },
  { label: 'Toa Payoh', value: 'Toa Payoh' },
  { label: 'Woodlands', value: 'Woodlands' },
  { label: 'Yew Tee', value: 'Yew Tee' },
  { label: 'Yishun', value: 'Yishun' },
];
const Genderdata = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Open to all', value: 'Open to all' },
  { label: 'Other', value: 'Other' },
];
const Skilldata = [
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
  { label: 'Expert', value: 'Expert' },
  { label: 'Professional', value: 'Professional' },
];
const StartTimedata = [
  { label: '0000', value: '0000' },
  { label: '0100', value: '0100' },
  { label: '0200', value: '0200' },
  { label: '0300', value: '0300' },
  { label: '0400', value: '0400' },
  { label: '0500', value: '0500' },
  { label: '0600', value: '0600' },
  { label: '0700', value: '0700' },
  { label: '0800', value: '0800' },
  { label: '0900', value: '0900' },
  { label: '1000', value: '1000' },
  { label: '1100', value: '1100' },
  { label: '1200', value: '1200' },
  { label: '1300', value: '1300' },
  { label: '1400', value: '1400' },
  { label: '1500', value: '1500' },
  { label: '1600', value: '1600' },
  { label: '1700', value: '1700' },
  { label: '1800', value: '1800' },
  { label: '1900', value: '1900' },
  { label: '2000', value: '2000' },
  { label: '2100', value: '2100' },
  { label: '2200', value: '2200' },
  { label: '2300', value: '2300' },
];
const Durationdata = [
  { label: '1 hour', value: '1 hour' },
  { label: '2 hours', value: '2 hours' },
  { label: '3 hours', value: '3 hours' },
  { label: '4 hours', value: '4 hours' },
  { label: '5 hours', value: '5 hours' },
  { label: '6 hours', value: '6 hours' },
  { label: '7 hours', value: '7 hours' },
  { label: '8 hours', value: '8 hours' },
  { label: '9 hours', value: '9 hours' },
  { label: '10 hours', value: '10 hours' },
];
const DropdownComponent = () => {
  const [Interest, setInterest] = useState(null);
  const [Time, setTime] = useState(null);
  const [Duration, setDuration] = useState(null);
  const [Day, setDay] = useState(null);
  const [Age, setAge] = useState(null);
  const [Gender, setGender] = useState(null);
  const [Location, setLocation] = useState(null);
  const [skill, setSkill] = useState(null);
  const [Address, setAddress] = useState('')
  const [Comments, setComments] = useState('')
  
  const user = FIREBASE_AUTH.currentUser;
 
  const submitPost = async () => {
    
//note this doesnt make new posts
      addDoc(collection(FIREBASE_DB, "posts"), {
        Interest : Interest,
        Time : Time,
        Duration : Duration,
        Day : Day,
        Age : Age,
        Gender : Gender,
        Location : Location,
        skill : skill,
        Address : Address,
        userid : user.uid,
        likes : null,
        Comments : Comments,
        createdAt: Timestamp.fromDate(new Date()),
        
      })
      .then(() => {Alert.alert('Posted!')
        setInterest(null);
        setDay(null);
        setTime(null);
        setDuration(null);
        setAge(null);
        setGender(null);
        setLocation(null);
        setSkill(null);
        setAddress('');
      })    
      .catch(error => {
      console.log('Something went wrong with added user to firestore: ', error);
      })

    
  }
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        
      </View>
    );
  };

  return (
    
      <KeyboardAvoidingView 
      behavior="padding">
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Interestdata}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Interest"
          searchPlaceholder="Search..."
          //value={Interestdata}
          onChange={item => {
            setInterest(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
          renderItem={renderItem}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Daydata}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Day"
          searchPlaceholder="Search..."
          //value={Date}
          onChange={item => {
            setDay(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
          renderItem={renderItem}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={StartTimedata}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Start Time"
          searchPlaceholder="Search..."
          //value={Time}
          onChange={item => {
            setTime(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
          renderItem={renderItem}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Durationdata}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Duration"
          searchPlaceholder="Search..."
          //value={Time}
          onChange={item => {
            setDuration(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
          renderItem={renderItem}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Agedata}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Age"
          searchPlaceholder="Search..."
          //value={Date}
          onChange={item => {
            setAge(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
          renderItem={renderItem}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Locationdata}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Location"
          searchPlaceholder="Search..."
          //value={Date}
          onChange={item => {
            setLocation(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
          renderItem={renderItem}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Genderdata}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Gender"
          searchPlaceholder="Search..."
          //value={Date}
          onChange={item => {
            setGender(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
          renderItem={renderItem}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Skilldata}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Skill Level"
          searchPlaceholder="Search..."
          //value={Date}
          onChange={item => {
            setSkill(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
          renderItem={renderItem}
        />
      
        <TextInput
          multiline
          numberOfLines={4} 
          className='w-full h-20 p-4 border border-gray-300 rounded-lg bg-white mb-2'
          placeholder="Additional comments..."
          onChangeText={text => setComments(text)}
        />
        <TouchableOpacity
            onPress={submitPost}
            className='bg-blue-600  p-4 rounded-lg items-center '
          >
            <Text className='text-white font-bold text base'>Post</Text>
          </TouchableOpacity>
          </KeyboardAvoidingView>
    
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});