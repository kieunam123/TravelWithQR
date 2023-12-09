import * as Yup from 'yup';

export const LocationValidatesEn = Yup.object().shape({
  name: Yup.string().required('Please do not leave this form empty!'),
  description: Yup.string().required('Please do not leave this form empty!'),
  short_description: Yup.string().required('Please do not leave this form empty!'),
  country: Yup.string().required('Please do not leave this form empty!'),
  rate: Yup.string().required('Please do not leave this form empty!'),
  category: Yup.string().required('Please do not leave this form empty!'),
  // image_links: Yup.string().required('Please do not leave this form empty!'),
});