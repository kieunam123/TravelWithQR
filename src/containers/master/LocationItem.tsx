import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Container } from '~/components/sections'
import { Card } from '~/components/cards'
import { Colors } from '~/configs'
import { scaleFactor } from '~/helpers/UtilitiesHelper'
import { TextCustom } from '~/components/commons'

export interface IProps {
  title: string;
  description?: string;
  short_description?: string;
  country: string;
  img: string;
  onPress: () => void;
}

const LocationItem: React.FC<IProps> = (props) => {
  return (
    <>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.itemContainer}>
          <View style={styles.imgContainer}>
            <Image source={{ uri: props.img }} resizeMode='cover' style={styles.img} />
          </View>
          <TextCustom bold>{props.title}</TextCustom>
          <TextCustom bold isSmall>{props.short_description ?? props.country}</TextCustom>

        </View>
      </TouchableOpacity>
    </>
  )
}

export default LocationItem

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.WHITE,
    marginTop: 10,
    paddingHorizontal: scaleFactor(10),
    paddingVertical: 10,
    // flex: 1,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 15
    // flexDirection: 'row',
  },
  imgContainer: {
    // flex:1,
    paddingBottom:scaleFactor(10)
  },
  img: {
    minHeight: scaleFactor(150),
    minWidth: scaleFactor(150),
    borderRadius: 15
  }
})