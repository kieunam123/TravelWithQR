import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '~/components/sections'
import { SafeView } from '~/components/commons'

const SearchScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Search Screen</Text>
		</View>
	)
}

export default SearchScreen

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