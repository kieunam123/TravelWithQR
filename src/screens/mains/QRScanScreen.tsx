import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '~/components/sections'
import { SafeView } from '~/components/commons'

const QRScanScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>QR Screen</Text>
		</View>
	)
}

export default QRScanScreen

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