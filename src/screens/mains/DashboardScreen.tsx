import { Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Container, Header } from '~/components/sections'
import { FlatListCommon, Icon, SafeView, TextCustom } from '~/components/commons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/redux/reducers'
import MasterActions from '~/redux/master/master.actions'
import { Card } from '~/components/cards'
import { useIsFocused } from '@react-navigation/native'
import { ILocation, ILocationPlace, IUser } from '~/apis/types.service'
import { navigate } from '~/navigations'
import ScreenType from '~/navigations/screen.constant'
import { callApiGetWithToken, scaleFactor } from '~/helpers/UtilitiesHelper'
import { API_URL } from '~/configs/strings'
import { LocationItem } from '~/containers/master'
import { Colors, fonts } from '~/configs'

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
	const { User, locations, places } = useSelector((state: RootState) => state.master);
	const { userParams } = useSelector((state: RootState) => state.global);
	const handleGetLocation = useCallback(() => {
		dispatch(MasterActions.getLocation())
	}, [dispatch]);

	useEffect(() => {
		if (isFocused) {
			handleGetLocation()
		}
	}, [handleGetLocation, isFocused])


	async function UserOnPress(item: IUser) {
		Alert.alert('Select Action', '', [
			{
				text: 'Update', onPress: () => {
					goToScreen(ScreenType.Tab.ScanQR);
					dispatch(MasterActions.getUserSuccess([{ ...item, isUpdate: true }]));
				}
			},
			{
				text: 'Delete', onPress: () => dispatch(MasterActions.deleteUser(`${item.id}`))
			},
			{ text: 'Close', style: 'cancel' }
		])
	}

	async function LocationOnPress(location: ILocation) {
		goToScreen(ScreenType.Detail.LocationDetail, {Location: location})
	}

	async function PlaceOnPress(place: ILocationPlace) {
		goToScreen(ScreenType.Detail.PlaceDetail, {Place: place})
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={{ paddingBottom: scaleFactor(30), flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", padding: 10 }}>
					<View>
						<Text style={styles.title}>Xin chào, </Text>
						<TextCustom bold style={styles.title}>{userParams.name}</TextCustom>
					</View>
					<View style={{ paddingHorizontal: scaleFactor(20) }}>
						<Icon
							type="FontAwesome"
							name="user-circle-o"
							color={Colors.GRAY}
							size={scaleFactor(75)}
						/>
					</View>
				</View>
				<View>
					<Text style={styles.title2}>Dành cho bạn</Text>

					<FlatListCommon
						onRefresh={() => { }}
						isShowVertical={false}
						horizontal
						data={places.sort((a, b) => b.rating - a.rating)}
						renderItem={({ item }: { item: ILocationPlace }) => (
							<View style={{ paddingHorizontal: 5 }}>
								<LocationItem
									title={item.name}
									img={item.image_link[0] ?? ''}
									short_description={`${item.city}, ${item.country}`}
									description={item.description}
									country={item.country}
									onPress={() => PlaceOnPress(item)}
								/>
							</View>
						)}
					/>
				</View>
				<View style={{ paddingVertical: scaleFactor(20) }}>
					<Text style={styles.title2}>Khám phá các địa điểm</Text>
					<FlatListCommon
						onRefresh={() => { }}
						isShowVertical={false}
						horizontal
						data={locations}
						renderItem={({ item }: { item: ILocation }) => (
							<View style={{ paddingHorizontal: 5 }}>
								<LocationItem
									title={item.name}
									img={item.image_links[0] ?? ''}
									short_description={`${item.country}`}
									description={item.description}
									country={item.country}
									onPress={() => LocationOnPress(item)}
								/>
							</View>
						)}
					/>
				</View>


				{/* <ScrollView>
				{User.map((item, index) => {
					return <Card key={`${index}`} onPress={() => onPress(item)}>
						<Text>{item.name}</Text>
						<Text>{item.mobile}</Text>
						<Text>{item.address}</Text>
					</Card>
				})}
			</ScrollView> */}
			</View>
		</ScrollView>

	)
}

export default DashboardScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: scaleFactor(10),
		// backgroundColor: '#FAFAFC'
		// justifyContent: 'center',
		// alignItems: 'center'
	},
	title: {
		fontFamily: fonts.RobotoRegular,
		fontSize: 30,
	},
	title2: {
		fontFamily: fonts.RobotoBold,
		fontSize: 20,
	}
})