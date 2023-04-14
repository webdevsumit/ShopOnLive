import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../pages/AccountScreen';
import AccountEdit from '../pages/AccountEdit';
import BalancePaymentScreen from '../pages/BalancePaymentScreen';

const Stack = createNativeStackNavigator();

function AccountStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="AccountMain" component={AccountScreen} />
      <Stack.Screen name="AccountEdit" component={AccountEdit} />
      <Stack.Screen name="BalancePayment" component={BalancePaymentScreen} />
    </Stack.Navigator>
  );
}

export default AccountStack;