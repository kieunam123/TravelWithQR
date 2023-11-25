import { Alert, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button, FlatListCommon, Icon, Input, SafeView, TextCustom } from '~/components/commons';
import { Column, Header, Row } from '~/components/sections';
import { Colors, Sizes, fonts } from '~/configs';
import { chunkArray, convertStringToNumber, scaleFactor } from '~/helpers/UtilitiesHelper';
import icons from '~/assets/icons';
import { Formik } from 'formik';
import { ILocation, ILocationPlace } from '~/apis/types.service';
import { ImageUpload, LocationItem } from '~/containers/master';
import Loading2 from '~/containers/Loading2';
import { useDispatch } from 'react-redux';
import MasterActions from '~/redux/master/master.actions';
import { getCurrentDateToStringDDMMYYY } from '~/helpers/DatetimeHelpers';
import { LocationValidates } from '~/validates/LocationValidates';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AddLocationScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { Location, type } = route.params ?? '';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddPlaces, setIsAddPlaces] = useState<boolean>(false);
  const [placesIndex, setPlacesIndex] = useState<number>();
  const defaultPlaces: ILocationPlace = {
    placeid: Date.now(),
    address: '',
    image_link: [],
    name: '',
    rating: 0,
    description: '',
    // city: '',
    // country: '',
    short_description: '',
  }
  const [places, setPlaces] = useState<ILocationPlace>(defaultPlaces);
  const Rows = (imageUrlArray: ILocationPlace[]): ILocationPlace[][] => {
    return chunkArray(imageUrlArray, 2)
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
    date_created: Location?.date_created ?? getCurrentDateToStringDDMMYYY(),
    date_updated: type === 'add' ? '' : getCurrentDateToStringDDMMYYY(),
    name: Location?.name ?? '',
    rate: Location?.rate ?? '',
    image_links: Location?.image_links ?? [],
    places: Location?.places ?? [],
  };

  return (
    <Formik
      initialValues={locationObj}
      validationSchema={LocationValidates}
      onSubmit={(values) => {
        const objAdd = { ...values, id: Date.now() }
        if (type === 'add') {
          console.log(JSON.stringify(objAdd, undefined, 2));
          dispatch(MasterActions.createLocation(values))
        } else {
          console.log(JSON.stringify(values, undefined, 2));
          dispatch(MasterActions.updateLocation(`${Location.id}`, values))
        }
      }}>{({ values, handleSubmit, setFieldValue, isValid }) => {
        async function updatePlaces() {
          if (placesIndex !== undefined) {
            let newPlaces: ILocationPlace[] = values.places;
            const updatePlaces: ILocationPlace = { ...values.places[placesIndex], ...places };
            newPlaces[placesIndex] = updatePlaces;
            setFieldValue('places', newPlaces);
          } else setFieldValue('places', [...values.places, places])
        }
        return (
          <>
            {!isAddPlaces && <SafeView>
              <Loading2 text='Vui lòng đợi giây lát...' isVisible={isLoading} />
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
                    <View>
                      <Input
                        isNoLabel
                        value={values.name}
                        name='name'
                        label='Nhập tên địa điểm'
                        textInputStyle={styles.LocationTitle}
                      />
                      <Input isNoLabel name='short_description' value={values.short_description} label='Nhập chú thích...' textInputStyle={{ color: Colors.GRAY_LIGHT, fontSize: Sizes.Note, fontFamily: fonts.RobotoItalic, paddingHorizontal: 5 }} />
                    </View>
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
                    <View style={styles.LocationPin}>
                      <TextCustom bold isSmall>Category: </TextCustom>
                      <Input isNoLabel name='category' value={values.category} label='Nhập loại địa điểm' textInputStyle={{ color: Colors.GRAY_LIGHT, fontSize: Sizes.Note, fontFamily: fonts.RobotoItalic, paddingHorizontal: 5 }} />
                    </View>
                    <Input multiline isNoLabel name='description' value={values.description} label='Nhập mô tả...' textInputStyle={{ fontSize: 15 }} />
                  </View>
                  <View style={styles.LocationPhoto}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10 }}>ẢNH</Text>
                    <ImageUpload
                      images={values.image_links}
                      onImageUpload={(status) => setIsLoading(status)}
                      onImageUploadComplete={(newlist) => setFieldValue('image_links', newlist)}
                      onDeleteImage={(index) => {
                        let updateImages = [...values.image_links]
                        updateImages.splice(index, 1);
                        setFieldValue('image_links', updateImages);
                      }}
                    />
                  </View>
                  {type !== 'add' && <View style={styles.placesToVisit}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10 }}>ĐỊA ĐIỂM THAM QUAN</Text>
                    <View style={styles.PhotoContainer}>
                      {Rows(values.places).map((item, index) => {
                        return (
                          <View style={{ flexDirection: 'row', padding: 5 }} key={index}>
                            {item.map((item, columnIndex) => (
                              <View key={columnIndex} style={styles.Images}>
                                <TouchableOpacity onPress={() => {
                                  Alert.alert(`${item.name} - ID: ${item.placeid}`, 'Lựa chọn hành động', [
                                    {
                                      text: 'Cập nhật', onPress: () => {
                                        setPlaces(item);
                                        setPlacesIndex(index);
                                        setIsAddPlaces(true);
                                      }
                                    },
                                    {
                                      text: 'Xoá', onPress: () => {
                                        const updatedArray = values.places.filter((obj, index) => index !== columnIndex);
                                        setFieldValue('places', updatedArray)
                                      }
                                    },
                                    { text: 'Huỷ bỏ', onPress: () => { } }
                                  ])
                                }}>
                                  <LocationItem
                                    title={item.name}
                                    img={item.image_link[0] ?? ''}
                                    rating={item.rating}
                                    description={item.description}
                                    country={item.country ?? ''}

                                  />
                                </TouchableOpacity>
                              </View>
                            ))}
                          </View>
                        )
                      })}
                      <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={() => setIsAddPlaces(true)} style={{}}>
                          <Image source={icons.addLocation} style={styles.image} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}
                </View>
              </ScrollView>
              {/* <View style={{ backgroundColor: Colors.SUCCESS, borderColor: Colors.BORDER_TWO, borderWidth: 1, alignItems: 'center' }}>
                <Row>
                  <Column>
                    <Pressable onPress={() => handleSubmit()} style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'row' }}>
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
              </View> */}
              <Row>
                <Column style={{ justifyContent: 'center' }}>
                  <Button
                    disabled={!isValid}
                    bgColor={Colors.SUCCESS}
                    title={type === 'add' ? 'TẠO' : 'CẬP NHẬT'}
                    radius={10}
                    iconRight={{ type: 'Feather', name: 'check-circle' }}
                    color={Colors.WHITE}
                    onPress={handleSubmit}
                  />
                </Column>
              </Row>
            </SafeView>}
            {isAddPlaces && <SafeView>
              <Loading2 text='Vui lòng đợi giây lát...' isVisible={isLoading} />
              <Header
                title={placesIndex === undefined ? 'Thêm điểm tham quan' : `${values.places[placesIndex].name}`}
                isMenu={false} currentScreenOff onBackPress={() => {
                  Alert.alert('Chưa lưu thông tin', 'Thông tin chưa được lưu\nBạn có chắc muốn thoát?', [
                    {
                      text: 'Thoát', onPress: () => {
                        setPlaces(defaultPlaces);
                        setIsAddPlaces(false);
                        setPlacesIndex(undefined);
                      }
                    },
                    {
                      text: 'Lưu', onPress: async () => {
                        await updatePlaces();
                        setPlaces(defaultPlaces);
                        setIsAddPlaces(false);
                        setPlacesIndex(undefined);
                      }
                    }
                  ])
                }}
                onMenuPress={async () => {
                  await updatePlaces();
                  setPlaces(defaultPlaces);
                  setIsAddPlaces(false);
                  setPlacesIndex(undefined);
                }} />
              <ScrollView>
                <View style={styles.headerContainer}>
                  <View style={styles.ImgContainer}>
                    {placesIndex !== undefined && <Image
                      source={{ uri: values.places[placesIndex].image_link[0] ?? 'https://icon-library.com/images/add-image-icon/add-image-icon-0.jpg' }}
                      style={{ height: SCREEN_HEIGHT * 0.8, width: SCREEN_WIDTH }}
                    />}
                    {placesIndex === undefined &&
                      <TouchableOpacity onPress={() => { }}>
                        <Image
                          source={places.image_link[0] !== undefined ? { uri: places.image_link[0] } : icons.addImg}
                          style={{ height: scaleFactor(200), width: scaleFactor(200), top: SCREEN_HEIGHT * 0.158 }}
                        // resizeMode='center'
                        />
                      </TouchableOpacity>
                    }
                  </View>
                </View>
                <View style={styles.bodyContainer}>
                  <View style={styles.TitleContainer}>
                    <TextInput
                      style={[styles.inputFormNoLabel, styles.LocationTitle]}
                      placeholder={'Tên điểm tham quan'}
                      defaultValue={placesIndex === undefined ? undefined : values.places[placesIndex].name}
                      onChangeText={(str) => setPlaces({ ...places, name: str })}
                    />
                    <View style={styles.ratingContainer}>
                      {starcomponent(convertStringToNumber(`${places.rating}`))}
                      <TextInput
                        style={[styles.inputFormNoLabel, { color: Colors.GRAY_LIGHT, fontSize: Sizes.Note, fontFamily: fonts.RobotoItalic }]}
                        defaultValue={placesIndex === undefined ? undefined : `${values.places[placesIndex].rating}`}
                        placeholder={'Nhập đánh giá'}
                        onChangeText={(str) => setPlaces({ ...places, rating: convertStringToNumber(str) })}
                      />
                    </View>
                  </View>
                  <View>
                    <TextInput
                      style={[styles.inputFormNoLabel, { color: Colors.GRAY_LIGHT, fontSize: Sizes.Note, fontFamily: fonts.RobotoItalic, paddingHorizontal: 5 }]}
                      defaultValue={placesIndex === undefined ? undefined : values.places[placesIndex].short_description ?? ''}
                      placeholder={'Nhập chú thích...'}
                      onChangeText={(str) => setPlaces({ ...places, short_description: str })}
                    />
                  </View>

                  <View style={styles.LocationDetail}>
                    <View style={styles.LocationPin}>
                      <Icon
                        type='Entypo'
                        name='location-pin'
                        size={scaleFactor(25)}
                      />
                      <TextInput
                        style={[styles.inputFormNoLabel, { color: Colors.GRAY_LIGHT, fontSize: Sizes.Note, fontFamily: fonts.RobotoItalic, paddingHorizontal: 5 }]}
                        placeholder={`Nhập địa chỉ`}
                        defaultValue={placesIndex === undefined ? undefined : values.places[placesIndex].address ?? ''}
                        onChangeText={(str) => setPlaces({ ...places, address: str })}
                      />
                    </View>
                    <View style={styles.LocationPin}>
                      <TextCustom bold isSmall>Category: </TextCustom>
                      <TextInput
                        style={[styles.inputFormNoLabel, { color: Colors.GRAY_LIGHT, fontSize: Sizes.Note, fontFamily: fonts.RobotoItalic, paddingHorizontal: 5 }]}
                        defaultValue={placesIndex === undefined ? undefined : values.places[placesIndex].category ?? undefined}
                        placeholder={'Nhập loại địa điểm...'}
                        onChangeText={(str) => setPlaces({ ...places, category: str })}
                      />
                    </View>
                    <TextInput
                      style={[styles.inputFormNoLabel, { fontSize: 15 }]}
                      placeholder={'Nhập mô tả...'}
                      defaultValue={placesIndex === undefined ? undefined : values.places[placesIndex].description ?? undefined}
                      onChangeText={(str) => setPlaces({ ...places, description: str })}
                      multiline
                    />
                  </View>
                  <View style={styles.LocationPhoto}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10 }}>ẢNH</Text>
                    <ImageUpload
                      images={places.image_link}
                      onImageUpload={(status) => setIsLoading(status)}
                      onImageUploadComplete={(newlist) => setPlaces({ ...places, image_link: newlist })}
                      onDeleteImage={(index) => {
                        if (placesIndex !== undefined) {
                          let updateImages = [...values.places[placesIndex].image_link]
                          updateImages.splice(index, 1);
                          setPlaces({ ...places, image_link: updateImages })
                        }
                      }}
                    />
                  </View>
                </View>
              </ScrollView>
            </SafeView>}
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
    fontSize: 27,
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
  },
  imageContainer: {
    width: '32%',
    marginBottom: 8,
    position: 'relative',
    // alignSelf: 'center'
  },
  image: { width: 100, height: 100, borderRadius: 5 },
  inputFormNoLabel: {
    fontFamily: fonts.RobotoRegular,
    fontSize: Sizes.Content,
  },
})