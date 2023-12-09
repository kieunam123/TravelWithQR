import { StyleSheet, Text, View, Alert, Image, Dimensions, Button } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Container, Header, SearchBox2 } from '~/components/sections'
import { FlatListCommon, PrintButton, SafeView, TextCustom } from '~/components/commons'
import { CreateLocation, LocationItemAdmin } from '~/containers/master'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ScreenType from '~/navigations/screen.constant'
import { useDispatch, useSelector } from 'react-redux'
import MasterActions from '~/redux/master/master.actions'
import { RootState } from '~/redux/reducers'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as ImagePicker from 'expo-image-picker';
import icons from '~/assets/icons'
import { goToScreen, scaleFactor } from '~/helpers/UtilitiesHelper'
import { ILocation } from '~/apis/types.service'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const QRScanScreen = () => {
	const { locations, places } = useSelector((state: RootState) => state.master);
	const { userParams, lang } = useSelector((state: RootState) => state.global);
	const isFocused = useIsFocused();
	const dispatch = useDispatch();
	const [isScanQR, setIsScanQR] = useState<boolean>(false);
	const [locationList, setLocationList] = useState<ILocation[]>([]);
	const handleGetLocation = useCallback(() => {
		dispatch(MasterActions.getLocation())
	}, [dispatch]);

	useEffect(() => {
		setLocationList(locations);
	}, [locations]);

	const camera = async () => {
		const { status } = await BarCodeScanner.requestPermissionsAsync();
		const grantedCamera = await ImagePicker.getCameraPermissionsAsync();
		const granted = await ImagePicker.requestCameraPermissionsAsync();
		(status !== 'granted' && grantedCamera.status !== "granted" && granted.status !== 'granted') ? Alert.alert('Vui lòng cấp quyền truy cập Camera!', '', [{ text: 'OK', style: 'cancel' }]) : (setIsScanQR(true));
	};

	let vi:boolean = lang === 'vi'

	const handleScanQR = ({ data }) => {
		let item: string = data;
		let locationFound: ILocation | undefined
		if (item !== undefined) {
			setIsScanQR(false);
			let locationAndPlace: ILocation[] = [];
			locationAndPlace.push(...locationList)
			places.forEach((place) => {
				return locationAndPlace.push({
					id: place.placeid,
					country: place.country ?? '',
					category: place.category ?? '',
					description: place.description,
					short_description: place.short_description ?? '',
					date_created: '',
					date_updated: '',
					name: place.name,
					rate: place.rating,
					image_links: place.image_link ?? [],
					places: []
				})
			})
			for (let i = 0; i < locationAndPlace.length; i += 1) {
				const location = locationAndPlace.find((p) => `${p.id}` === item);
				if (location) {
					locationFound = location
				}
			}
			return locationFound !== undefined ? goToScreen(ScreenType.Detail.LocationDetail, { Location: locationFound }) : null
		}
	};

	useEffect(() => {
		if (isFocused) {
			if (userParams.usertype !== 'admin') {
				camera();
			} else {
				handleGetLocation();
			}
		} else {
			setIsScanQR(false)
		}
	}, [isFocused, handleGetLocation])

	const OnLocationPress = (item: ILocation) => {
		Alert.alert(`${item.name}`, vi ? `Vui lòng lựa chọn hành động` : 'Please select action', [
			{ text: vi ? 'Cập nhật' : 'Edit', onPress: () => {
				goToScreen(ScreenType.Detail.AddLocation, { Location: item, type: 'update' })
			}},
			{
				text: vi ? 'Xoá' : 'Delete', onPress: () => {
					dispatch(MasterActions.deleteLocation(`${item.id}`));
					const updatedArray = locationList.filter(obj => obj.id !== item.id);
					setLocationList([...updatedArray])
				}
			},
			{ text: vi ? 'Huỷ bỏ' : 'Cancel', onPress: () => { } }
		])
	}

	return (
		<>
			{isScanQR && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ flex: .1 }} />
				<Image
					source={icons.qr_scanning}
					style={{ width: scaleFactor(350), height: scaleFactor(350), alignSelf: 'center', overflow: 'hidden', position: 'absolute' }}
				/>
				<BarCodeScanner
					style={{ ...StyleSheet.absoluteFillObject, zIndex: -1, overflow: 'hidden' }}
					onBarCodeScanned={handleScanQR}
				/>
				<View style={{ flex: 1 }} />
			</View>}
			{!isScanQR && <View style={styles.container}>
				{userParams.usertype !== 'admin' && <View style={{alignItems:'center', justifyContent: 'center', flex: 1}}>
						<TextCustom bold style={{alignSelf:'center', justifyContent:'center'}}>{vi ? 'Khong phai ma QR duoc xuat tu ung dung!\n Vui long thu lai!' : 'This QR is not exported from the app!\n Please try again!'}</TextCustom>
						<Button title='SCAN QR' onPress={()=>setIsScanQR(true)}></Button>
					</View>}
				{userParams.usertype === 'admin' && <>

					<View style={{ flexDirection: 'row', justifyContent: 'center', height: 85, width:SCREEN_WIDTH}}>
						<View style={{ flex:1, justifyContent:'center', alignItems:'center'  }}>
							<PrintButton style={{right:0, left:0, position:'relative', bottom:0}} onPress={() => { }} iconName='magnifying-glass' iconType='Entypo' />
						</View>
						<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
							<PrintButton style={{right:0, left:0, position:'relative', bottom:0}} onPress={() => goToScreen(ScreenType.Detail.AddLocation, { type: 'add' })} iconName='plus' iconType='AntDesign' />
						</View>
						<View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
							<PrintButton style={{right:0, left:0, position:'relative', bottom:0}} onPress={() => { }} iconName='export' iconType='Entypo' />
						</View>
					</View>

					{/* <View style={{ padding: 10, marginTop: -20 }}>
						<SearchBox2
							placeholder={'Tìm kiếm địa điểm'}
							dataSource={[]}
							accessor={'key'}
							stringtext={() => { }}
						/>
					</View> */}
					<View style={{flex:1}}>
						<FlatListCommon
							onRefresh={() => { }}
							isShowVertical={true}
							data={locationList}
							renderItem={({ item }: { item: ILocation }) => (
								<LocationItemAdmin
									name={item.name}
									img={item.image_links}
									country={item.country}
									category={item.category}
									date_created={item.date_created}
									date_updated={item.date_updated}
									id={item.id ?? 0}
									short_description={item.short_description ?? ''}
									onPress={() => OnLocationPress(item)}
								/>
							)}
						/>
					</View>


				</>}
			</View>}
		</>
	)
}

export default QRScanScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// paddingVertical: 10
		// justifyContent: 'center',
		// alignItems: 'center'
	},

	text: {
		fontFamily: 'RobotoBold',
		fontSize: 25,
	}
})