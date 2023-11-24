import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Header, SearchBox2 } from '~/components/sections'
import { FlatListCommon, SafeView } from '~/components/commons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/redux/reducers'
import { useIsFocused } from '@react-navigation/native'
import { IUser } from '~/apis/types.service'
import { UserItem } from '~/containers/master'
import MasterActions from '~/redux/master/master.actions'
import { goToScreen } from '~/helpers/UtilitiesHelper'
import ScreenType from '~/navigations/screen.constant'

const SearchScreen = () => {
	const { userParams } = useSelector((state: RootState) => state.global);
	const { User } = useSelector((state: RootState) => state.master);
	const isFocused = useIsFocused();
	const dispatch = useDispatch();
  const [userlist, setUserList] = useState<IUser[]>([]);
	const handleGetUser = useCallback(() => {
    dispatch(MasterActions.getUser());
  }, [dispatch])

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

	return (
		<SafeView>
			<View style={{ flex: 1 }}>
				{userParams.usertype === 'admin' && <>
					<View style={{ padding: 10, marginTop: -20 }}>
						<SearchBox2
							placeholder={'Tìm kiếm người dùng'}
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
								usertype={item.usertype ?? 'user'}
								onPress={() => {
									Alert.alert(`USERID ${item.id}`, 'Lựa chọn hành động', [
										{ text: 'Cập nhật', onPress: () => {
											goToScreen(ScreenType.Detail.UpdateUser, {user: item})
										 } },
										{
											text: 'Xoá', onPress: () => {
												dispatch(MasterActions.deleteUser(`${item.id}`))
												const updatedArray = userlist.filter(obj => obj.id !== item.id);
												setUserList([...updatedArray])
											}
										},
										{ text: 'Huỷ bỏ', onPress: () => { } }
									])
								}}
							/>
						)}
					/>

				</>}
			</View>

		</SafeView>
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