import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '~/components/sections'
import { SafeView } from '~/components/commons'

const SettingScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Setting Screen</Text>
		</View>
	)
}

export default SettingScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	text: {
		fontFamily: 'RobotoBold',
		fontSize: 25,
	}
})