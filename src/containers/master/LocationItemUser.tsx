import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scaleFactor } from '~/helpers/UtilitiesHelper';
import { Colors } from '~/configs';
import { TextCustom } from '~/components/commons';

export interface IProps {
  onPress?: () => void;
  img: string[];
  country: string;
  category: string;
  name: string;
  date_updated?: string;
  date_created?: string;
  short_description?: string;
  id: number
}

const LocationItemUser: React.FC<IProps> = (props) => {
  return (
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
            <Image
              source={{ uri: props.img[0] !== undefined ? props.img[0] : 'https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg' }}
              style={{ width: scaleFactor(120), height: scaleFactor(130), borderRadius: 12 }}
              resizeMode='cover'
            />
          </View>
          <View style={{ flex: 2 }}>
            <View style={styles.rowItem}>
              <TextCustom style={{ fontSize: 12, fontWeight: 'bold' }}>Location ID</TextCustom>
              <TextCustom bold style={styles.rowText}>{props.id}</TextCustom>
            </View>
            <View style={styles.rowItem}>
              <TextCustom style={{ fontSize: 12, fontWeight: 'bold' }}>Name</TextCustom>
              <TextCustom style={styles.rowText}>{props.name}</TextCustom>
            </View>
            <View style={styles.rowItem}>
              <TextCustom style={{ fontSize: 12, fontWeight: 'bold' }}>Country</TextCustom>
              <TextCustom style={styles.rowText}>{props.country}</TextCustom>
            </View>
            <View style={styles.rowItem}>
              <TextCustom style={{ fontSize: 12, fontWeight: 'bold' }}>Category</TextCustom>
              <TextCustom style={styles.rowText}>{props.category}</TextCustom>
            </View>
            <View style={styles.rowItem}>
              <TextCustom style={{ fontSize: 12, fontWeight: 'bold' }}>Date Created</TextCustom>
              <TextCustom style={styles.rowText}>
                {props.date_created}
              </TextCustom>
            </View>
            <View style={styles.rowItem}>
              <TextCustom style={{ fontSize: 12, fontWeight: 'bold' }}>Date Updated</TextCustom>
              <TextCustom style={styles.rowText}>
                {props.date_updated ?? '---'}
              </TextCustom>
            </View>
            {/* <View style={styles.rowItem}>
              <TextCustom style={{ fontSize: 12 }}>{props.short_description}</TextCustom>
            </View> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default LocationItemUser

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