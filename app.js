import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRegistry } from 'react-native';
AppRegistry.registerComponent('App', () => App);
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './Screens/HomeScreen';
import PostScreen from './Screens/PostScreen';
import NewPostScreen from './screens/NewPostScreen';
import MessagesScreen from './screens/MessagesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'QuickPost' }} />
        <Stack.Screen name="Post" component={PostScreen} options={{ title: 'Post Details' }} />
        <Stack.Screen name="NewPost" component={NewPostScreen} options={{ title: 'Create New Post' }} />
        <Stack.Screen name="Messages" component={MessagesScreen} options={{ title: 'Messages' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}