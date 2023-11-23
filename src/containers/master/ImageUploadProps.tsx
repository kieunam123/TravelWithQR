import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import icons from '~/assets/icons';
import imgs from '~/assets/imgs';
import { Icon } from '~/components/commons';
import Color from '~/configs/colors';
// import * as ImagePicker from 'expo-image-picker';

interface ImageUploadProps {
  images: string[];
  onImageUpload: (image: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, onImageUpload }) => {

  const renderImageGrid = () => {
    const emptySlots = images.length % 3 !== 0 ? 3 - (images.length % 3) : 0;

    return (
      <>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            {index === images.length - 1 && (
              <TouchableOpacity onPress={()=>{}} style={{}}>
                <Image source={icons.addImg} style={styles.image} />
              </TouchableOpacity>
            )}
          </View>
        ))}
        {Array.from({ length: emptySlots }).map((_, index) => (
          <View key={`empty-${index}`} style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>{}} style={{}}>
              <Image source={icons.addImg} style={styles.image} />
            </TouchableOpacity>
          </View>
        ))}
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
