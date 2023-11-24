import { View, Text } from 'react-native'
import React from 'react'
import { Button, Dropdown, Input, SafeView } from '~/components/commons';
import { Column, Container, Header, Row } from '~/components/sections';
import { Formik } from 'formik';
import { ISearchCommon, IUser } from '~/apis/types.service';
import MasterActions from '~/redux/master/master.actions';
import { useDispatch } from 'react-redux';
import { Card } from '~/components/cards';
import { Colors } from '~/configs';

const UpdateUserScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { user } = route.params ?? '';
  const userModel: IUser = {
    name: user.name ?? '',
    mobile: user.mobile ?? '',
    address: user.address ?? '',
    username: user.username ?? '',
    password: user.password,
    imgurl: user.imgurl ?? '',
    usertype: user.usertype ?? 'user',
  }
  const UserType: ISearchCommon[] = [
    { label: 'Người dùng', value: 'user', keySearch: 'user' },
    { label: 'Quản trị viên', value: 'admin', keySearch: 'admin' },
  ]

  return (
    <SafeView>
      <Header title={'Cập nhật thông tin user'} isMenu={false} disableThreeDot noShadow />
      <Container style={{ flex: 1, paddingTop: 10 }}>
        <Formik
          initialValues={userModel}
          onSubmit={(values) => {
            const obj: IUser = { ...userModel, ...values }
            console.log(obj);
            dispatch(MasterActions.updateUser(user.id, values))
          }}>
          {({ values, handleSubmit, setFieldValue }) => {
            return (
              <Container isIncludeScrollView>
                <Card>
                  <Row>
                    <Column>
                      <Dropdown
                        label={'Phân quyền'}
                        name='usertype'
                        data={UserType}
                        selectedValue={values.usertype}
                        modalTitle='Tuỳ chọn phân quyền'
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Input
                        value={values.name}
                        name="name"
                        label={'Họ tên'}
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Input
                        value={values.mobile}
                        name='mobile'
                        label={'Số điện thoại'}
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Input
                        value={values.address}
                        name='address'
                        label={'Địa chỉ'}
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Input
                        value={values.username}
                        name='username'
                        label={'username'}
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Input
                        value={values.imgurl}
                        name='imgurl'
                        label={'Link ảnh'}
                      />
                    </Column>
                  </Row>
                </Card>
                <Row>
                  <Column style={{ justifyContent: 'center' }}>
                    <Button
                      title={'Cập nhật thông tin'}
                      radius={10}
                      iconRight={{ type: 'AntDesign', name: 'checkcircle' }}
                      color={Colors.WHITE}
                      onPress={handleSubmit}
                    />
                  </Column>
                </Row>
              </Container>
            )
          }}
        </Formik>
      </Container>
    </SafeView>
  )
}

export default UpdateUserScreen