import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Column, Header, Row, SearchBox2 } from '~/components/sections'
import { Button, DateRow, Dropdown, FlatListCommon, SafeView } from '~/components/commons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/redux/reducers'
import { useIsFocused } from '@react-navigation/native'
import { ILocation, ISearchCommon, IUser } from '~/apis/types.service'
import { LocationItemUser, UserItem } from '~/containers/master'
import MasterActions from '~/redux/master/master.actions'
import { goToScreen, removeUnicode } from '~/helpers/UtilitiesHelper'
import ScreenType from '~/navigations/screen.constant'
import { Formik, FormikProps } from 'formik'
import { Colors } from '~/configs'
import { convertStringToDate } from '~/helpers/DatetimeHelpers'
import { FROM_DATE, TO_DATE } from '~/configs/initializeVariable'

export interface IMonitoringFilterModel {
	fromDate: string;
	toDate: string;
	regionId: string;
	position: string;
}

const SearchScreen = () => {
	const { userParams, lang } = useSelector((state: RootState) => state.global);
	const { User, locations, places } = useSelector((state: RootState) => state.master);
	const isFocused = useIsFocused();
	const dispatch = useDispatch();
	const [userlist, setUserList] = useState<IUser[]>([]);
	const [isFilter, setIsFilter] = useState<boolean>(true);
	let vi:boolean = lang === 'vi'
	const handleGetUser = useCallback(() => {
		dispatch(MasterActions.getUser());
	}, [dispatch])

	const listLocationAndPlaces = () => {
		let locationAndPlace: ILocation[] = [];
		locationAndPlace.push(...locations)
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
		});
		const data: ILocation[] =  locationAndPlace.map((p) => {
			const keySearch = `${removeUnicode(p.name)} ${p.rate} ${p.country} ${p.category}`
			return {...p, key: keySearch}
		})
		return data;
	}

	const locationsPlaces: ILocation[] = listLocationAndPlaces();
	const [locationList, setLocationList] = useState<ILocation[]>(locationsPlaces);

	const modelSearch = {
		fromdate: FROM_DATE,
		todate: TO_DATE,
		category: 'all',
		stars: 0,
		country: 'all'
	}

	const starsMenu: ISearchCommon[] = [
		{ label: vi ? 'Tất cả' : 'All', value: 0, keySearch: '0' },
		{ label: vi ? '5 sao' : '5 stars', value: 5, keySearch: '5' },
		{ label: vi ? '4 sao' : '4 stars', value: 4, keySearch: '4' },
		{ label: vi ? '3 sao' : '3 stars', value: 3, keySearch: '3' },
		{ label: vi ? '2 sao' : '2 stars', value: 2, keySearch: '2' },
		{ label: vi ? '1 sao' : '1 stars', value: 1, keySearch: '1' },
	]

	useEffect(() => {
		if (isFocused) {
			if (userParams.usertype !== 'admin') {

			} else {
				handleGetUser();
			}
		} else {

		}
	}, [isFocused, handleGetUser]);

	useEffect(() => {
		setUserList(User);
	}, [User]);

	const categorylist = () => {
		let categoryMenu: ISearchCommon[] = [];
		let num: number = 0
		categoryMenu.push({
			label: vi ? 'Tất cả' : 'All',
			value: 'all',
			keySearch: 'all tat ca'
		})
		let stringArray: string[] = []
		for (let i in locationsPlaces) {
			const item = locationsPlaces[i]
			num = num + 1;
			stringArray.push(item.category)
		}
		const uniqueArray: string[] = [...new Set(stringArray)];
		uniqueArray.forEach((item, index) => {
			return categoryMenu.push({
				label: item,
				value: `${item}`,
				keySearch: `${item} ${index}`
			})
		})
		return categoryMenu;
	}

	const countryList = () => {
		let countryMenu: ISearchCommon[] = [];
		let num: number = 0
		countryMenu.push({
			label: vi ? 'Tất cả' : 'All',
			value: 'all',
			keySearch: 'all tat ca'
		})
		let stringArray: string[] = []

		for (let i in locationsPlaces) {
			const item = locationsPlaces[i]
			num = num + 1;
			stringArray.push(item.country)
		}
		const uniqueArray: string[] = [...new Set(stringArray)];
		uniqueArray.forEach((item, index) => {
			return countryMenu.push({
				label: item,
				value: `${item}`,
				keySearch: `${item} ${index}`
			})
		})
		return countryMenu;
	}


	async function handleSearch(query: string) {
		let charsToRemove = ['all', '0']
		let newquery = query;
		charsToRemove.forEach(char => {
			newquery = query.replace(new RegExp(char, 'g'), '');
		});
		const newData = locationsPlaces.filter((item) => {
			const itemData = item.key!.toUpperCase();
			const textData = removeUnicode(newquery).toUpperCase();
			return itemData.indexOf(textData) > -1;
		});
		setLocationList(newData)
	}

	return (
		<>
			<View style={{ flex: 1 }}>
				{userParams.usertype === 'admin' && <>
					<View style={{ padding: 10, marginTop: -20 }}>
						<SearchBox2
							placeholder={vi ? 'Tìm kiếm người dùng' : 'Search user'}
							dataSource={[]}
							accessor={'key'}
							stringtext={() => { }}
						/>
					</View>
					<FlatListCommon
						onRefresh={handleGetUser}
						isShowVertical={true}
						data={userlist}
						renderItem={({ item, index }: { item: IUser }) => (
							<UserItem
								id={item.id ?? 0}
								name={item.name}
								mobile={item.mobile}
								address={item.address}
								username={item.username}
								imgurl={item.imgurl}
								vi={vi}
								usertype={item.usertype ?? 'user'}
								onPress={() => {
									Alert.alert(`USERID ${item.id}`, vi ? 'Lựa chọn hành động' : 'Select option', [
										{
											text: vi ? 'Cập nhật' : 'Edit', onPress: () => {
												goToScreen(ScreenType.Detail.UpdateUser, { user: item })
											}
										},
										{
											text: vi ? 'Xoá' : 'Delete', onPress: () => {
												dispatch(MasterActions.deleteUser(`${item.id}`))
												const updatedArray = userlist.filter(obj => obj.id !== item.id);
												setUserList([...updatedArray])
											}
										},
										{ text: vi ? 'Huỷ bỏ' : 'Cancel', onPress: () => { } }
									])
								}}
							/>
						)}
					/>

				</>}
				{userParams.usertype !== 'admin' && <>
					<View style={{ padding: 10, marginTop: -20 }}>
						<SearchBox2
							placeholder={vi ? 'Tìm kiếm địa điểm' : 'Search location'}
							dataSource={locationsPlaces}
							accessor={'key'}
							stringtext={handleSearch}
							onFilter={()=>setIsFilter(true)}
						/>
					</View>
					{isFilter && <View style={{ flex: 1 }}>
						<Formik
							enableReinitialize
							initialValues={modelSearch}
							onSubmit={(values) => {
								if(values.category === 'all' && values.country === 'all' && `${values.stars}` === '0') {
									setLocationList(locationsPlaces)
								} else handleSearch(`${values.category} ${values.country} ${values.stars}`)
								setIsFilter(false)
							}}>
							{({ values, handleSubmit }) => {
								return (
									<View style={{
										marginHorizontal: 10,
										backgroundColor: Colors.WHITE,
										marginTop: 10,
										borderRadius: 15
									}}>
										<Row>
											<Column>
												<DateRow
													label={vi ? 'Từ ngày' : 'From date'}
													date={convertStringToDate(values.fromdate)}
													name="fromdate"
													type="date"
												/>
											</Column>
											<Column>
												<DateRow
													label={vi ? 'Đến ngày' : 'To date'}
													date={convertStringToDate(values.todate)}
													name="todate"
													type="date"
												/>
											</Column>
										</Row>
										<Row>
											<Column>
												<Dropdown
													label={vi ? 'Lọc theo loại địa điểm' : 'Filter by location'}
													name="category"
													data={categorylist()}
													selectedValue={values.category}
													searchPlaceholder="Search..."
												/>
											</Column>
										</Row>
										<Row>
											<Column>
												<Dropdown
													label={!vi ? 'Filter by rating' : 'Lọc theo đánh giá'}
													name="stars"
													data={starsMenu}
													selectedValue={values.stars}
													searchPlaceholder="Search..."
												/>
											</Column>
										</Row>
										<Row>
											<Column>
												<Dropdown
													label={!vi ? 'Filter by country' : 'Lọc theo quốc gia'}
													name="country"
													data={countryList()}
													selectedValue={values.country}
													searchPlaceholder="Search..."
												/>
											</Column>
										</Row>

										<Row>
											<Column style={{ justifyContent: 'center', alignItems: 'center' }}>
												<Button
													iconLeft={{ type: 'AntDesign', name: 'filter' }}
													title={!vi ? 'Search' : 'Tìm kiếm'}
													color={Colors.WHITE}
													radius={20}
													onPress={handleSubmit}
												/>
											</Column>
										</Row>
									</View>
								);
							}}
						</Formik>
					</View>}
					{!isFilter && <View style={{ flex: 1 }}>

						<FlatListCommon
							onRefresh={() => setLocationList(locationsPlaces)}
							isShowVertical={true}
							data={locationList}
							renderItem={({ item }: { item: ILocation }) => (
								<LocationItemUser
									name={item.name}
									img={item.image_links}
									country={item.country}
									category={item.category}
									date_created={item.date_created}
									date_updated={item.date_updated}
									id={item.id ?? 0}
									short_description={item.short_description ?? ''}
									rate={item.rate}
									onPress={() => goToScreen(ScreenType.Detail.LocationDetail, { Location: item })}
								/>
							)}
						/>
					</View>}
				</>}
			</View>

		</>
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