import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screen/SplashScreen';
import HomeScreen from '../screen/HomeScreen';
import { RootStackParamList } from './types';
import { navigationRef } from '../utils/NavigationUtils';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator; 