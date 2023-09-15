import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header } from '~/components/sections'
import { SafeView } from '~/components/commons'
import { CreateLocation } from '~/containers/master'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ScreenType from '~/navigations/screen.constant'
import { useDispatch, useSelector } from 'react-redux'
import MasterActions from '~/redux/master/master.actions'
import { RootState } from '~/redux/reducers'

const QRScanScreen = ({ route }) => {
	const isFocused = useIsFocused();
	const dispatch = useDispatch();
	const { dataTest } = useSelector((state: RootState) => state.master);

	useEffect(() => {
		if (isFocused) {

		} else {
			dispatch(MasterActions.getDataTestSuccess([{ name: '', mobile: '', address: '', id: undefined, isUpdate: false }]))
		}
	}, [isFocused])

	return (
		<View style={styles.container}>
			{/* <Text style={styles.text}>QR Screen</Text> */}
			{dataTest[0].isUpdate && <CreateLocation
				id={dataTest[0].id}
				name={dataTest[0].name}
				mobile={dataTest[0].mobile}
				address={dataTest[0].address}
			/>}
			{!dataTest[0].isUpdate && <CreateLocation
				name={undefined}
				mobile={undefined}
				address={undefined}
			/>}
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