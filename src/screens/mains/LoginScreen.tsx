import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react'
import { Image, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '~/apis/types.service';
import imgs from '~/assets/imgs';
import { Icon, TextCustom } from '~/components/commons';
import { Header } from '~/components/sections';
import Color from '~/configs/colors';
import { goToScreen, scaleFactor } from '~/helpers/UtilitiesHelper';
import ScreenType from '~/navigations/screen.constant';
import GlobalActions from '~/redux/global/global.actions';
import MasterActions from '~/redux/master/master.actions';
import { RootState } from '~/redux/reducers';

const LoginScreen = ({ route }) => {
  const { userRegistered } = route.params ?? '';
  const { User } = useSelector((state: RootState) => state.master);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userlist, setUserList] = useState<IUser[]>([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const InputLabel = (label: string) => {
    return <Text style={styles.labelColor}>{label}</Text>
  }

  const handleGetUser = useCallback(() => {
    dispatch(MasterActions.getUser());
  }, [dispatch])

  useEffect(() => {
    handleGetUser();
  }, [handleGetUser])

  useEffect(() => {
    setUserList(User);
  }, [User]);

  async function checkLogin(username: string, password: string) {
    let isFound: boolean = false
    userlist.forEach((item) => {
      if (item.username === username) {
        if (item.password === password) {
          isFound = true;
          dispatch(GlobalActions.updateUserParams({
            name: item.name,
            phone: item.mobile,
            userId: `${item.id}`,
            address: item.address,
            imgurl: item.imgurl ?? '',
            password: item.password,
            username: item.username,
            usertype: item.usertype ?? 'user',
          }));
        }
      }
    })
    if (userRegistered) {
      if (userRegistered.username === username) {
        if (userRegistered.password === password) {
          isFound = true;
          dispatch(GlobalActions.updateUserParams({
            name: userRegistered.name,
            phone: userRegistered.mobile,
            userId: `${userRegistered.id}`,
            address: userRegistered.address,
            imgurl: userRegistered.imgurl ?? '',
            password: userRegistered.password,
            username: userRegistered.username,
            usertype: 'user'
          }));
        }
      }
    }
    if (isFound) {
      goToScreen(ScreenType.Main.Tab)
    } else {
      alert('Tên đăng nhập hoặc mật khẩu bị sai')
    }
  }

  return (
    <>
      {/* <Header title='Đăng nhập' isMenu={false} disableThreeDot /> */}
      <View style={styles.container}>
        <ImageBackground
          source={imgs.background_img1}
          style={{ flex: 1, width: SCREEN_WIDTH, justifyContent: 'center' }}
        >
          <View style={styles.formContainer}>
            <TextInput
              label={InputLabel('Username')}
              placeholder="Enter your username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={styles.input}
              textColor='white'
              placeholderTextColor={'white'}
              theme={{ dark: true }}
            />
            <TextInput
              label={InputLabel('Password')}
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!passwordVisible}
              style={styles.input}
              textColor='white'
              right={
                <TextInput.Icon
                  icon={passwordVisible ? 'eye-off' : 'eye'}
                  iconColor="white"
                  // style={{backgroundColor:'white'}}
                  size={20}
                  onPress={togglePasswordVisibility}
                />
              }
            />
            <Button mode="contained" style={{ backgroundColor: '#7a62fe' }} onPress={async () => {
              await checkLogin(username, password)
            }}>
              Sign In
            </Button>
            <View style={{ paddingTop: scaleFactor(15), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Chưa có tài khoản? Vui lòng </Text>
              <Pressable onPress={() => {
                goToScreen(ScreenType.Main.Register)
              }}>
                <TextCustom bold style={{ color: '#7a62fe', fontSize: 20 }}>Đăng ký</TextCustom>
              </Pressable>
            </View>
          </View>
        </ImageBackground>

      </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    width: '90%',
    // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    padding: 16,
    borderRadius: 10,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 20,
    // borderRadius: 15
    borderRadius: 15,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    backgroundColor: 'rgba(10, 20, 20, 0.7)', // Semi-transparent white background
  },
  labelColor: {
    color: Color.BORDER_DARK
  }
});

export default LoginScreen;
