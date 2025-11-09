import React, { memo, useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { contactDetail } from './Redux/reducers/auth.slice';

const ContactUs = () => {
  const submitRef = useRef(null);
  const dispatch = useDispatch();
  const initialValues = {
    Id: 0,
    Fname: '',
    Lname: '',
    Email: '',
    SubJect: '',
    Message: '',
    CreatedOn: Date.now().toString(),
    PhoneNo: '',
  };
  const SubmitSchma = Yup.object().shape({
    Email: Yup.string().email('Invalid email').required('Required'),
    Fname: Yup.string().required('Required'),
    Lname: Yup.string().required('Required'),
    SubJect: Yup.string().required('Required'),
    PhoneNo: Yup.string()
      .required('Required')
      .matches(/^[0-9]{10}$/, 'Mobile number must contain 10 digits'),
    Message: Yup.string().required('Required'),
  });
  return (
    <div className="contact_us_wrapper pt100 pb100 pb50-md pb80-lg">
      <Container>
        <div className="contact_map">
          <iframe
            title="Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.4170945937!2d72.73989525689291!3d21.159340298699995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1698667464289!5m2!1sen!2sin"
            width="600"
            height="450"
            // allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="contact_form_wrap">
          <Row className="justify-content-center">
            <Col md={10}>
              <div className="contact_form_inner_wrap">
                <h4 className="text_colorC mb25 mb15-xs">Get in touch</h4>
                <Formik
                  initialValues={initialValues}
                  innerRef={submitRef}
                  validationSchema={SubmitSchma}
                  onSubmit={async (values, { resetForm }) => {
                    dispatch(contactDetail(values));
                    submitRef && submitRef.current.resetForm();
                  }}
                >
                  {({ handleSubmit, handleChange, values }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group
                            className="form_group custom_form_group mb25 mb15-xs"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter First Name"
                              name="Fname"
                              value={values.Fname}
                              onChange={e => {
                                handleChange('Fname')(e.target.value);
                              }}
                            />
                            <span className="text-error">
                              <ErrorMessage name="Fname" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="form_group custom_form_group mb25 mb15-xs"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Last Name"
                              name="Lname"
                              value={values.Lname}
                              onChange={e => {
                                handleChange('Lname')(e.target.value);
                              }}
                            />
                            <span className="text-error">
                              <ErrorMessage name="Lname" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="form_group custom_form_group mb25 mb15-xs"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter Email"
                              name="Email"
                              value={values.Email}
                              onChange={e => {
                                handleChange('Email')(e.target.value);
                              }}
                            />
                            <span className="text-error">
                              <ErrorMessage name="Email" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="form_group custom_form_group mb25 mb15-xs"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                              type="number"
                              onWheel={e => e.target.blur()}
                              placeholder="Enter Contact"
                              name="PhoneNo"
                              value={values.PhoneNo}
                              onChange={e => {
                                handleChange('PhoneNo')(e.target.value);
                              }}
                            />
                            <span className="text-error">
                              <ErrorMessage name="PhoneNo" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group
                            className="form_group custom_form_group mb25 mb15-xs"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Subject"
                              name="SubJect"
                              value={values.SubJect}
                              onChange={e => {
                                handleChange('SubJect')(e.target.value);
                              }}
                            />
                            <span className="text-error">
                              <ErrorMessage name="SubJect" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group
                            className="form_group custom_form_group mb25 mb15-xs"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Enter Here..."
                              name="Message"
                              value={values.Message}
                              onChange={e => {
                                handleChange('Message')(e.target.value);
                              }}
                            />
                            <span className="text-error">
                              <ErrorMessage name="Message" />
                            </span>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button
                        type="submit"
                        variant="primary"
                        className="rounded btn_shadow w-100"
                      >
                        Send message
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
export default memo(ContactUs);
