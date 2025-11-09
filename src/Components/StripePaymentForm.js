import { memo, useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'react-credit-cards';

import 'react-credit-cards/es/styles-compiled.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  validateName,
} from 'utils';
import { confirmOrder } from './Redux/reducers/dashboard.slice';
import { getMyProfileDetail } from './Redux/reducers/myAccount.slice';

const StripePaymentForm = ({ placeOrderDetail }) => {
  const { userData } = useSelector(({ auth }) => auth);

  const [data, setData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
  });

  const dispatch = useDispatch();

  const formRef = useRef(null); // useRef to handle form reset

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setData({ ...data, issuer: issuer });
    }
  };

  const handleInputFocus = e => {
    setData({ ...data, focused: e.target.name });
  };

  const handleInputChange = e => {
    let { name, value } = e.target;

    if (name === 'number') {
      value = formatCreditCardNumber(value);
    } else if (name === 'expiry') {
      value = formatExpirationDate(value, data.expiry);
    } else if (name === 'cvc') {
      value = formatCVC(value, data);
    } else if (name === 'name') {
      value = validateName(value.trimStart());
    }
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (
      userData?.UserID &&
      data.name &&
      data.number &&
      data.cvc &&
      data.expiry
    ) {
      if (Object.keys(placeOrderDetail)?.length > 0) {
        const { payload } = await dispatch(
          getMyProfileDetail({ UserID: userData?.UserID }),
        );
        let customerEmail = payload?.data?.Login_Name
          ? payload.data.Login_Name
          : '';

        let [month, year] = data.expiry.split('/');
        const obj = {
          ...placeOrderDetail,
          Payment_Status: '',
          Payment_Method: '',
          Payment_Trn_ID: '',
          UploadInvoice: {
            ContentLength: 0,
            ContentType: '',
            FileName: '',
            InputStream: {
              __identity: {},
            },
          },
          PayemtGateway: {
            Stripe_ApiKey: '',
            CustEmail: customerEmail,
            Description: '',
            Payment_Trn_Id: '',
            Payment_Amt: placeOrderDetail.FinalAmt,
            PaymentType: 'Online',
            PaymentSubType: 'Stripe',
            PaymentCurrency: 'USD',
            CardName: data.name || '',
            CardNo: data.number || '',
            CardCode: data.cvc || '',
            CardExpirationYear: year || 0,
            CardExpirationMonth: month || 0,
            CardExpirationDate: '',
          },
          CardName: data.name,
          CardNo: data.number,
          CardCode: data.cvc,
        };
        dispatch(confirmOrder(obj));
      }
    }
  };

  return (
    <div>
      <div className="app-payment">
        <Card
          className="payment_img"
          number={data.number}
          name={data.name}
          expiry={data.expiry}
          cvc={data.cvc}
          focused={data.focused}
          callback={handleCallback}
        />
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="payment_method_form"
        >
          <Row>
            <Col xs={12} className="form-group">
              <small>Name On Card</small>

              <input
                type="text"
                name="name"
                value={data.name}
                className="form-control"
                placeholder="Name"
                pattern="[a-z A-Z-]+"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Col>
            <Col xs={12} className="form-group">
              <small>Card Number</small>

              <input
                type="tel"
                name="number"
                value={data.number}
                className="form-control"
                placeholder="1234 1234 1234 1234"
                pattern="[\d| ]{16,22}"
                maxLength="19"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Col>

            <Col lg={6} className="form-group">
              <small>Expiration Date</small>

              <input
                type="tel"
                name="expiry"
                value={data.expiry}
                className="form-control"
                placeholder="MM / YY"
                pattern="\d\d/\d\d"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Col>
            <Col lg={6} className="form-group">
              <small>CVC</small>

              <input
                type="tel"
                name="cvc"
                value={data.cvc}
                className="form-control"
                placeholder="CVC"
                pattern="\d{3}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Col>
            <input type="hidden" name="issuer" value={data.issuer} />
            <div className="d-flex justify-content-center submit_btn">
              <Button
                type="submit"
                variant="primary"
                className="btn_shadow w-100"
              >
                Submit
              </Button>
            </div>
          </Row>
        </form>
      </div>
    </div>
  );
};
export default memo(StripePaymentForm);
