import * as Yup from 'yup';

export const UserValidatesEn = Yup.object().shape({
  name: Yup.string().required('Please do not leave the form empty!'),
  mobile: Yup.string().required('Please do not leave the form empty!'),
  address: Yup.string().required('Please do not leave the form empty!'),
  username: Yup.string().required('Please do not leave the form empty!'),
  // image_links: Yup.string().required('Please do not leave the form empty!'),
});