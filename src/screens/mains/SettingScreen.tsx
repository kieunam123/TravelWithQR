import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Header } from '~/components/sections'
import { Icon, SafeView, TextCustom } from '~/components/commons'
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/reducers';
import { convertStringToNumber, goToScreen } from '~/helpers/UtilitiesHelper';
import ScreenType from '~/navigations/screen.constant';
import { IUser } from '~/apis/types.service';
import { Colors } from '~/configs';

const SettingScreen = () => {
	const { userParams } = useSelector((state: RootState) => state.global);
	const user: IUser = {
		name: userParams.name,
		mobile: userParams.phone,
		address: userParams.address,
		id: convertStringToNumber(userParams.userId),
		username: userParams.username,
		password: userParams.password,
		imgurl: userParams.imgurl !== '' ? userParams.imgurl : 'https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg',
		usertype: userParams.usertype
	}
	const handleUpdateInfo = () => {
		console.log('Navigate to Update Information screen');
		goToScreen(ScreenType.Detail.UpdateUser, { user: user })
	};

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

	}

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
					<Text style={styles.changeAvatar}>Change Avatar</Text>
				</TouchableOpacity>
			</View>
			{/* User Information */}
			<View style={styles.userInfo}>
				<Text style={styles.userName}>{userParams.name}</Text>
				<Text style={styles.userId}>User ID: {userParams.userId}</Text>
			</View>
			{/* Settings Options */}
			<View style={styles.settings}>
				<TouchableOpacity onPress={handleUpdateInfo} style={styles.settingOption}>
					<Icon type='FontAwesome' name="user" size={25} color={'blue'} />
					<TextCustom bold style={styles.settingText}>Thông Tin Cá Nhân</TextCustom>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleChangePassword} style={styles.settingOption}>
					<Icon type='FontAwesome' name="lock" size={25} color={'blue'} />
					<TextCustom bold style={styles.settingText}>Đổi mật khẩu</TextCustom>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleLogout} style={styles.settingOption}>
					<Icon name="contact-support" type='MaterialIcons' size={25} color={'blue'} />
					<TextCustom bold style={styles.settingText}>Liên Hệ & Hỗ Trợ</TextCustom>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleLogout} style={styles.settingOption}>
					<Icon name="note" type='SimpleLineIcons' size={25} color={'blue'} />
					<TextCustom bold style={styles.settingText}>Version Log</TextCustom>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleLogout} style={styles.settingOption}>
					<Icon name="theme-light-dark" type='MaterialCommunityIcons' size={25} color={'blue'} />
					<TextCustom bold style={styles.settingText}>Dark Mode</TextCustom>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleLogout} style={styles.settingOption}>
					<Icon type='FontAwesome' name="sign-out" size={25} color={'blue'} />
					<TextCustom bold style={styles.settingText}>Đăng xuất</TextCustom>
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
		borderRadius: 40,
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
