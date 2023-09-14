import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Column, Container, Header, Row } from '~/components/sections'
import { Formik } from 'formik'
import { Card } from '~/components/cards'
import { Button, Input } from '~/components/commons'
import Color from '~/configs/colors'
import { ISampleObj } from '~/apis/types.service'
import { useDispatch } from 'react-redux'
import MasterActions from '~/redux/master/master.actions'

export interface IProps {
  id?: number;
  name?: string;
  mobile?: string;
  address?: string;
}

const CreateLocation: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const sampleObj: ISampleObj = {
    id: props.id,
    name: props.name ?? '',
    mobile: props.mobile ?? '',
    address: props.address ?? '',
  }

  return (
    <>
      <Container style={{ flex: 1, paddingTop: 10 }}>
        <Formik
          initialValues={sampleObj}
          onSubmit={(values: ISampleObj) => {
            values.id
              ? dispatch(MasterActions.createTest(values))
              : dispatch(MasterActions.updateDataTest(`${values.id}`, values))
            console.log(values);
          }}
        >
          {({ values, handleSubmit }) => {
            return (
              <Container isIncludeScrollView>
                <Card>
                  <Row>
                    <Column>
                      <Input
                        value={values.name}
                        name="name"
                        label='Name'
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Input
                        value={values.mobile}
                        name="mobile"
                        label='mobile'
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Input
                        value={values.address}
                        name="address"
                        label='address'
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column style={{ justifyContent: 'center' }}>
                      <Button
                        title={'Create'}
                        radius={10}
                        iconRight={{ type: 'AntDesign', name: 'checkcircle' }}
                        color={Color.WHITE}
                        onPress={handleSubmit}
                      />
                    </Column>
                  </Row>
                </Card>
              </Container>
            )
          }}
        </Formik>
      </Container>
    </>
  )
}

export default CreateLocation

const styles = StyleSheet.create({})