import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import DrawerNavigation from './drawers/drawer.navigation';
import { isMountedRef, navigationRef } from './navigation.services';
import ScreenType from './screen.constant';
import { RootState } from '../redux/reducers';

import {
	StartScreen,
	DashboardScreen,
	LoginScreen,
	RegisterScreen,
} from '../screens/mains';
import BottomTabNavigator from './bottomTabs/bottomtab.navigation';
import { AddLocationScreen, LocationDetail, PlaceDetail, UpdateUserScreen } from '~/screens/details';

const Stack = createStackNavigator();

const RoutesNavigatorContainer = (): any => {
	React.useEffect(() => {
		isMountedRef!.current = true;
		return () => (isMountedRef.current = false);
	}, []);

	return (
		<SafeAreaProvider>
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator
					initialRouteName={ScreenType.Main.Start}
					screenOptions={{
						headerShown: false
					}}>
						<Stack.Screen name={ScreenType.Main.Tab} component={BottomTabNavigator} options={{gestureEnabled: true}}/>
						<Stack.Screen name={ScreenType.Main.Start} component={StartScreen}/>
						<Stack.Screen name={ScreenType.Main.Login} component={LoginScreen}/>
						<Stack.Screen name={ScreenType.Main.Register} component={RegisterScreen}/>
						<Stack.Screen name={ScreenType.Detail.LocationDetail} component={LocationDetail}/>
						<Stack.Screen name={ScreenType.Detail.PlaceDetail} component={PlaceDetail}/>
						<Stack.Screen name={ScreenType.Detail.AddLocation} component={AddLocationScreen}/>
						<Stack.Screen name={ScreenType.Detail.UpdateUser} component={UpdateUserScreen}/>
						{/* <Stack.Screen name={ScreenType.Main.Dashboard} component={DashboardScreen}/> */}

				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

export default RoutesNavigatorContainer;