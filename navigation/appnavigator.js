import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import NewPostScreen from '../screens/NewPostScreen';
import PostScreen from '../screens/PostScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'QuickPost' }}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPostScreen}
        options={{ title: 'Create Post' }}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{ title: 'Post Details' }}
      />
    </Stack.Navigator>
  );
}