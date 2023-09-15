import { Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Container, Header } from '~/components/sections'
import { SafeView } from '~/components/commons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/redux/reducers'
import MasterActions from '~/redux/master/master.actions'
import { Card } from '~/components/cards'
import { useIsFocused } from '@react-navigation/native'
import { ISampleObj } from '~/apis/types.service'
import { navigate } from '~/navigations'
import ScreenType from '~/navigations/screen.constant'

const DashboardScreen = () => {
	const isFocused = useIsFocused();
	const goToScreen = (
		screenType: string,
		params?: any,
	): void => {
		const nav = screenType;
		navigate(nav, params);
	};
	const dispatch = useDispatch();
	const { dataTest } = useSelector((state: RootState) => state.master);
	const handleGetData = useCallback(() => {
		dispatch(MasterActions.getDataTest())
	}, [dispatch]);

	useEffect(() => {
		if (isFocused) {
			handleGetData()
		}
	}, [handleGetData, isFocused])

	async function onPress(item: ISampleObj) {
		Alert.alert('Select Action', '', [
			{
				text: 'Update', onPress: () => {
					goToScreen(ScreenType.Tab.ScanQR);
					dispatch(MasterActions.getDataTestSuccess([{...item, isUpdate: true}]));
				}
			},
			{
				text: 'Delete', onPress: () => dispatch(MasterActions.deleteDateTest(`${item.id}`))
			},
			{ text: 'Close', style: 'cancel' }
		])
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Home Screen</Text>
			<TouchableOpacity onPress={() => alert('abc')}><Text>Text</Text></TouchableOpacity>
			<ScrollView>
				{dataTest.map((item, index) => {
					return <Card key={`${index}`} onPress={() => onPress(item)}>
						<Text>{item.name}</Text>
						<Text>{item.mobile}</Text>
						<Text>{item.address}</Text>
					</Card>
				})}
			</ScrollView>
		</View>
	)
}

export default DashboardScreen

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center'
	},

	text: {
		fontFamily: 'RobotoBold',
		fontSize: 25,
	}
})