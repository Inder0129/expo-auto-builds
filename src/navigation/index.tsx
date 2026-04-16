import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CalculatorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.CALCULATOR} component={() => null} />
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.HISTORY} component={() => null} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.SETTINGS} component={() => null} />
    </Stack.Navigator>
  );
}

export function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ROUTES.CALCULATOR_TAB} component={CalculatorStack} />
      <Tab.Screen name={ROUTES.HISTORY_TAB} component={HistoryStack} />
      <Tab.Screen name={ROUTES.SETTINGS_TAB} component={SettingsStack} />
    </Tab.Navigator>
  );
}
