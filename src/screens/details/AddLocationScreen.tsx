import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FlatListCommon, Icon, Input, SafeView, TextCustom } from '~/components/commons';
import { Column, Header, Row } from '~/components/sections';
import { Colors, Sizes, fonts } from '~/configs';
import { convertStringToNumber, scaleFactor } from '~/helpers/UtilitiesHelper';
import icons from '~/assets/icons';
import { Formik } from 'formik';
import { ILocation } from '~/apis/types.service';
import { ImageUpload } from '~/containers/master';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AddLocationScreen = ({ route }) => {
  const { Location, type } = route.params ?? '';

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

  const locationObj: ILocation = {
    country: Location?.country ?? '',
    category: Location?.category ?? '',
    description: Location?.description ?? '',
    short_description: Location?.short_description ?? '',
    date_created: Location?.date_created ?? '',
    date_updated: Location?.date_updated ?? '',
    name: Location?.name ?? '',
    rate: Location?.rate ?? 0,
    image_links: Location?.image_links ?? [],
    places: Location?.places ?? [],
  };

  return (
    <Formik
      initialValues={locationObj}
      onSubmit={(values) => {
        //
      }}>{({ values, handleSubmit }) => {
        return (
          <>
            <SafeView>
              <Header title={type === 'add' ? 'Thêm địa điểm' : `${values.name}`} disableThreeDot isMenu={false} />
              <ScrollView>
                <View style={styles.headerContainer}>
                  <View style={styles.ImgContainer}>
                    {values.image_links[0] && <Image
                      source={{ uri: values.image_links[0] }}
                      style={{ height: SCREEN_HEIGHT * 0.8, width: SCREEN_WIDTH }}
                    />}
                    {!values.image_links[0] &&
                      <TouchableOpacity onPress={() => { }}>
                        <Image
                          source={icons.addImg}
                          style={{ height: scaleFactor(200), width: scaleFactor(200), top: SCREEN_HEIGHT * 0.158 }}
                        // resizeMode='center'
                        />
                      </TouchableOpacity>
                    }
                  </View>
                </View>
                {/* <View style={{justifyContent:'flex-end', alignItems:'center', }}>
                  <TextCustom bold isSmall style={{fontSize:20}}>Thêm Hình Ảnh</TextCustom>
                </View> */}

                <View style={styles.bodyContainer}>
                  <View style={styles.TitleContainer}>
                    <Input
                      isNoLabel
                      value={values.name}
                      name='name'
                      label='Nhập tên địa điểm'
                      textInputStyle={styles.LocationTitle}
                    />
                    <View style={styles.ratingContainer}>
                      {starcomponent(convertStringToNumber(`${values.rate}`))}
                      <Input isNoLabel name='rate' value={`${values.rate}`} label='Nhập đánh giá' textInputStyle={{ color: Colors.GRAY_LIGHT, fontSize: Sizes.Note, fontFamily: fonts.RobotoItalic }} />
                    </View>
                  </View>
                  <View style={styles.LocationDetail}>
                    <View style={styles.LocationPin}>
                      <Icon
                        type='Entypo'
                        name='location-pin'
                        size={scaleFactor(25)}
                      />
                      <Input isNoLabel name='country' value={values.country} label='Nhập quốc gia' textInputStyle={{ color: Colors.GRAY_LIGHT, fontSize: Sizes.Note, fontFamily: fonts.RobotoItalic, paddingHorizontal: 5 }} />
                    </View>
                    <Input multiline isNoLabel name='description' value={values.description} label='Nhập mô tả...' textInputStyle={{ fontSize: 15 }} />
                  </View>
                  <View style={styles.LocationPhoto}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10 }}>ẢNH</Text>
                    {/* {Location.image_links[0] !== undefined && <View style={styles.PhotoContainer}>
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
                  </View>} */}
                    <ImageUpload images={values.image_links} onImageUpload={(image)=>{}} />
                  </View>
                  {/* {Location.places[0] !== undefined && <View style={styles.placesToVisit}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10 }}>ĐỊA ĐIỂM THAM QUAN</Text>
                <FlatListCommon
                  onRefresh={() => { }}
                  isShowVertical={false}
                  horizontal
                  data={Location.places.sort((a, b) => b.rating - a.rating)}
                  renderItem={({ item }: { item: ILocationPlace }) => (
                    <View style={{ paddingHorizontal: 5 }}>
                      <LocationItem
                        title={item.name}
                        img={item.image_link[0] ?? ''}
                        rating={item.rating}
                        description={item.description}
                        country={item.country}
                        onPress={() => { }}
                      />
                    </View>
                  )}
                />
              </View>} */}
                </View>

              </ScrollView>
              <View style={{ backgroundColor: Colors.SUCCESS, borderColor: Colors.BORDER_TWO, borderWidth: 1, alignItems: 'center' }}>
                <Row>
                  <Column>
                    <Pressable onPress={() => { }} style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'row' }}>
                      <TextCustom bold style={{ fontSize: Sizes.Title, marginTop: 5, color: 'white', paddingRight: 10 }}>
                        {type === 'add' ? 'TẠO' : 'CẬP NHẬT'}
                      </TextCustom>
                      <Icon
                        name="check-circle"
                        type="Feather"
                        style={{ color: Colors.WHITE }}
                      />
                    </Pressable>
                  </Column>
                </Row>
              </View>
            </SafeView>
          </>
        )
      }}</Formik>
  )
}

export default AddLocationScreen

const styles = StyleSheet.create({
  ImgContainer: {
    zIndex: -1,
    position: 'absolute',
    // backgroundColor: 'pink',
    paddingHorizontal: 10,

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