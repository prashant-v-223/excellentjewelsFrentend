import React, { memo, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PolicySidebar from './PolicySidebar';

const ReturnAndRefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <section className="education_diamond_wrap policies_wrapper pt80 pt40-md pb100 pb0-md pb80-lg">
        <Container>
          <h3 className="mb30 mb15-lg ff_Title text-capitalize">
            Return <span className="text_colorC"> & Refund Policy</span>
          </h3>
          <Row>
            <Col xxl={2} md={3}>
              <PolicySidebar />
            </Col>
            <Col xxl={10} md={9}>
              <div className="diamond_detial_box">
                <ul>
                  <li>
                    Your satisfaction is important to us. You can return your
                    item within 30 days along with original pack, if it does not
                    matches with our description or manufacturing defects. No
                    other returns are accepted.
                  </li>
                  <li>
                    To be eligible for a return, your item must be unused and in
                    the same condition that you received it. It must also be in
                    the original packaging.
                  </li>
                  <li>
                    Need to Return with Same Package, with all content properly
                  </li>
                  <li>
                    Certain items, such as personalized, Special/Customized or
                    engraved jewelry, are non-returnable
                  </li>
                  <li>
                    Insurance Fees/Shipping Charges/Import Duties and Taxes are
                    not refundable
                  </li>
                  <li>
                    Buyer must inform us within 2 Days after receiving a product
                    if there are any defects or problem.
                  </li>
                  <li>
                    Before returning a product make sure an item should not been
                    used, tamper or any alteration done on it. If so we won't
                    take the product back.
                  </li>
                  <li>
                    In case of return of the goods, buyer has to borne the
                    shipping charges.
                  </li>
                  <li>
                    PLEASE Communicate with us before filing any dispute &
                    returning the product.
                  </li>
                  <li>
                    After receiving the product, Our Experts will do inspection
                    the condition of product and if everything match with our
                    policies , within 4-7 working days Refund will be processed.
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
export default memo(ReturnAndRefundPolicy);
