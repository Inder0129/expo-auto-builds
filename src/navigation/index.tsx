import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, ExploreScreen, ProfileScreen, LoginScreen, RegisterScreen, DetailScreen, SettingsScreen } from '../constants/routes';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Detail" component={DetailScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Explore" component={ExploreScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export const MainNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
    <Stack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
    <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
  </Stack.Navigator>
);