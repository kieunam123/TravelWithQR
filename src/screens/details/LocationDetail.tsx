import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatListCommon, Icon, SafeView, TextCustom } from '~/components/commons'
import { Header } from '~/components/sections'
import { Colors } from '~/configs'
import { scaleFactor } from '~/helpers/UtilitiesHelper'
import imgs from '~/assets/imgs'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const LocationDetail = ({ route }) => {
  const { Location } = route.params ?? '';
  function chunkArray<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  }
  const imageRows = (imageUrlArray: string[]): string[][] => {
    return chunkArray(imageUrlArray, 3)
  }

  return (
    <SafeView>
      {Location && <>
        <Header title={'Chi tiết địa điểm'} disableThreeDot isMenu={false} />
        <ScrollView>
          <View style={styles.headerContainer}>
            <View style={styles.ImgContainer}>
              <Image
                source={imgs.background_img1}
                style={{ height: SCREEN_HEIGHT * 0.8, width: SCREEN_WIDTH }}
              />
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.TitleContainer}>
              <Text style={styles.LocationTitle}>
                {Location.name}
              </Text>
              <View style={styles.ratingContainer}>
                <Text>Stars & rating</Text>
              </View>
            </View>
            <View style={styles.LocationDetail}>
              <View style={styles.LocationPin}>
                <Icon
                  type='Entypo'
                  name='location-pin'
                  size={scaleFactor(25)}
                />
                <TextCustom isSmall bold style={{ paddingHorizontal: 5 }}>{Location.country}</TextCustom>
              </View>
              <TextCustom style={{fontSize: 15}}>{Location.description}</TextCustom>
            </View>
            <View style={styles.LocationPhoto}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10 }}>PHOTOS</Text>
              {Location.image_links[0] !== undefined && <View style={styles.PhotoContainer}>
                {imageRows(Location.image_links).map((item, index) => {
                  return (
                    <View style={{ flexDirection: 'row', padding: 5 }} key={index}>
                      {item.map((imgUrl, columnIndex) => (
                        <View key={columnIndex} style={styles.Images}>
                          <Image
                            source={{ uri: imgUrl }}
                            resizeMode='cover'
                            style={{width: 100, height: 100, borderRadius: 5}}
                          />
                        </View>
                      ))}
                    </View>
                  )
                })}
              </View>}
            </View>
          </View>

        </ScrollView>
      </>}
    </SafeView>
  )
}

export default LocationDetail

const styles = StyleSheet.create({
  ImgContainer: {
    zIndex: -1,
    position: 'absolute',
    backgroundColor: 'pink',
    paddingHorizontal: 10,
    // flex:1

  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'red',
    zIndex: -1
  },
  bodyContainer: {
    flex: 1,
    marginTop: scaleFactor(300),
    borderColor: Colors.BORDER_TWO,
    borderWidth: 1,
    backgroundColor: 'white',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    padding: 25
  },
  TitleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    flexDirection: 'row'

  },
  LocationTitle: {
    fontSize: 30,
    fontWeight: 'bold',

  },
  ratingContainer: {

  },
  LocationDetail: {
    // paddingVertical: 25
    paddingBottom: 25
  },
  LocationPin: {
    flexDirection: 'row',
    paddingBottom: 25,
    alignItems: 'center'
  },
  LocationPhoto: {
    flex: 1
  },
  PhotoContainer: {
    flexDirection: 'column',
  },
  Images: {
    flex: 1,
    // borderRadius: 25
    // aspectRatio: 1,
  }
})