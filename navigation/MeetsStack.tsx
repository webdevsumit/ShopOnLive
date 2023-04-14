import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MeetingScreen from '../pages/MeetingScreen';
import InsideMeetingScreen from '../pages/InsideMeetingScreen';
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
      <Stack.Screen name="InsideMeeting" component={InsideMeetingScreen} />
      <Stack.Screen name="givingRatingAndReview" component={GivingRatingAndReview} />
    </Stack.Navigator>
  );
}

export default MeetsStack;