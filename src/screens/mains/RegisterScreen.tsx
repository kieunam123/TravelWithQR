import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { IImgurResult, IUser } from '~/apis/types.service';
import imgs from '~/assets/imgs';
import { Icon, TextCustom } from '~/components/commons';
import { Header } from '~/components/sections';
import Color from '~/configs/colors';
import { scaleFactor } from '~/helpers/UtilitiesHelper';
import ScreenType from '~/navigations/screen.constant';
import MasterActions from '~/redux/master/master.actions';
import { RootState } from '~/redux/reducers';
import * as ImagePicker from 'expo-image-picker';
import { callApiPostWithToken } from '~/helpers/UtilitiesHelper';
import AppString, { IMGUR_ACCESSTOKEN, IMGUR_API } from '~/configs/strings';
import Loading2 from '~/containers/Loading2';

const RegisterScreen = () => {
  const { User } = useSelector((state: RootState) => state.master);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [imgurl, setImgUrl] = useState('https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg');
  const [userlist, setUserList] = useState<IUser[]>([]);
  const [onImageUpload, setOnImageUpload] = useState<boolean>(false)
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

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert(AppString.Register.AccessLibraryFailed);
      return;
    }
    setOnImageUpload(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
    });
    if (!result.canceled) {
      const response: IImgurResult = await callApiPostWithToken(
        IMGUR_API,
        '',
        { image: result.assets[0].base64 ?? '' },
        `Client-ID ${IMGUR_ACCESSTOKEN}`
      );
      if (response.success) {
        setImgUrl(response.data.link)

      } else {
        alert(`${AppString.Register.UploadFailed} ${response.status}`);
      }
    }
    setOnImageUpload(false);
  };

  async function checkUserExist(username: string) {
    if (name !== '' && phone !== '' && address !== '' && username !== '' && password !== '') {
      let isFound: boolean = false
      userlist.forEach((item) => {
        if (item.username === username) {
          isFound = true
        }
      })
      if (isFound) {
        alert(AppString.Register.UserExists)
      } else {
        Alert.alert(AppString.Register.RegisterInfo, `${AppString.Register.Fullname}: ${name}\n${AppString.Register.Phone}: ${phone}\n${AppString.Register.Address}: ${address}\nUsername: ${username}`, [
          {
            text: AppString.Login.Register, onPress: () => {
              dispatch(MasterActions.CreateUser({
                name: name,
                address: address,
                mobile: phone,
                username: username,
                password: password,
                imgurl: imgurl ?? '',
                usertype: 'user'
              }))
            }
          },
          {text: AppString.Common.ConfirmCancel, onPress:()=>{}}
        ], {cancelable: true})
      }
    } else {
      alert(AppString.Register.FillAlert)
    }
  }

  return (
    <>
      <Loading2 text={AppString.Common.LoadingAlert} isVisible={onImageUpload} />
      {/* <Header title={'Đăng ký tài khoản'} isMenu={false} disableThreeDot /> */}
      <View style={styles.container}>
        {/* Background Image or any travel-themed design */}
        {/* Replace 'BackgroundComponent' with your background design component */}

        <ImageBackground
          source={imgs.background_img2}
          style={{ flex: 1, width: SCREEN_WIDTH, justifyContent: 'center' }}
        >
          <TouchableOpacity onPress={pickImage} style={{justifyContent: 'center', alignItems:'center'}}>
            <Image
              source={{ uri: imgurl }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={styles.formContainer}>
            <TextInput
              label={InputLabel(AppString.Register.Fullname)}
              placeholder={AppString.Register.FullnameInput}
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
              textColor='white'
              placeholderTextColor={'white'}
              theme={{ dark: true }}
            />
            <TextInput
              label={InputLabel(AppString.Register.Phone)}
              placeholder={AppString.Register.PhoneInput}
              value={phone}
              onChangeText={(text) => setPhone(text)}
              style={styles.input}
              textColor='white'
              placeholderTextColor={'white'}
              theme={{ dark: true }}
            />
            <TextInput
              label={InputLabel(AppString.Register.Address)}
              placeholder={AppString.Register.AddressInput}
              value={address}
              onChangeText={(text) => setAddress(text)}
              style={styles.input}
              textColor='white'
              placeholderTextColor={'white'}
              theme={{ dark: true }}
            />
            <TextInput
              label={InputLabel('Username')}
              placeholder={AppString.Login.Username}
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={styles.input}
              textColor='white'
              placeholderTextColor={'white'}
              theme={{ dark: true }}
            />
            <TextInput
              label={InputLabel('Password')}
              placeholder={AppString.Login.Password}
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
            <View style={{ paddingVertical: 10 }} />
            <Button mode="contained" style={{ backgroundColor: '#7a62fe', paddingVertical: scaleFactor(5) }} onPress={async () => {
              await checkUserExist(username)
            }}>
              {AppString.Register.RegisterButton}
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
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    // marginRight: 16,
  },
});

export default RegisterScreen;
