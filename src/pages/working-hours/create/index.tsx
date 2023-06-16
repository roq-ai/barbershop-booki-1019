import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createWorkingHour } from 'apiSdk/working-hours';
import { Error } from 'components/error';
import { workingHourValidationSchema } from 'validationSchema/working-hours';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getRestaurants } from 'apiSdk/restaurants';
import { WorkingHourInterface } from 'interfaces/working-hour';

function WorkingHourCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: WorkingHourInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createWorkingHour(values);
      resetForm();
      router.push('/working-hours');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<WorkingHourInterface>({
    initialValues: {
      day_of_week: 0,
      start_time: new Date(new Date().toDateString()),
      end_time: new Date(new Date().toDateString()),
      restaurant_id: (router.query.restaurant_id as string) ?? null,
    },
    validationSchema: workingHourValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Working Hour
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="day_of_week" mb="4" isInvalid={!!formik.errors?.day_of_week}>
            <FormLabel>Day Of Week</FormLabel>
            <NumberInput
              name="day_of_week"
              value={formik.values?.day_of_week}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('day_of_week', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.day_of_week && <FormErrorMessage>{formik.errors?.day_of_week}</FormErrorMessage>}
          </FormControl>
          <FormControl id="start_time" mb="4">
            <FormLabel>Start Time</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.start_time ? new Date(formik.values?.start_time) : null}
                onChange={(value: Date) => formik.setFieldValue('start_time', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="end_time" mb="4">
            <FormLabel>End Time</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.end_time ? new Date(formik.values?.end_time) : null}
                onChange={(value: Date) => formik.setFieldValue('end_time', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <AsyncSelect<RestaurantInterface>
            formik={formik}
            name={'restaurant_id'}
            label={'Select Restaurant'}
            placeholder={'Select Restaurant'}
            fetcher={getRestaurants}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'working_hour',
  operation: AccessOperationEnum.CREATE,
})(WorkingHourCreatePage);
