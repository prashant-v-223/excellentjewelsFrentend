import React, { memo, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PolicySidebar from './PolicySidebar';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <section className="education_diamond_wrap policies_wrapper pt80 pt40-md pb100 pb0-md pb80-lg">
        <Container>
          <h3 className="mb30 mb15-lg ff_Title text-capitalize">
            Privacy <span className="text_colorC">Policy</span>
          </h3>
          <Row>
            <Col xxl={2} md={3}>
              <PolicySidebar />
            </Col>
            <Col xxl={10} md={9}>
              <div className="diamond_detial_box">
                <ul>
                  <li>We Believe That Your Privacy is most important to us.</li>
                  <li>
                    We collect personal information, such as name, email
                    address, and shipping address, for order processing and
                    customer communication purposes.
                  </li>
                  <li>
                    We implement security measures to protect your personal
                    information. However, we cannot guarantee the security of
                    data transmitted over the internet.
                  </li>
                  <li>
                    Our website uses cookies and tracking technologies to
                    enhance user experience and analyze website traffic. By
                    using our site, you consent to the use of cookies.
                  </li>
                  <li>
                    We do not sell, trade, or otherwise transfer your personal
                    information to third parties without your consent, except as
                    required by law.
                  </li>
                  <li>
                    Guarantee your experience with Excellent Corporation Will be
                    Excellent Our commitment to you is to honor and protect the
                    privacy of the personal information you submit to us.
                  </li>
                  <li>
                    This Privacy Policy is integrated into our Terms of Service.
                  </li>
                  <li>
                    We do not exchange your personal information to third
                    parties So Never Worry About It !
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
export default memo(PrivacyPolicy);
