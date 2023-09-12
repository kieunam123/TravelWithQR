import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '~/components/sections'
import { SafeView } from '~/components/commons'

const NotificationScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Notification Screen</Text>
		</View>
	)
}

export default NotificationScreen

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