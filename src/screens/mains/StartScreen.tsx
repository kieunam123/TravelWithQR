import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon, SafeView } from '~/components/commons'
import { Header } from '~/components/sections'
import imgs from '~/assets/imgs'
import { scaleFactor } from '~/helpers/UtilitiesHelper'
import { Colors, fonts } from '~/configs'
import { useNavigation } from '@react-navigation/native'
import ScreenType from '~/navigations/screen.constant'

const StartScreen = () => {
	const navigation = useNavigation();
	const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
	return (
		<SafeView>
			<View style={styles.container}>
				<View style={styles.overlay} />
				<View style={{ backgroundColor: 'black', zIndex: -2 }} />
				<Image
					resizeMode='cover'
					source={imgs.cover_img}
					style={{ width: SCREEN_WIDTH, flex: 1, zIndex: -1 }}
				/>
				<Image
					resizeMode='cover'
					source={imgs.cover_img2}
					style={{ width: SCREEN_WIDTH, flex: 1, zIndex: -1 }}
				/>
				<View style={styles.titleContainer}>
					<Text style={styles.text}>Travel With QR</Text>
					<View style={styles.descriptionContainer}>
						<Text style={styles.descriptionText} >{'Explore every place with a QR scan\nBegin the journey now'}</Text>
						<TouchableOpacity style={styles.button} onPress={() => navigation.navigate(ScreenType.Main.Tab)}>
							<View style={styles.circle}>
								<Icon type='AntDesign' name="right" size={24} color="white" />
							</View>
						</TouchableOpacity>
					</View>
				</View>

			</View>
		</SafeView>
	)
}

export default StartScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.BLACK
	},
	button: {
		// position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		width: scaleFactor(70),
		height: scaleFactor(70),
		borderRadius: 35,
		backgroundColor: 'rgba(192, 192, 192, 0.30)',
		// right: 20,
		// bottom: 20,
	},
	circle: {
		justifyContent: 'center',
		alignItems: 'center',
		width: scaleFactor(60),
		height: scaleFactor(60),
		borderRadius: 30,
		// backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},

	titleContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		alignSelf: 'center',
		width: '100%',
		height: '100%'
	},

	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},

	text: {
		fontFamily: fonts.RobotoLight,
		fontSize: scaleFactor(55),
		color: 'white',
		letterSpacing: 2,
	},

	descriptionText: {
		color: 'white',
		paddingBottom: 20,
		fontSize: scaleFactor(15),
		textAlign: 'center',
		letterSpacing: 1,
		lineHeight: 25

	},
	descriptionContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		top: scaleFactor(60),
	}
})