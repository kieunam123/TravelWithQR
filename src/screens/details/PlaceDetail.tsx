import { View, Text, ScrollView, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { Button, FlatListCommon, Icon, ModalCommon, PrintButton, SafeView, TextCustom } from '~/components/commons'
import { Container, Header, Row } from '~/components/sections'
import { Colors } from '~/configs'
import { chunkArray, scaleFactor } from '~/helpers/UtilitiesHelper'
import QRCode from 'react-native-qrcode-svg'
import { Svg } from 'react-native-svg'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const PlaceDetail = ({ route }) => {
  const { Place } = route.params ?? ''
  let svg = useRef<Svg>(null);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
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
  const imageRows = (imageUrlArray: string[]): string[][] => {
    return chunkArray(imageUrlArray, 3)
  }
  const getDataURL = () => {
    // @ts-ignore
    svg.current?.toDataURL(callback);
  };

  async function callback(dataURL: string) {
    const filename = FileSystem.documentDirectory + (`${Place.placeid}.jpeg`);
    FileSystem.writeAsStringAsync(filename, dataURL, {
      encoding: FileSystem.EncodingType.Base64
    }).then(() => {
      Sharing.shareAsync(filename);
    });
    // console.log(dataURL);
  }

  return (
    <SafeView>
      {Place && <>
        <Header title={Place.name} disableThreeDot isMenu={false} />
        <ScrollView>
          <View style={styles.headerContainer}>
            <View style={styles.ImgContainer}>
              <Image
                source={{ uri: Place.image_link[0] }}
                style={{ height: SCREEN_HEIGHT * 0.8, width: SCREEN_WIDTH }}
              />
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.TitleContainer}>
              <Text style={styles.LocationTitle}>
                {Place.name}
              </Text>
              <View style={styles.ratingContainer}>
                {starcomponent(Place.rating)}
                <TextCustom isSmall>{`${Place.rating} stars`}</TextCustom>
              </View>
            </View>
            <View style={{paddingBottom: 5}}>
              <TextCustom isSmall>{`${Place.short_description ?? ''}`}</TextCustom>
            </View>
            <View style={styles.LocationDetail}>
              <View style={styles.LocationPin}>
                <Icon
                  type='Entypo'
                  name='location-pin'
                  size={scaleFactor(25)}
                />
                <TextCustom isSmall bold style={{ paddingHorizontal: 5 }}>{Place.address}</TextCustom>
              </View>
              <View style={styles.LocationPin}>
                <TextCustom isSmall bold> Category: </TextCustom>
                <TextCustom isSmall>{Place.category ?? ''}</TextCustom>
              </View>
              <TextCustom style={{ fontSize: 15 }}>{Place.description}</TextCustom>
            </View>
            <View style={styles.LocationPhoto}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10 }}>ẢNH</Text>
              {Place.image_link[0] !== undefined && <View style={styles.PhotoContainer}>
                {imageRows(Place.image_link).map((item, index) => {
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
          </View>

        </ScrollView>
        <ModalCommon isVisible={showQRCode} title='Mã QR Địa Điểm' onClose={() => setShowQRCode(false)}>
          <View style={{ height: SCREEN_HEIGHT * 0.4 }}>
            <Container bgColor='white' style={{ paddingHorizontal: 0 }}>
              <View style={{ flex: 1, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                <QRCode size={scaleFactor(180)} value={`${Place.placeid}`} getRef={(c: any) => (svg.current = c)} />
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

export default PlaceDetail


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