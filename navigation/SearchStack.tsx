import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../pages/SearchScreen';
import AfterSearchScreen from '../pages/AfterSearchScreen';
import ShopDetails from '../pages/ShopDetails';

const Stack = createNativeStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="SearchMain" component={SearchScreen} />
      <Stack.Screen name="AfterSearchScreen" component={AfterSearchScreen} />
      <Stack.Screen name="ShopDetailsInSearch" component={ShopDetails} />
    </Stack.Navigator>
  );
}

export default SearchStack;