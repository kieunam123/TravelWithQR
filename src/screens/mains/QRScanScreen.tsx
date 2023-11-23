import { StyleSheet, Text, View, Alert, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Header, SearchBox2 } from '~/components/sections'
import { FlatListCommon, PrintButton, SafeView } from '~/components/commons'
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

const QRScanScreen = () => {
	const { locations } = useSelector((state: RootState) => state.master);
	const { userParams } = useSelector((state: RootState) => state.global);
	const isFocused = useIsFocused();
	const dispatch = useDispatch();
	const [isScanQR, setIsScanQR] = useState<boolean>(false);

	const handleGetLocation = useCallback(() => {
		dispatch(MasterActions.getLocation())
	}, [dispatch]);

	const camera = async () => {
		const { status } = await BarCodeScanner.requestPermissionsAsync();
		const grantedCamera = await ImagePicker.getCameraPermissionsAsync();
		const granted = await ImagePicker.requestCameraPermissionsAsync();
		(status !== 'granted' && grantedCamera.status !== "granted" && granted.status !== 'granted') ? Alert.alert('Vui lòng cấp quyền truy cập Camera!', '', [{ text: 'OK', style: 'cancel' }]) : (setIsScanQR(true));
	};

	const handleScanQR = ({ data }) => {
		let item: string = data;
		let locationFound: ILocation | undefined
		if (item !== undefined) {
			setIsScanQR(false);
			for (let i = 0; i < locations.length; i += 1) {
				const location = locations.find((p) => `${p.id}` === item);
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
		Alert.alert(`${item.name}`, `Vui lòng lựa chọn hành động`, [
			{ text: 'Cập nhật', onPress: () => goToScreen(ScreenType.Detail.AddLocation, {Location: item, type: 'update'}) },
			{ text: 'Xoá', onPress: () => { } },
			{ text: 'Huỷ bỏ', onPress: () => { } }
		])
	}

	return (
		<SafeView>
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
				{userParams.usertype === 'admin' && <>
					<View style={{ padding: 10, marginTop: -20 }}>
						<SearchBox2
							placeholder={'Tìm kiếm địa điểm'}
							dataSource={[]}
							accessor={'key'}
							stringtext={() => { }}
						/>
					</View>

					<FlatListCommon
						onRefresh={() => { }}
						isShowVertical={true}
						data={locations}
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
					<PrintButton style={{ bottom: scaleFactor(125) }} onPress={() => { }} iconName='export' iconType='Entypo' />
					<PrintButton style={{ bottom: scaleFactor(50) }} onPress={() => goToScreen(ScreenType.Detail.AddLocation, {type: 'add'})} iconName='plus' iconType='AntDesign' />
				</>}
			</View>}
		</SafeView>
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