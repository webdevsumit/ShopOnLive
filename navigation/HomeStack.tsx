import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/HomeScreen';
import ShopDetails from '../pages/ShopDetails';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ShopDetails" component={ShopDetails} shopId={({ params }) => params.id} />
    </Stack.Navigator>
  );
}

export default HomeStack;