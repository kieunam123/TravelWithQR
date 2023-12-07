import { Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Container, Header } from '~/components/sections'
import { BarCharts, FlatListCommon, Icon, PieCharts, SafeView, TextCustom } from '~/components/commons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/redux/reducers'
import MasterActions from '~/redux/master/master.actions'
import { Card } from '~/components/cards'
import { useIsFocused } from '@react-navigation/native'
import { ILocation, ILocationPlace, IUser } from '~/apis/types.service'
import { navigate } from '~/navigations'
import ScreenType from '~/navigations/screen.constant'
import { callApiGetWithToken, scaleFactor } from '~/helpers/UtilitiesHelper'
import AppString, { API_URL } from '~/configs/strings'
import { LocationItem } from '~/containers/master'
import { Colors, fonts } from '~/configs'
import { IUserParams } from '~/commons/types'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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
	const { locations, places, User } = useSelector((state: RootState) => state.master);
	const { userParams } = useSelector((state: RootState) => state.global);
	const [userInfo, setUserInfo] = useState<IUserParams>(userParams);
	const handleGetLocation = useCallback(() => {
		dispatch(MasterActions.getLocation())
	}, [dispatch]);

	useEffect(() => {
		if (isFocused) {
			handleGetLocation()
		}
	}, [handleGetLocation, isFocused])

	useEffect(() => {
		setUserInfo(userParams)
	},[userParams])


	async function LocationOnPress(location: ILocation) {
		goToScreen(ScreenType.Detail.LocationDetail, { Location: location })
	}

	async function PlaceOnPress(place: ILocationPlace) {
		goToScreen(ScreenType.Detail.PlaceDetail, { Place: place })
	}

	const CalTotalAdmin = () => {
		let totalAdmin: IUser[] = [];
		const admin = User.filter((p) => p.usertype === 'admin')
		totalAdmin.push(...admin)
		return totalAdmin.length
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={{ paddingBottom: scaleFactor(30), flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", padding: 10 }}>
					<View>
						<Text style={{fontSize:15}}>{AppString.Dashboard.Welcome}</Text>
						<TextCustom bold style={styles.title}>{userInfo.name}</TextCustom>
					</View>
					<View style={{ paddingHorizontal: scaleFactor(30) }}>
						{userInfo.imgurl === '' && <Icon
							type="FontAwesome"
							name="user-circle-o"
							color={Colors.GRAY}
							size={scaleFactor(75)}
						/>}
						{userInfo.imgurl !== '' && <Image source={{ uri: userInfo.imgurl }} resizeMode='contain' style={{ width: 100, height: 100, borderRadius: 50 }} />}
					</View>
				</View>
				{userInfo.usertype !== 'admin' && <>
					<View>
						<Text style={styles.title2}>{AppString.Dashboard.Foryou}</Text>

						<FlatListCommon
							onRefresh={() => { }}
							isShowVertical={false}
							horizontal
							data={places.sort((a, b) => b.rating - a.rating)}
							renderItem={({ item }: { item: ILocationPlace }) => (
								<View style={{ paddingHorizontal: 5 }}>
									<TouchableOpacity onPress={() => PlaceOnPress(item)}>
										<LocationItem
											title={item.name}
											img={item.image_link[0] ?? ''}
											short_description={`${item.city}, ${item.country}`}
											description={item.description}
											country={item.country ?? ''}
										/>
									</TouchableOpacity>

								</View>
							)}
						/>
					</View>
					<View style={{ paddingVertical: scaleFactor(20) }}>
						<Text style={styles.title2}>{AppString.Dashboard.Explore}</Text>
						<FlatListCommon
							onRefresh={() => { }}
							isShowVertical={false}
							horizontal
							data={locations}
							renderItem={({ item }: { item: ILocation }) => (
								<View style={{ paddingHorizontal: 5 }}>
									<TouchableOpacity onPress={() => LocationOnPress(item)}>
										<LocationItem
											title={item.name}
											img={item.image_links[0] ?? ''}
											short_description={`${item.country}`}
											description={item.description}
											country={item.country}
										/>
									</TouchableOpacity>
								</View>
							)}
						/>
					</View>
				</>}
				{userInfo.usertype === 'admin' && <>
					<View>
						<Text style={styles.title2}>{AppString.Dashboard.Summary}</Text>
						<View style={styles.statistic}>
							<BarCharts
								labels={[AppString.Dashboard.BarChartLabel1, AppString.Dashboard.BarChartLabel2, AppString.Dashboard.BarChartLabel3]}
								data={[locations.length, places.length, User.length]}
								color='#0DC5FA'
								width={SCREEN_WIDTH}
							/>
						</View>
					</View>
					<View style={{paddingTop:10}}>
						<Text style={styles.title2}>{AppString.Dashboard.Userstatistic}</Text>
						<PieCharts
							data={[
								{
									name: AppString.Dashboard.PieChartLabel1,
									population: User.length - CalTotalAdmin(),
									color: 'rgba(131, 167, 234, 1)',
									legendFontColor: '#7F7F7F',
									legendFontSize: 15,
								},
								{
									name: AppString.Dashboard.PieChartLabel2,
									population: CalTotalAdmin(),
									color: '#EB6767',
									legendFontColor: '#7F7F7F',
									legendFontSize: 15,
								}
							]}
						/>
					</View>
				</>}
			</View>
		</ScrollView>

	)
}

export default DashboardScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: scaleFactor(10),
		backgroundColor: '#FAFAFC'
		// justifyContent: 'center',
		// alignItems: 'center'
	},
	title: {
		fontFamily: fonts.RobotoRegular,
		fontSize: 30,
		color: 'blue'
	},
	title2: {
		fontFamily: fonts.RobotoBold,
		fontSize: 20,
	},
	statistic: {
		backgroundColor: Colors.WHITE,
		marginTop: 8,
		flex: 1,
		borderRadius: 15,
		justifyContent: 'flex-start',
		// alignItems: 'center',
		// justifyContent: 'center'
	},
})