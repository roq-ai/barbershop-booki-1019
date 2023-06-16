import * as yup from 'yup';

export const serviceValidationSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().integer().required(),
  restaurant_id: yup.string().nullable().required(),
});
