import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ScreenType from '../screen.constant';
import {DashboardScreen} from '../../screens/mains';

import AppDrawer from './app.drawer';
import styles from '../navigation.style';

import { NavigationContainer } from '@react-navigation/native';
import { Dimensions, Platform } from 'react-native';
import BottomTabNavigator from '../bottomTabs/bottomtab.navigation';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: styles.drawerStyles,
                sceneContainerStyle: styles.sceneContainerStyle,
            }}
            initialRouteName={ScreenType.Main.Tab}
            drawerContent={(props) => {
                return <AppDrawer {...props} />;
            }}>
            <Drawer.Screen
                name={ScreenType.Main.Tab}
                component={BottomTabNavigator}
                options={{headerShown: false}}
            />
        </Drawer.Navigator>
    );     
};

export default DrawerNavigation
