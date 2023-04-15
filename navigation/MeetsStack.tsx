import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MeetingScreen from '../pages/MeetingScreen';
import GivingRatingAndReview from '../pages/GivingRatingAndReview';

const Stack = createNativeStackNavigator();

function MeetsStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="MeetsStackMain" component={MeetingScreen} />
      <Stack.Screen name="givingRatingAndReview" component={GivingRatingAndReview} />
    </Stack.Navigator>
  );
}

export default MeetsStack;