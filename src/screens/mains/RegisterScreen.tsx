import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '~/apis/types.service';
import imgs from '~/assets/imgs';
import { Icon, TextCustom } from '~/components/commons';
import { Header } from '~/components/sections';
import Color from '~/configs/colors';
import { scaleFactor } from '~/helpers/UtilitiesHelper';
import ScreenType from '~/navigations/screen.constant';
import MasterActions from '~/redux/master/master.actions';
import { RootState } from '~/redux/reducers';

const RegisterScreen = () => {
  const { User } = useSelector((state: RootState) => state.master);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [imgurl, setImgUrl] = useState('');
  const [userlist, setUserList] = useState<IUser[]>([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const InputLabel = (label:string) => {
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

  async function checkUserExist(username: string) {
    if(name !== '' && phone !== '' && address !== '' && username !== '' && password !== '' ){
      let isFound: boolean = false
      userlist.forEach((item) => {
        if (item.username === username) {
          isFound = true
        }
      })
      if (isFound) {
        alert('Username này đã tồn tại')
      } else {
        Alert.alert(`Thông tin đăng ký`,`Họ tên: ${name}\nSĐT: ${phone}\nĐịa chỉ: ${address}\nUsername: ${username}`,[
          {text:'Đăng ký', onPress:()=>{
            dispatch(MasterActions.CreateUser({
              name: name,
              address: address,
              mobile: phone,
              username: username,
              password: password,
              imgurl: ''
            }))
          }}
        ])
      }
    } else {
      alert('Vui lòng không bỏ trống thông tin!')
    }
  }

  return (
    <>
      <Header title={'Đăng ký tài khoản'} isMenu={false} disableThreeDot/>
      <View style={styles.container}>
        {/* Background Image or any travel-themed design */}
        {/* Replace 'BackgroundComponent' with your background design component */}

        <ImageBackground
          source={imgs.background_img2}
          style={{ flex: 1, width: SCREEN_WIDTH, justifyContent: 'center' }}
        >
          <View style={styles.formContainer}>
            <TextInput
              label={InputLabel('Name')}
              placeholder="Enter your Name"
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
              textColor='white'
              placeholderTextColor={'white'}
              theme={{ dark: true }}
            />
            <TextInput
              label={InputLabel('Phone number')}
              placeholder="Enter your Mobile phone"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              style={styles.input}
              textColor='white'
              placeholderTextColor={'white'}
              theme={{ dark: true }}
            />
            <TextInput
              label={InputLabel('Address')}
              placeholder="Enter your Address"
              value={address}
              onChangeText={(text) => setAddress(text)}
              style={styles.input}
              textColor='white'
              placeholderTextColor={'white'}
              theme={{ dark: true }}
            />
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
            <View style={{paddingVertical:10}} />
            <Button mode="contained" style={{ backgroundColor: '#7a62fe', paddingVertical: scaleFactor(5) }} onPress={async () => {
              await checkUserExist(username)
            }}>
              Register Account
            </Button>
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

export default RegisterScreen;
