// En tu archivo de navegación principal (por ejemplo, AppNavigator.tsx)

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Teams from './(home)/teams';
import addMember from './addMember';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Teams" component={Teams} />
        <Stack.Screen name="AddMember" component={addMember} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
