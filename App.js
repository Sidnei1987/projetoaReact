/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/component/home';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen options={{headerShown:false}} name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
