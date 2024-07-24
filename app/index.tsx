
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import NavigationTab from './screens/NavigationTab';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeWindStyleSheet } from "nativewind";

const Stack = createNativeStackNavigator();

export default function App() {
  NativeWindStyleSheet.setOutput({
    default: "native",
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer independent={true}>
      
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={NavigationTab} />
        
      </Stack.Navigator>
      
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

