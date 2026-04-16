import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CalculatorScreen, HistoryScreen, SettingsScreen } from '../constants/routes';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CalculatorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={CalculatorScreen} component={() => null} />
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={HistoryScreen} component={() => null} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SettingsScreen} component={() => null} />
    </Stack.Navigator>
  );
}

export function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={CalculatorScreen} component={CalculatorStack} />
      <Tab.Screen name={HistoryScreen} component={HistoryStack} />
      <Tab.Screen name={SettingsScreen} component={SettingsStack} />
    </Tab.Navigator>
  );
}
