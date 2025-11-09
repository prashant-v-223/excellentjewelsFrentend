import React, { memo, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import GoBackToEducation from './GoBackToEducation';

const LabGrownDiamondsCreated = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <section className="education_diamond_wrap pt40-lg pt50 pb80 pb30-md pb80-lg">
        <Container>
          <GoBackToEducation />
          <div className="diamond_detial_box">
            <h4 className="text_colorC ff_Mulish">
              How are lab-grown diamonds created?
            </h4>
            <ul>
              <li>
                Certainly! Let’s delve into the fascinating process of creating
                lab-grown diamonds.
              </li>
              <li>
                These remarkable Lab Grown Diamonds are produced in controlled
                laboratory environments, using advanced technological methods
                that replicate and mimicking the same natural conditions under
                the earth which natural diamonds form deep within the Earth.
              </li>
              <li>
                Here are the two primary methods used:
                <ul>
                  <li>High Pressure High Temperature (HPHT)</li>
                  <li>Chemical Vapor Deposition (CVD)</li>
                </ul>
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
};
export default memo(LabGrownDiamondsCreated);
