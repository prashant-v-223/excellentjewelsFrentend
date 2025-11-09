import React, { memo, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PolicySidebar from './PolicySidebar';

const ShippingPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <section className="education_diamond_wrap policies_wrapper pt80 pt40-md pb100 pb0-md pb80-lg">
        <Container>
          <h3 className="mb30 mb15-lg ff_Title text-capitalize">
            Shipping <span className="text_colorC"> Policy</span>
          </h3>
          <Row>
            <Col xxl={2} md={3}>
              <PolicySidebar />
            </Col>
            <Col xxl={10} md={9}>
              <div className="diamond_detial_box">
                <ul>
                  <li>
                    We ship worldwide & we make sure that you get your shipment
                    as earliest as possible provided there is no delay in
                    customs clearance, public holiday, courier location, or
                    circumstance which is beyond human control.
                  </li>
                  <li>
                    We ship through one of the reputed &standard shipping agency
                    for national & international shipment. Once ordered product
                    is been dispatch we update tracking number in buyer purchase
                    item. Delivery depends upon location.
                  </li>
                  <li>
                    We don't charge any sales tax/import Duties/Taxes etc on any
                    sales made internationally. Buyer will be responsible for
                    all import duties/Taxes According to the destination
                    country.
                  </li>
                  <li>
                    Shipping fees are not refundable under any circumstances.
                  </li>
                  <li>
                    we use Logistics Like FedEx,UPS, MALKA AMIT JK, Depend on
                    Destination country and Goods Value.
                  </li>
                  <li>
                    Import duties, taxes and charges are not included in the
                    item price or the shipping charges. These charges are the
                    buyer's responsibility.
                  </li>
                  <li>
                    Because of any reason goods stuck in the custom at
                    destination country, in that case it is buyers
                    responsibility to make it release with any necessary
                    documents and information which is required through the
                    customs
                  </li>
                  <li>
                    By Placing an order, we consider you have enough knowledge
                    about importing goods internationally and you have all the
                    necessary documents and information which required to clear
                    the goods from customs.
                  </li>
                  <li>
                    Indian merchants are unable to mark merchandise values below
                    actual purchase price or mark international parcels as
                    "gifts" Indian and international government regulations
                    prohibit such practices
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
export default memo(ShippingPolicy);
