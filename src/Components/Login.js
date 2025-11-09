import React, { memo, useEffect, useRef, useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// import LoginImg from '../Assets/Images/signup-bg.png';
import LoginImg from '../Assets/Images/login.png';
import {
  forgetPassword,
  login,
  setIsForget,
} from './Redux/reducers/auth.slice';
import { Domain } from 'Helper/CommonHelper';
import {
  setIsAddToCartList,
  setIsAddToCompareList,
  setIsAddToWatchList,
} from './Redux/reducers/myAccount.slice';
import { setIsAddToCartJewellery } from './Redux/reducers/jewellery.slice';
import { OptimizedImage } from 'utils/performanceUtils';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginFormRef = useRef(null);
  const forgetEmailFormRef = useRef(null);
  const { isLogin, isForget } = useSelector(({ auth }) => auth);
  const [isForgetPassShow, setIsForgetPassShow] = useState(false);
  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required!'),
    password: Yup.string().required('Password is Required!'),
  });
  const forgetSchema = Yup.object().shape({
    forgetEmail: Yup.string()
      .email('Invalid email')
      .required('Email is Required!'),
  });
  const initialValuesForLogin = {
    email: '',
    password: '',
  };
  const initialValuesForForget = {
    forgetEmail: '',
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isForget) {
      setIsForgetPassShow(false);
      forgetEmailFormRef?.current?.resetForm();
      dispatch(setIsForget(false));
    }
  }, [dispatch, isForget]);

  useEffect(() => {
    if (isLogin) {
      loginFormRef && loginFormRef.current.resetForm();
      dispatch(setIsAddToWatchList(false));
      dispatch(setIsAddToCartList(false));
      dispatch(setIsAddToCompareList(false));
      dispatch(setIsAddToCartJewellery(false));
      navigate('/');
    }
  }, [isLogin, dispatch, navigate]);

  return (
    <main>
      <section className="pt30 login_wrapper pb100 pt40-xl pb50-md">
        <Container>
          <h2 className="text-center mb20 d-xl-none d-block">Login</h2>
          <Row className="align-items-center">
            <Col xl={7} className="d-none d-xl-block">
              <div className="login_img_wrap mb30-xl">
                <img src={LoginImg} alt="LoginImg" />
              </div>
            </Col>
            <Col xl={4}>
              {!isForgetPassShow ? (
                <div className="login_form_wrapper">
                  <Formik
                    initialValues={initialValuesForLogin}
                    innerRef={loginFormRef}
                    validationSchema={loginSchema}
                    onSubmit={values => {
                      dispatch(login(values));
                      navigate.replace();
                    }}
                  >
                    {({ handleChange, handleSubmit, values }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group
                          className="mb25 "
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Control
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={e => {
                              handleChange('email')(e.target.value);
                            }}
                            placeholder="Enter Your Email"
                          />
                          <span className="text-error ">
                            <ErrorMessage name="email" />
                          </span>
                        </Form.Group>
                        <Form.Group
                          className="mb25 "
                          controlId="exampleForm.ControlInput2"
                        >
                          <Form.Control
                            type="password"
                            name="Password"
                            value={values.password}
                            onChange={e => {
                              handleChange('password')(e.target.value);
                            }}
                            placeholder="Enter Your Password"
                          />
                          <span className="text-error ">
                            <ErrorMessage name="password" />
                          </span>
                        </Form.Group>
                        <div className="text-end mb40">
                          <span
                            className="text_hover "
                            onClick={() => {
                              setIsForgetPassShow(true);
                              loginFormRef?.current?.resetForm();
                            }}
                          >
                            Forgot Password?
                          </span>
                        </div>
                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100 btn_shadow mb35"
                        >
                          Login
                        </Button>
                      </Form>
                    )}
                  </Formik>
                  <div className="text-center ">
                    <p>
                      Dont’t have an account?{' '}
                      <Link to="/sign-up" className="text_colorC fw-bold">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="login_form_wrapper">
                  <Formik
                    initialValues={initialValuesForForget}
                    innerRef={forgetEmailFormRef}
                    validationSchema={forgetSchema}
                    onSubmit={values => {
                      dispatch(
                        forgetPassword({
                          EmailID: values.forgetEmail,
                          DomainName: Domain,
                        }),
                      );
                    }}
                  >
                    {({ handleChange, handleSubmit, values }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group
                          className="mb25"
                          controlId="exampleForm.ControlInput3"
                        >
                          <Form.Control
                            type="email"
                            name="forgetEmail"
                            value={values.forgetEmail}
                            onChange={e => {
                              handleChange('forgetEmail')(e.target.value);
                            }}
                            placeholder="Enter Your Email"
                          />
                          <span className="text-error">
                            <ErrorMessage name="forgetEmail" />
                          </span>
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100 btn_shadow mb35"
                        >
                          Reset Password
                        </Button>
                      </Form>
                    )}
                  </Formik>
                  <div className="text-center">
                    <p>
                      Remember Password?{' '}
                      <span
                        className="text_hover"
                        onClick={() => {
                          setIsForgetPassShow(false);
                          forgetEmailFormRef?.current?.resetForm();
                        }}
                      >
                        Login
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
export default memo(Login);
