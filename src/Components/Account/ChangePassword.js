import { ErrorMessage, Formik } from 'formik';
import { memo, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { changePassword } from '../Redux/reducers/myAccount.slice';
import AccountSidebar from './AccountSidebar';

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const submitRef = useRef(null);
  const dispatch = useDispatch();
  const { userData } = useSelector(({ auth }) => auth);
  const initialValues = {
    Cust_ID: userData?.UserID,
    WebStore_ID: userData?.WebStore_ID,
    Login_Pass: '',
    Login_Pass_New: '',
    Login_Pass_Confirm: '',
  };
  const SubmitSchma = Yup.object().shape({
    Login_Pass: Yup.string().required('Required'),
    Login_Pass_New: Yup.string()
      .required('Required')
      .min(5, 'Your password is too short.')
      .matches(/^[a-zA-Z0-9@#!$*^&]/, 'Password can length must ne 9.'),
    Login_Pass_Confirm: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('Login_Pass_New')], 'Passwords must match'),
  });
  return (
    <main>
      <section className="my_account_wrapper pb100 pb50-md pb80-lg">
        <div className="px-3">
          <Row>
            <Col xxl={2} lg={3}>
              <AccountSidebar />
            </Col>
            <Col xxl={10} lg={9}>
              <Formik
                initialValues={initialValues}
                innerRef={submitRef}
                validationSchema={SubmitSchma}
                onSubmit={async (values, { resetForm }) => {
                  dispatch(changePassword(values));
                  submitRef && submitRef.current.resetForm();
                }}
              >
                {({ handleSubmit, handleChange, values }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="change_passward_wrap mb10">
                      <h6 className="mb30 mb15-xs ff_Mulish">
                        Change Passward
                      </h6>
                      <Row>
                        <Col sm={6}>
                          <Form.Group
                            className="custom_form_group mb25 mb15-sm"
                            id="password"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Old Passward</Form.Label>
                            <Form.Control
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Password"
                              name="Login_Pass"
                              value={values.Login_Pass}
                              onChange={e => {
                                handleChange(e.target.name)(e.target.value);
                              }}
                            />
                            <span
                              className="eye_icon"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <i
                                className={
                                  showPassword
                                    ? 'fa-solid fa-eye-slash'
                                    : 'fa-solid fa-eye'
                                }
                              ></i>
                            </span>
                            <span className="text-error">
                              <ErrorMessage name="Login_Pass" />
                            </span>
                          </Form.Group>
                          <Form.Group
                            className="custom_form_group mb25 mb15-sm"
                            id="password"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Password"
                              name="Login_Pass_New"
                              value={values.Login_Pass_New}
                              onChange={e => {
                                handleChange(e.target.name)(e.target.value);
                              }}
                            />
                            <span
                              className="eye_icon"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <i
                                className={
                                  showPassword
                                    ? 'fa-solid fa-eye-slash'
                                    : 'fa-solid fa-eye'
                                }
                              ></i>
                            </span>
                            <span className="text-error">
                              <ErrorMessage name="Login_Pass_New" />
                            </span>
                          </Form.Group>
                          <Form.Group
                            className="mb25 mb15-sm custom_form_group"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type={confirmPassword ? 'text' : 'password'}
                              placeholder="Confirm Password"
                              name="Login_Pass_Confirm"
                              value={values.Login_Pass_Confirm}
                              onChange={e => {
                                handleChange(e.target.name)(e.target.value);
                              }}
                            />
                            <span
                              className="eye_icon"
                              onClick={() =>
                                setConfirmPassword(!confirmPassword)
                              }
                            >
                              <i
                                className={
                                  confirmPassword
                                    ? 'fa-solid fa-eye-slash'
                                    : 'fa-solid fa-eye'
                                }
                              ></i>
                            </span>
                          </Form.Group>
                          <span className="text-error">
                            <ErrorMessage name="Login_Pass_Confirm" />
                          </span>
                        </Col>
                      </Row>
                    </div>
                    <div className="text-center">
                      <Button
                        variant="primary"
                        className="rounded btn_shadow"
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </div>
      </section>
    </main>
  );
};
export default memo(ChangePassword);
