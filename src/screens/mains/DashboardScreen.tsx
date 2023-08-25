import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '~/components/sections'
import { SafeView } from '~/components/commons'

const DashboardScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Home Screen</Text>
		</View>
	)
}

export default DashboardScreen

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