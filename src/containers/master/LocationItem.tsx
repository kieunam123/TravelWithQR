import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Container } from '~/components/sections'
import { Card } from '~/components/cards'
import { Colors } from '~/configs'
import { scaleFactor } from '~/helpers/UtilitiesHelper'
import { Icon, TextCustom } from '~/components/commons'

export interface IProps {
  title: string;
  description?: string;
  short_description?: string;
  rating?: number;
  country: string;
  img: string;
  onPress: () => void;
}

const LocationItem: React.FC<IProps> = (props) => {
  const starcomponent = (rating: number): JSX.Element => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          type='MaterialIcons'
          name={i <= fullStars ? 'star' : 'star-border'}
          color={Colors.Yellow}
          size={scaleFactor(19)}
        />
      );
    }
    if (hasHalfStar) {
      stars[Math.floor(rating)] = (
        <Icon
          key={Math.ceil(rating)}
          type='MaterialIcons'
          name='star-half'
          color={Colors.Yellow}
          size={scaleFactor(19)}
        />
      );
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <TextCustom isSmall>{`${rating}`}</TextCustom>
        {stars}
      </View>);
  };
  return (
    <>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.itemContainer}>
          <View style={styles.imgContainer}>
            <Image source={{ uri: props.img }} resizeMode='cover' style={styles.img} />
          </View>
          <TextCustom bold>{props.title}</TextCustom>
          {props.short_description && <TextCustom bold isSmall>{props.short_description ?? props.country}</TextCustom>}
          {props.rating && starcomponent(props.rating ?? 0)}
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
    // flexDirection: 'row',
  },
  imgContainer: {
    // flex:1,
    paddingBottom: scaleFactor(10)
  },
  img: {
    minHeight: scaleFactor(150),
    minWidth: scaleFactor(150),
    borderRadius: 15
  }
})