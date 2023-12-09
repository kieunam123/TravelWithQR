import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from '~/components/commons';
import ScreenType from '../screen.constant';
import { DashboardScreen, NotificationScreen, QRScanScreen, SearchScreen, SettingScreen } from '~/screens/mains';
import { isIos, scaleFactor } from '~/helpers/UtilitiesHelper';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/reducers';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { userParams, lang } = useSelector((state: RootState) => state.global);
  let vi:boolean = lang === 'vi';
  const getIcon = (routeName: string, focused: boolean, color: string, size: number) => {
    switch (routeName) {
      case 'Home':
        return <Icon type='AntDesign' name={focused ? 'home' : 'home'} size={size} color={color} />;
      case 'Dashboard':
        return <Icon type='FontAwesome' name={'bar-chart'} size={size} color={color} />;
      case 'Search':
        return <Icon type='Entypo' name={'magnifying-glass'} size={size} color={color} />;
      case (vi ? 'Quản Lý User' : 'Manage User'):
        return <Icon type='MaterialCommunityIcons' name={'account-cog'} size={size} color={color} />;
      case 'Scan QR':
        return <Icon type='MaterialCommunityIcons' name={'qrcode-scan'} size={scaleFactor(35)} color={color} />;
      case (vi ? 'Quản Lý Địa Điểm' : 'Manage Location'):
        return <Icon type='Entypo' name={'location'} size={size} color={color} />;
      case 'Notification':
        return <Icon type='MaterialCommunityIcons' name={'bell-outline'} size={size} color={color} />;
      case 'Settings':
        return <Icon type='Ionicons' name={'settings-outline'} size={size} color={color} />;
      default:
        return null;
    }
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { height: isIos() ? 100 : scaleFactor(60) },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'grey',
        tabBarIcon: ({ focused, color, size }) => {
          return getIcon(route.name, focused, color, 30);
        },
      })}
    >
      <Tab.Screen name={userParams.usertype === 'admin' ? 'Dashboard' : ScreenType.Tab.Home} component={DashboardScreen} />
      <Tab.Screen name={userParams.usertype === 'admin' ? (vi ? 'Quản Lý User' : 'Manage User') : ScreenType.Tab.Search} component={SearchScreen} />
      <Tab.Screen name={userParams.usertype === 'admin' ? (vi ? 'Quản Lý Địa Điểm' : 'Manage Location') : ScreenType.Tab.ScanQR} component={QRScanScreen} />
      <Tab.Screen name={ScreenType.Tab.Notification} component={NotificationScreen} />
      <Tab.Screen name={ScreenType.Tab.Setting} component={SettingScreen} />

    </Tab.Navigator>
  )
}

export default BottomTabNavigator