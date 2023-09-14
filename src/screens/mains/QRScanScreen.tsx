import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header } from '~/components/sections'
import { SafeView } from '~/components/commons'
import { CreateLocation } from '~/containers/master'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ScreenType from '~/navigations/screen.constant'

const QRScanScreen = ({ route }) => {
	const isFocused = useIsFocused();
	const navigation = useNavigation()
	const { obj } = route.params ?? '';

	useEffect(() => {
		if (isFocused) {
			
		} else {
			navigation.setParams({obj:{name: undefined, id: undefined, address: undefined, mobile: undefined}})
		}
	}, [isFocused,navigation])

	return (
		<View style={styles.container}>
			{/* <Text style={styles.text}>QR Screen</Text> */}
			<CreateLocation
				id={obj ? obj.id : undefined}
				name={obj ? obj.name : undefined}
				mobile={obj ? obj.mobile : undefined}
				address={obj ? obj.address : undefined}
			/>
		</View>
	)
}

export default QRScanScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center'
	},

	text: {
		fontFamily: 'RobotoBold',
		fontSize: 25,
	}
})