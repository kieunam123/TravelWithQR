import * as Yup from 'yup';

export const LocationValidates = Yup.object().shape({
  name: Yup.string().required('Vui lòng không bỏ trống thông tin!'),
  description: Yup.string().required('Vui lòng không bỏ trống thông tin!'),
  short_description: Yup.string().required('Vui lòng không bỏ trống thông tin!'),
  country: Yup.string().required('Vui lòng không bỏ trống thông tin!'),
  rate: Yup.string().required('Vui lòng không bỏ trống thông tin!'),
  category: Yup.string().required('Vui lòng không bỏ trống thông tin!'),
  // image_links: Yup.string().required('Vui lòng không bỏ trống thông tin!'),
});