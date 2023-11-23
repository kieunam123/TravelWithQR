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

interface ImageUploadProps {
  images: string[];
  onImageUpload: (status: boolean) => void;
  onImageUploadComplete: (newlist: string[]) => void;
  onDeleteImage: (index: number) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, onImageUpload, onImageUploadComplete, onDeleteImage }) => {
  let imagelist: string[] = images

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Vui lòng cấp quyền truy cập thư viện!!');
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
        alert(`Không thể tải ảnh lên host. status ${response.status}`);
      }
    }
    onImageUpload(false);
  };

  const renderImageGrid = () => {
    return (
      <>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <TouchableOpacity onLongPress={() => {
              Alert.alert('Xác nhận thao tác', 'Bạn muốn xoá hình ảnh này?', [
                {text: 'Xoá', onPress:()=>onDeleteImage(index)},
                {text: 'Huỷ bỏ', onPress:()=>{}}
              ])
              }}>
              <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
            {index === images.length - 1 && (
              <TouchableOpacity onPress={pickImage} style={{}}>
                <Image source={icons.addImg} style={styles.image} />
              </TouchableOpacity>
            )}
          </View>
        ))}
        {!images[0] && <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage} style={{}}>
            <Image source={icons.addImg} style={styles.image} />
          </TouchableOpacity>
        </View>}
      </>
    );
  };


  return <View style={styles.container}>{renderImageGrid()}</View>;
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
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
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
});

export default ImageUpload;
