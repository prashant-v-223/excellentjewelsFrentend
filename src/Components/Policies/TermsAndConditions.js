import React, { memo, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PolicySidebar from './PolicySidebar';

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <section className="education_diamond_wrap policies_wrapper pt80 pt40-md pb100 pb0-md pb80-lg">
        <Container>
          <h3 className="mb30 mb15-lg ff_Title text-capitalize">
            Terms <span className="text_colorC">& Condition</span>
          </h3>
          <Row>
            <Col xxl={2} md={3}>
              <PolicySidebar />
            </Col>
            <Col xxl={10} md={9}>
              <div className="diamond_detial_box">
                <ul>
                  <li>
                    By accessing this website, we assume you accept these terms
                    and conditions. Do not continue to use [Your Company Name]
                    if you do not agree to take all of the terms and conditions
                    stated on this page.
                  </li>
                  <li>
                    Users are responsible for maintaining the confidentiality of
                    their account and password. You must provide accurate and
                    complete information during the account creation process.
                  </li>
                  <li>
                    All content, trademarks, logos, and images on this website
                    are the property of [Your Company Name] and are protected by
                    applicable copyright and trademark law.
                  </li>
                  <li>
                    Users are prohibited from engaging in any unlawful
                    activities on this website, including but not limited to
                    hacking, fraud, and unauthorized use of content.
                  </li>
                  <li>
                    We reserve the right to refuse or cancel any order for any
                    reason, including but not limited to product availability,
                    errors in pricing, or suspicion of fraudulent activity.
                  </li>
                  <li>
                    We may terminate user accounts for violations of these terms
                    and conditions, without prior notice.
                  </li>
                  <h5 className="mt20 mb20 ff_Mulish">
                    Availability Of Goods and Pricing Policy
                  </h5>
                  <li>
                    Most of Diamonds and Jewelry items on our site are in Stock
                    and available
                  </li>
                  <li>
                    But still if your ordered or selected stone/Jewellery is not
                    in Stock at the time you placed an order, we will check for
                    alternative stones with same specifications and if its
                    jewellery We will be making it within a span of 12-15
                    Business days Depend on Jewellery Design
                  </li>
                  <li>
                    We make sure that we make all data accurate on our website,
                    but Rarely, data may be inaccurately displayed on our site
                    due to any technical or human error.
                  </li>
                  <li>
                    While we make every attempt to avoid such errors they may
                    occur.{' '}
                  </li>
                  <li>
                    We reserve the right to correct any and all errors when they
                    do occur which may result in the closing of the item for
                    sale.{' '}
                  </li>
                  <li>We will not consider inaccurate or erroneous prices.</li>
                  <li>
                    In the event of a major error, we reserve the right to
                    withdraw an item for sale or order cancellation, in that
                    case you paid for item which is with high price error, we
                    will cancel the order and refund you incase we will be not
                    able to manage any alternative option with same price range
                  </li>
                  <li>Our prices are also subject to change without notice.</li>
                  <li>
                    We apologize for any inconvenience that this may cause.
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
export default memo(TermsAndConditions);
