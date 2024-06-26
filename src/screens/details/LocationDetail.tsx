import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Button, FlatListCommon, Icon, ModalCommon, PrintButton, SafeView, TextCustom } from '~/components/commons'
import { Container, Header, Row } from '~/components/sections'
import { Colors } from '~/configs'
import { goToScreen, scaleFactor } from '~/helpers/UtilitiesHelper'
import imgs from '~/assets/imgs'
import { LocationItem } from '~/containers/master'
import { ILocationPlace } from '~/apis/types.service'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
import QRCode from "react-native-qrcode-svg";
import { Svg } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import ScreenType from '~/navigations/screen.constant'

const LocationDetail = ({ route }) => {
  const { Location } = route.params ?? '';
  let svg = useRef<Svg>(null);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  function chunkArray<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  }
  const imageRows = (imageUrlArray: string[]): string[][] => {
    return chunkArray(imageUrlArray, 3)
  }

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
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  const getDataURL = () => {
    // @ts-ignore
    svg.current?.toDataURL(callback);
  };

  async function callback(dataURL: string) {
    const filename = FileSystem.documentDirectory + (`${Location.id}.jpeg`);
    FileSystem.writeAsStringAsync(filename, dataURL, {
      encoding: FileSystem.EncodingType.Base64
    }).then(() => {
      Sharing.shareAsync(filename);
    });
    // console.log(dataURL);
  }


  return (
    <SafeView>
      {Location && <>
        <Header title={'Chi tiết địa điểm'} disableThreeDot isMenu={false} />
        <ScrollView>
          <View style={styles.headerContainer}>
            <View style={styles.ImgContainer}>
              <Image
                source={{ uri: Location.image_links[0] }}
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
                {starcomponent(Location.rate)}
                <TextCustom isSmall>{`${Location.rate} stars`}</TextCustom>
              </View>
            </View>
            <View style={{paddingBottom: 5}}>
              <TextCustom isSmall>{`${Location.short_description ?? ''}`}</TextCustom>
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
              <View style={styles.LocationPin}>
                <TextCustom isSmall bold> Category: </TextCustom>
                <TextCustom isSmall>{Location.category ?? ''}</TextCustom>
              </View>
              <TextCustom style={{ fontSize: 15 }}>{Location.description}</TextCustom>
            </View>
            <View style={styles.LocationPhoto}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10 }}>ẢNH</Text>
              {Location.image_links[0] !== undefined && <View style={styles.PhotoContainer}>
                {imageRows(Location.image_links).map((item, index) => {
                  return (
                    <View style={{ flexDirection: 'row', padding: 5 }} key={index}>
                      {item.map((imgUrl, columnIndex) => (
                        <View key={columnIndex} style={styles.Images}>
                          <Image
                            source={{ uri: imgUrl }}
                            resizeMode='cover'
                            style={{ width: 100, height: 100, borderRadius: 5 }}
                          />
                        </View>
                      ))}
                    </View>
                  )
                })}
              </View>}
            </View>
            {Location.places[0] !== undefined && <View style={styles.placesToVisit}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10 }}>ĐỊA ĐIỂM THAM QUAN</Text>
              <FlatListCommon
                onRefresh={() => { }}
                isShowVertical={false}
                horizontal
                data={Location.places.sort((a, b) => b.rating - a.rating)}
                renderItem={({ item }: { item: ILocationPlace }) => (
                  <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={()=>goToScreen(ScreenType.Detail.PlaceDetail, {Place: item})}>
                    <LocationItem
                      title={item.name}
                      img={item.image_link[0] ?? ''}
                      rating={item.rating}
                      description={item.description}
                      country={item.country ?? ''}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>}
          </View>

        </ScrollView>
        <ModalCommon isVisible={showQRCode} title='Mã QR Địa Điểm' onClose={() => setShowQRCode(false)}>
          <View style={{ height: SCREEN_HEIGHT * 0.4 }}>
            <Container bgColor='white' style={{ paddingHorizontal: 0 }}>
              <View style={{ flex: 1, paddingVertical: 10, justifyContent: 'center', alignItems:'center' }}>
                  <QRCode size={scaleFactor(180)} value={`${Location.id}`} getRef={(c:any) => (svg.current = c)} />
              </View>
              <Row style={{}}>
                <Button
                  title='Xuất Mã QR'
                  radius={10}
                  color='white'
                  onPress={() => getDataURL()}
                />
              </Row>
            </Container>
          </View>
        </ModalCommon>
        <PrintButton style={{ bottom: scaleFactor(50) }} onPress={() => setShowQRCode(true)} iconName='qrcode-scan' iconType='MaterialCommunityIcons' />

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
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  placesToVisit: {
    paddingVertical: 25,
  }
})