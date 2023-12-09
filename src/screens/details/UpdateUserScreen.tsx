import { View, Text } from 'react-native'
import React from 'react'
import { Button, Dropdown, Input, SafeView } from '~/components/commons';
import { Column, Container, Header, Row } from '~/components/sections';
import { Formik } from 'formik';
import { ISearchCommon, IUser } from '~/apis/types.service';
import MasterActions from '~/redux/master/master.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '~/components/cards';
import { Colors } from '~/configs';
import { UserValidates } from '~/validates/UserValidates';
import { RootState } from '~/redux/reducers';
import { UserValidatesEn } from '~/validates/UserValidatesEn';

const UpdateUserScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state: RootState) => state.global);
  let vi:boolean = lang === 'vi'
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
    { label: vi ? 'Người dùng' : 'User', value: 'user', keySearch: 'user' },
    { label: vi ? 'Quản trị viên' : 'Administrator', value: 'admin', keySearch: 'admin' },
  ]

  return (
    <SafeView>
      <Header title={vi ? 'Cập nhật thông tin user' : 'Update information'} isMenu={false} disableThreeDot noShadow />
      <Container style={{ flex: 1, paddingTop: 10 }}>
        <Formik
          validationSchema={vi ? UserValidates : UserValidatesEn}
          initialValues={userModel}
          onSubmit={(values) => {
            const obj: IUser = { ...userModel, ...values }
            console.log(obj);
            dispatch(MasterActions.updateUser(user.id, values))
          }}>
          {({ values, handleSubmit, setFieldValue, isValid }) => {
            return (
              <Container isIncludeScrollView>
                <Card>
                  <Row>
                    <Column>
                      <Dropdown
                        label={vi ? 'Phân quyền' : 'Role'}
                        name='usertype'
                        data={UserType}
                        selectedValue={values.usertype}
                        modalTitle={vi ? 'Tuỳ chọn phân quyền' : 'Role option'}
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Input
                        value={values.name}
                        name="name"
                        label={vi ? 'Họ tên' : 'Fullname'}
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Input
                        value={values.mobile}
                        name='mobile'
                        label={vi ? 'Số điện thoại' : 'Phone number'}
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Input
                        value={values.address}
                        name='address'
                        label={vi ? 'Địa chỉ' : 'Adress'}
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
                        label={vi ? 'Link ảnh' : 'Image URL'}
                      />
                    </Column>
                  </Row>
                </Card>
                <Row>
                  <Column style={{ justifyContent: 'center' }}>
                    <Button
                      disabled={!isValid}
                      title={vi ? 'Cập nhật thông tin' : 'Update information'}
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