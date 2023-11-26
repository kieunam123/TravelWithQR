import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scaleFactor } from '~/helpers/UtilitiesHelper';
import { Colors } from '~/configs';
import { Icon, TextCustom } from '~/components/commons';

export interface IProps {
  onPress?: () => void;
  id: number;
  name: string;
  mobile: string;
  address: string;
  username: string;
  imgurl?: string;
  usertype?: string;
}

const UserItem: React.FC<IProps> = (props) => {
  return (
    <>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.itemContainer}>
          <View
            style={{
              flexDirection: 'row',
              borderColor: Colors.GRAY_LIGHT,
              // borderBottomWidth: 0.5,
              // borderTopWidth: 0.5,
              borderWidth: 0.5,
              padding: 10,
              borderRadius: 12,
              backgroundColor: 'white'
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              {props.imgurl !== '' && <Image
                source={{ uri: props.imgurl ?? 'https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg' }}
                style={{ width: scaleFactor(120), height: scaleFactor(120), borderRadius: 60 }}
                resizeMode='cover'
              />}
              {props.imgurl === '' && <Icon name='user' type="FontAwesome" size={75} color={Colors.GRAY_LIGHT} />} 
            </View>
            <View style={{ flex: 2 }}>
              <View style={styles.rowItem}>
                <TextCustom style={{ fontSize: 12, fontWeight: 'bold' }}>User ID</TextCustom>
                <TextCustom bold style={styles.rowText}>{props.id}</TextCustom>
              </View>
              <View style={styles.rowItem}>
                <TextCustom style={{ fontSize: 12, fontWeight: 'bold' }}>Username</TextCustom>
                <TextCustom style={styles.rowText}>
                  {props.username}
                </TextCustom>
              </View>
              <View style={styles.rowItem}>
                <TextCustom style={{ fontSize: 12, fontWeight: 'bold' }}>Họ tên</TextCustom>
                <TextCustom style={styles.rowText}>{props.name}</TextCustom>
              </View>
              <View style={styles.rowItem}>
                <TextCustom style={{ fontSize: 12, fontWeight: 'bold' }}>Số điện thoại</TextCustom>
                <TextCustom style={styles.rowText}>{props.mobile}</TextCustom>
              </View>
              <View style={styles.rowItem}>
                <TextCustom style={{ fontSize: 12, fontWeight: 'bold' }}>Địa chỉ</TextCustom>
                <TextCustom style={styles.rowText}>{props.address}</TextCustom>
              </View>

              <View style={styles.rowItem}>
                <TextCustom style={{ fontSize: 12, fontWeight: 'bold' }}>Phân quyền</TextCustom>
                <TextCustom style={styles.rowText}>
                  {props.usertype ?? 'user'}
                </TextCustom>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}

export default UserItem

const styles = StyleSheet.create({
  itemContainer: {
    // backgroundColor: Colors.WHITE,
    paddingHorizontal: 10,
    // elevation: 1,
    marginBottom: 10,
    // paddingVertical: 10,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  rowText: { fontSize: scaleFactor(15) },
})