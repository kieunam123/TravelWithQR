import React, { useState } from 'react';
import { Image, ImageBackground, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import imgs from '~/assets/imgs';
import { Icon } from '~/components/commons';
import Color from '~/configs/colors';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const usernameLabel = <Text style={styles.labelColor}>Username</Text>;
  const passwordLabel = <Text style={styles.labelColor}>Your Password</Text>;

  return (
    <View style={styles.container}>
      {/* Background Image or any travel-themed design */}
      {/* Replace 'BackgroundComponent' with your background design component */}

      <ImageBackground
        source={imgs.background_img1}
        style={{ flex: 1, width: SCREEN_WIDTH, justifyContent:'center' }}
      >
        <View style={styles.formContainer}>
          <TextInput
            label={usernameLabel}
            placeholder="Enter your username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
            textColor='white'
            placeholderTextColor={'white'}
            theme={{dark:true}}
          />
          <TextInput
            label={passwordLabel}
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
          <Button mode="contained" style={{backgroundColor:'#7a62fe'}} onPress={() => { }}>
            Sign In
          </Button>
        </View>
      </ImageBackground>

    </View>
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
    alignSelf:'center',
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
