import * as yup from 'yup';

export const appointmentValidationSchema = yup.object().shape({
  appointment_time: yup.date().required(),
  status: yup.string().required(),
  customer_id: yup.string().nullable().required(),
  employee_id: yup.string().nullable().required(),
  service_id: yup.string().nullable().required(),
});
