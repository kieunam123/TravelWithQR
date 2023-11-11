import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeView } from '~/components/commons'
import { Header } from '~/components/sections'
import { Colors } from '~/configs'

const LocationDetail = ({ route }) => {
  const { Location } = route.params ?? '';
  return (
    <SafeView>
      {Location && <>
        <Header title={Location.name} disableThreeDot isMenu={false} />
        <View style={styles.headerContainer}>
          <View style={styles.ImgContainer}>
          <Text style={{height:1000}}>LocationDetail</Text>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <Text>LocationDetail</Text>
        </View>

      </>}

    </SafeView>
  )
}

export default LocationDetail

const styles = StyleSheet.create({
  ImgContainer: {
    zIndex: -1,
    position: 'absolute',
    backgroundColor: 'black',

  },
  headerContainer:{
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    backgroundColor:'red',
    zIndex: -1
  },
  bodyContainer: {
    flex: 1,
    marginTop: 200,
    borderColor: Colors.BORDER_TWO,
    borderWidth: 1,
    backgroundColor: 'grey'
  }
})