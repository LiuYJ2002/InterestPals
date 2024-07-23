import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from './Chat';
import Message from './Message';
import HomeScreen from './HomeScreen';
import Search from './Search';
import Post from './Post';
import Profile from './Profile';
import EditProfile from './EditProfile';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const CustomButton = ({children, onPress}) => (
  <TouchableOpacity
    className="relative -top-7 flex justify-center items-center"
    onPress={onPress}
  >
    <View
      style ={{
        width: 70,
        height: 70,
        borderRadius: 35,
        
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const NavigationTab = () => {
  const getTabBarVisibility = (route) => {
    console.log(getFocusedRouteNameFromRoute(route))
    if (getFocusedRouteNameFromRoute(route) === 'Message') {
      return false;
    }
    return true;
  };
  return (
    
    <Tab.Navigator
      initialRouteName='Profile'
      
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 20,
          right: 20,
          elevation: 1,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          
        },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={10} style={StyleSheet.absoluteFill} />
        )
        
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon:({focused}) => (
          <View className="flex items-center justify-center">
            <Entypo name="home" size={30} color={focused ? '#16247d' : '#748c94'} />
            <Text
              style={{color: focused ? '#16247d' : '#748c94', fontSize: 14}}
            >
                HOME</Text>
          </View>
        )
      }}
      />
      <Tab.Screen name="Search" component={Search} 
        options={{
          tabBarIcon:({focused}) => (
            <View className="flex items-center justify-center">
              <AntDesign name="search1" size={30} color={focused ? '#16247d' : '#748c94'} />
              <Text
                style={{color: focused ? '#16247d' : '#748c94', fontSize: 14}}
              >
                  EXPLORE</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="Post" component={Post} 
        options={{
          tabBarIcon:({focused}) => (
            <View className="flex items-center justify-center">
              <AntDesign name="pluscircle" size={70} color={focused ? '#16247d' : '#748c94'} />
            </View>
          ),
          tabBarButton: (props) => (
            <CustomButton {...props} />
          )
        }}
      />
      <Tab.Screen name="Chat" component={ChatStacknav} 
        options={({route}) => ({
          
          tabBarStyle: { display:  getTabBarVisibility(route)? 'absolute' : 'none'},
          tabBarIcon:({focused}) => (
            <View className="flex items-center justify-center">
              <Entypo name="chat" size={30} color={focused ? '#16247d' : '#748c94'} />
              <Text
                style={{color: focused ? '#16247d' : '#748c94', fontSize: 14}}
              >
                  CHAT</Text>
            </View>
          )
        })}
      />
      
      <Tab.Screen name="Profile" component={ProfileStacknav} 
        options={{
          tabBarIcon:({focused}) => (
            <View className="flex items-center justify-center">
              <Ionicons name="settings" size={30} color={focused ? '#16247d' : '#748c94'} />
              <Text
                style={{color: focused ? '#16247d' : '#748c94', fontSize: 14}}
              >
                  PROFILE</Text>
            </View>
          )
        }}
      />
      </Tab.Navigator>
    
  );
};
export default NavigationTab;

const ProfileStacknav = ({navigation}) => {
  return(
    <Stack.Navigator
    >
      <Stack.Screen
        name = "Profile"
        component={Profile}
        options={{
          title: '',
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name = "EditProfile"
        component={EditProfile}
        
      />
    </Stack.Navigator>
  );
};

const ChatStacknav = ({navigation}) => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={Chat} />
    <Stack.Screen name="Message" component={Message}/>
  </Stack.Navigator>
  );
};




