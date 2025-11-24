'use client';
import ShapeBlock from '@/components/auth/shape-block';
import Form from '@/components/forms/form';
import FormCheckBox from '@/components/forms/form-checkbox';
import FormInput from '@/components/forms/form-input';
import Button, { SocialButton } from '@/components/ui/button';
import { RegisterFormData } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

const Register: FC = () => {
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const validateForm = ({
    repeatPassword,
    password,
    agreeToTerms,
  }: {
    repeatPassword: string;
    password: string;
    agreeToTerms: boolean;
  }): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    if (password !== repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      newErrors.agreeToTerms = false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    if (
      validateForm({
        repeatPassword: data.repeatPassword,
        password: data.password,
        agreeToTerms: data.agreeToTerms,
      })
    ) {
      console.log('Registration submitted:', data);
    }
  };

  // const handleGoogleRegister = () => {
  //   console.log('Google registration clicked');
  // };

  return (
    <section className='_social_registration_wrapper _layout_main_wrapper'>
      <ShapeBlock />
      <div className='_social_registration_wrap'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
              <div className='_social_registration_right'>
                <div className='_social_registration_right_image'>
                  <Image
                    src='/images/registration.png'
                    alt='Registration illustration'
                    width={500}
                    height={500}
                  />
                </div>
                <div className='_social_registration_right_image_dark'>
                  <Image
                    src='/images/registration1.png'
                    alt='Registration dark illustration'
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
              <div className='_social_registration_content'>
                <div className='_social_registration_right_logo _mar_b28'>
                  <Image
                    src='/images/logo.svg'
                    alt='Company logo'
                    className='_right_logo'
                    width={158}
                    height={33}
                  />
                </div>
                <p className='_social_registration_content_para _mar_b8'>Get Started Now</p>
                <h4 className='_social_registration_content_title _titl4 _mar_b50'>Registration</h4>

                <SocialButton provider='google' className='_mar_b40'>
                  Register with google
                </SocialButton>
                <div className='_social_registration_content_bottom_txt _mar_b40'>
                  <span>Or</span>
                </div>
                <Form submitHandler={onSubmit}>
                  <div className='_social_registration_form'>
                    <div className='row'>
                      <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                        <FormInput
                          name='firstName'
                          label='First Name'
                          type='text'
                          id='firstName'
                          className='_social_login_input'
                          required
                        />
                        <FormInput
                          name='lastName'
                          label='Last Name'
                          type='text'
                          id='lastName'
                          className='_social_login_input'
                          required
                        />

                        <FormInput
                          name='email'
                          label='Email'
                          type='email'
                          id='email'
                          className='_social_login_input'
                          required
                        />

                        <FormInput
                          name='password'
                          label='Password'
                          type='password'
                          id='password'
                          className='_social_login_input'
                          required
                        />
                        <FormInput
                          name='repeatPassword'
                          label='Repeat Password'
                          type='password'
                          id='password'
                          className='_social_login_input'
                          error={errors.repeatPassword}
                          required
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-12 col-xl-12 col-md-12 col-sm-12'>
                        <FormCheckBox
                          name='agreeToTerms'
                          label=' I agree to terms & conditions'
                          id='agreeToTerms'
                          type='radio'
                          className='_social_login_form_check'
                          inputClassName='_social_login_form_check_input'
                          labelClassName='_social_registration_form_check_label'
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-12 col-md-12 col-xl-12 col-sm-12'>
                        <div className='_social_registration_form_btn _mar_t40 _mar_b60'>
                          <Button
                            type='submit'
                            variant='primary'
                            className='_btn1'
                            size='md'
                            fullWidth
                          >
                            Register now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
                <div className='row'>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                    <div className='_social_registration_bottom_txt'>
                      <p className='_social_registration_bottom_txt_para'>
                        Already have an account? <Link href='/login'>Sign In</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
