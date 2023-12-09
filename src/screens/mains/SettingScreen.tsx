import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Header } from '~/components/sections'
import { Icon, SafeView, TextCustom } from '~/components/commons'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/reducers';
import { convertStringToNumber, goToScreen } from '~/helpers/UtilitiesHelper';
import ScreenType from '~/navigations/screen.constant';
import { IUser } from '~/apis/types.service';
import { Colors } from '~/configs';
import { IUserParams } from '~/commons/types';
import GlobalActions from '~/redux/global/global.actions';

const SettingScreen = () => {
	const { userParams, lang } = useSelector((state: RootState) => state.global);
	const [userinfo, setUserInfo] = useState<IUserParams>(userParams);
	const dispatch = useDispatch();
	const user: IUser = {
		name: userinfo.name,
		mobile: userinfo.phone,
		address: userinfo.address,
		id: convertStringToNumber(userinfo.userId),
		username: userinfo.username,
		password: userinfo.password,
		imgurl: userinfo.imgurl !== '' ? userinfo.imgurl : 'https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg',
		usertype: userinfo.usertype
	}
	const handleUpdateInfo = () => {
		console.log('Navigate to Update Information screen');
		goToScreen(ScreenType.Detail.UpdateUser, { user: user })
	};

	let vi:boolean = lang === 'vi'

	const handleChangePassword = () => {
		// Navigate to the change password screen
		// Add navigation logic here
		console.log('Navigate to Change Password screen');
	};

	const handleLogout = () => {
		// Implement logout functionality
		// Add logout logic here
		goToScreen(ScreenType.Main.Start)
		console.log('Logout');
	};

	const handleChangAvatar = () => {
		//code to change avatar...
	}

	const handleTheme = () => {
		//code to change theme...
	}

	const handleSwitchLang = () => {
		Alert.alert(vi ? 'Lựa chọn ngôn ngữ' : 'Select Language', '',[
			{text: vi ? 'Tiếng Việt' : 'Vietnamese',onPress: ()=> dispatch(GlobalActions.setLang('vi'))},
			{text: vi ? 'Tiếng Anh' : 'English', onPress: ()=> dispatch(GlobalActions.setLang('en'))},
			{text: vi ? 'Huỷ bỏ' : 'Cancel', onPress:()=>{}}
		])
	}
 	
	useEffect(() => {
		setUserInfo(userParams);
	},[userParams])

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.header}>
				{/* User Avatar */}
				<TouchableOpacity onPress={handleChangAvatar}>
					<Image
						source={{ uri: user.imgurl }}
						style={styles.avatar}
					/>
				</TouchableOpacity>

				{/* Change Avatar option */}
				<TouchableOpacity onPress={handleChangAvatar}>
					<Text style={styles.changeAvatar}>{!vi ? "Change Avatar" : 'Thay đổi ảnh đại diện'}</Text>
				</TouchableOpacity>
			</View>
			{/* User Information */}
			<View style={styles.userInfo}>
				<Text style={styles.userName}>{userinfo.name}</Text>
				<Text style={styles.userId}>User ID: {userinfo.userId}</Text>
			</View>
			{/* Settings Options */}
			<View style={styles.settings}>
				<TouchableOpacity onPress={handleUpdateInfo} style={styles.settingOption}>
					<Icon type='FontAwesome' name="user" size={25} color={'blue'} />
					<TextCustom bold style={styles.settingText}>{vi ? "Thông Tin Cá Nhân" : 'Profile Information'}</TextCustom>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleChangePassword} style={styles.settingOption}>
					<Icon type='FontAwesome' name="lock" size={25} color={'blue'} />
					<TextCustom bold style={styles.settingText}>{vi ? "Đổi mật khẩu" : 'Change Password'}</TextCustom>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleSwitchLang} style={styles.settingOption}>
					<Icon name="contact-support" type='MaterialIcons' size={25} color={'blue'} />
					<TextCustom bold style={styles.settingText}>{vi ? "Thay đổi ngôn ngữ" : 'Switch Language'}</TextCustom>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>{}} style={styles.settingOption}>
					<Icon name="note" type='SimpleLineIcons' size={25} color={'blue'} />
					<TextCustom bold style={styles.settingText}>{"Version Log"}</TextCustom>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleTheme} style={styles.settingOption}>
					<Icon name="theme-light-dark" type='MaterialCommunityIcons' size={25} color={'blue'} />
					<TextCustom bold style={styles.settingText}>{vi ? 'Chuyển đổi giao diện' : 'Switch Theme'}</TextCustom>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleLogout} style={styles.settingOption}>
					<Icon type='FontAwesome' name="sign-out" size={25} color={'blue'} />
					<TextCustom bold style={styles.settingText}>{vi ? "Đăng xuất" : 'Log Out'}</TextCustom>
				</TouchableOpacity>
			</View>
		</ScrollView>
	)
}

export default SettingScreen

const styles = StyleSheet.create({
	container: {
		// flex:1,
		flexGrow: 1,
		backgroundColor: '#fff',
		padding: 16,
		alignItems: 'center',
		// justifyContent: 'center',
	},
	header: {
		// flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 16,
	},
	avatar: {
		width: 120,
		height: 120,
		borderRadius: 60,
		// marginRight: 16,
	},
	changeAvatar: {
		color: 'blue',
		textDecorationLine: 'underline',
		paddingTop: 10
	},
	userInfo: {
		marginBottom: 16,
	},
	userName: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	userId: {
		fontSize: 16,
		color: 'gray',
		textAlign: 'center',
	},
	settings: {
		width: '100%',
		justifyContent: 'center',
		// alignItems:'center'
	},
	settingOption: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	settingText: {
		fontSize: 20,
		marginLeft: 8,
		color: Colors.BLACK,
		// textDecorationLine: 'underline',
	},
});
