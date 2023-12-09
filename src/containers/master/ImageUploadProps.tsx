import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import icons from '~/assets/icons';
import imgs from '~/assets/imgs';
import { Icon } from '~/components/commons';
import Color from '~/configs/colors';
import * as ImagePicker from 'expo-image-picker';
import { callApiPostWithToken } from '~/helpers/UtilitiesHelper';
import { IMGUR_ACCESSTOKEN, IMGUR_API } from '~/configs/strings';
import { IImgurResult } from '~/apis/types.service';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/reducers';

interface ImageUploadProps {
  images: string[];
  onImageUpload: (status: boolean) => void;
  onImageUploadComplete: (newlist: string[]) => void;
  onDeleteImage: (index: number) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, onImageUpload, onImageUploadComplete, onDeleteImage }) => {
  const {lang} = useSelector((state: RootState) => state.global);
  let vi:boolean = lang === 'vi'
  let imagelist: string[] = images
  function chunkArray<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  }
  const imageRows = (imageUrlArray: string[]): string[][] => {
    return chunkArray(imageUrlArray, 3)
  }
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert(vi ? 'Vui lòng cấp quyền truy cập thư viện!!' : 'Please allow app to access library!');
      return;
    }
    onImageUpload(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
    });
    if (!result.canceled) {
      const response: IImgurResult = await callApiPostWithToken(
        IMGUR_API,
        '',
        { image: result.assets[0].base64 ?? '' },
        `Client-ID ${IMGUR_ACCESSTOKEN}`
      );
      if (response.success) {
        imagelist.push(response.data.link)
        onImageUploadComplete(imagelist)
      } else {
        alert(vi ? `Không thể tải ảnh lên host. status ${response.status}` : `Upload image to host failed. Status: ${response.status}`);
      }
    }
    onImageUpload(false);
  };

  const renderImageGrid = () => {
    return (
      <>
        <View style={styles.PhotoContainer}>
          {imageRows(images).map((item, index) => {
            return (
              <View style={{ flexDirection: 'row', padding: 5 }} key={index}>
                {item.map((imgUrl, columnIndex) => (
                  <View key={columnIndex} style={styles.Images}>
                    <TouchableOpacity onLongPress={() => {
                      Alert.alert(vi ? 'Xác nhận thao tác' : 'Confirm action', vi ? 'Bạn muốn xoá hình ảnh này?' : 'Are you sure you want to delete this image', [
                        { text: vi ? 'Xoá' : 'Delete', onPress: () => onDeleteImage(columnIndex) },
                        { text: vi ? 'Huỷ bỏ' : 'Cancel', onPress: () => { } }
                      ])
                    }}>
                      <Image
                        source={{ uri: imgUrl }}
                        resizeMode='cover'
                        style={styles.image}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )
          })}
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={pickImage} style={{}}>
              <Image source={icons.addImg} style={styles.image} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };


  return <View style={{}}>{renderImageGrid()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    padding: 8,
  },
  imageContainer: {
    width: '32%',
    marginBottom: 8,
    position: 'relative',
  },
  image: { width: 100, height: 100, borderRadius: 5 },

  emptyImageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  PhotoContainer: {
    flexDirection: 'column',
  },
  Images: {
    flex: 1,
    // borderRadius: 25
    // aspectRatio: 1,
  },
});

export default ImageUpload;
