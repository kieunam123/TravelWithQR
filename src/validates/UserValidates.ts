import * as Yup from 'yup';

export const UserValidates = Yup.object().shape({
  name: Yup.string().required('Vui lòng không bỏ trống thông tin!'),
  mobile: Yup.string().required('Vui lòng không bỏ trống thông tin!'),
  address: Yup.string().required('Vui lòng không bỏ trống thông tin!'),
  username: Yup.string().required('Vui lòng không bỏ trống thông tin!'),
  // image_links: Yup.string().required('Vui lòng không bỏ trống thông tin!'),
});