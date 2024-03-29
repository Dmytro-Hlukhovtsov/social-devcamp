/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import SaveIcon from '@mui/icons-material/Save';
import { useMutation } from 'react-query';
import LoadingButton from '@mui/lab/LoadingButton';
import ErrorBoundary from '../../../components/ErrorBoundary';
import EditProfileFormProps from '../../../services/PropTypes/EditProfileFormProps';
import MyAutocomplete from '../../../components/form-elements/MyAutocomplete';
import { editProfile } from '../../profiles/api/crud';
import settings from '../../../settings';
import AvailabilitySchema from '../../../services/Formik/AvailabilitySchema';

const phoneRegExp = /^[0-9\-\\+]{3,13}$/;

const EditProfileForm = ({
  profile, availabilities, university,
}) => {
  const mutation = useMutation(
    'edit-profile',
    (formData) => editProfile(profile.profileid, formData),
  );

  // variable for autocomplete
  const profileUniversities = [];
  profile.universities?.map((universityItem) => profileUniversities
    .push({
      value: universityItem.universityid,
      label: universityItem.name,
    }));

  // variable [initial values]
  const profileData = {
    name: profile.name,
    email: profile.email || '',
    phone: profile.phone || '',
    universities: profileUniversities,
    emailSettingId: {
      value: profile.emailsettingid,
      label: profile.emailsetting,
    },
    phoneSettingId: {
      value: profile.phonesettingid,
      label: profile.phonesetting,
    },
    universitySettingId: {
      value: profile.universitysettingid,
      label: profile.universitysetting,
    },
  };

  // variable [formik schema]
  const schemaEditProfile = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short')
      .max(256, 'Too Long')
      .required('Profile name is required'),
    email: Yup.string()
      .max(255, 'Too Long')
      .email('Invalid email'),
    phone: Yup.string()
      .min(6, 'Too Short')
      .max(13, 'Too Long')
      .matches(phoneRegExp, 'Phone number is not valid'),
    universities: Yup.array()
      .of(
        AvailabilitySchema,
      ),
    emailSettingId: AvailabilitySchema.required('E-mail availability is required'),
    phoneSettingId: AvailabilitySchema.required('Phone availability is required'),
    universitySettingId: AvailabilitySchema.required('Universities availability is required'),
  });

  const onProfileEditFormSubmit = (dataSubmit, { setSubmitting }) => {
    mutation.mutate(dataSubmit);

    if (!mutation.isLoading) {
      setSubmitting(false);
    } else {
      setSubmitting(true);
    }
  };

  return (
    <ErrorBoundary>
      <Formik
        initialValues={profileData}
        onSubmit={onProfileEditFormSubmit}
        validationSchema={schemaEditProfile}
      >
        {({
          isSubmitting, dirty, isValid,
        }) => (
          <Form className="profile-page-right-colmn">
            <div className="profile-page-info edit block-shadow">
              <div className="profile-name edit">
                <Field
                  component={TextField}
                  type="text"
                  name="name"
                  label="Name"
                  placeholder="Name"
                  variant="standard"
                  fullWidth
                />
              </div>

              <div className="profile-information item info-item info-item-edit">
                <div className="value">
                  <Field
                    component={TextField}
                    type="text"
                    name="email"
                    label="E-mail"
                    placeholder="E-mail"
                    variant="standard"
                    fullWidth
                  />
                </div>

                <Field
                  component={MyAutocomplete}
                  name="emailSettingId"
                  label="Visible to"
                  options={availabilities}
                  sx={settings.profileAvailabilityStyles}
                />
              </div>

              <div className="item info-item info-item-edit">
                <div className="value">
                  <Field
                    component={TextField}
                    type="text"
                    name="phone"
                    label="Phone"
                    placeholder="Phone"
                    variant="standard"
                    fullWidth
                  />
                </div>

                <Field
                  component={MyAutocomplete}
                  name="phoneSettingId"
                  label="Visible to"
                  options={availabilities}
                  sx={settings.profileAvailabilityStyles}
                />
              </div>
              <ErrorBoundary>
                <div className="item info-item info-item-edit">
                  <div className="value">

                    <Field
                      component={MyAutocomplete}
                      variant="outlined"
                      name="universities"
                      label="Universities"
                      placeholder="You study at the..."
                      multiple
                      options={university}
                    />
                  </div>

                  <Field
                    component={MyAutocomplete}
                    className="university-autocomplete"
                    name="universitySettingId"
                    label="Visible to"
                    options={availabilities}
                    sx={settings.profileAvailabilityStyles}
                  />
                </div>
              </ErrorBoundary>

              <div>
                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  loadingIndicator="Loading..."
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={!(dirty && isValid && !isSubmitting)}
                >
                  Save
                </LoadingButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ErrorBoundary>
  );
};

EditProfileForm.propTypes = EditProfileFormProps;

EditProfileForm.defaultProps = {
  email: undefined,
  phone: undefined,
  university: [],
};

export default EditProfileForm;
