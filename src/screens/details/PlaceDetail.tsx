import { View, Text } from 'react-native'
import React from 'react'
import { SafeView } from '~/components/commons'
import { Header } from '~/components/sections'

const PlaceDetail = ({ route }) => {
  const { Place } = route.params ?? ''
  return (
    <SafeView>
      {Place && <>
        <Header title={Place.name} disableThreeDot isMenu={false} />

        <Text>Place Detail</Text>
      </>}

    </SafeView>
  )
}

export default PlaceDetail