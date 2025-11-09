import React, { memo, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import GoBackToEducation from './GoBackToEducation';

const CVDvsHPHT = () => {
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
              CVD Diamond V/S HPHT Diamond
            </h4>
            <p className="ff_Mulish">
              while both CVD and HPHT methods result in high-quality lab-grown
              diamonds, understanding their unique processes and characteristics
              can help consumers make informed choices based on their
              preferences and values.
            </p>
            <p className="ff_Mulish">
              Whether it's the controlled precision of CVD or the
              Earth-mimicking conditions of HPHT, the world of lab-grown
              diamonds offers a dazzling array of sustainable and ethical
              options for the modern consumer.
            </p>
            <h6 className="ff_Mulish text_colorC">
              CVD also known as TYPE2A Diamonds where HPHT known as TYPE2
            </h6>
            <h6 className="ff_Mulish">Formation Method</h6>
            <ul>
              <li>
                CVD (Chemical Vapor Deposition): Carbon vapor is deposited onto
                a substrate to form diamonds.
              </li>
              <li>
                HPHT (High Pressure High Temperature): Mimics natural
                conditions, subjecting carbon to high pressure and high
                temperature to crystallize into diamonds.
              </li>
            </ul>
            <h6 className="ff_Mulish">Process Complexity</h6>
            <ul>
              <li>
                CVD: Allows for precise control over diamond characteristics,
                including size and purity.
              </li>
              <li>
                HPHT: Mimics natural diamond formation, potentially leading to
                larger crystals but with less control over specific traits.
              </li>
            </ul>
            <h6 className="ff_Mulish">Time Frame</h6>
            <ul>
              <li>CVD: Typically faster growth process.</li>
              <li>HPHT: May require longer processing times.</li>
            </ul>
            <h6 className="ff_Mulish">Energy Consumption</h6>
            <ul>
              <li>CVD: Generally considered more energy-efficient.</li>
              <li>
                HPHT: May require higher energy inputs due to the extreme
                conditions involved.
              </li>
            </ul>
            <h6 className="ff_Mulish">Appearance</h6>
            <ul>
              <li>
                CVD and HPHT: Both result in diamonds with nearly identical
                physical, chemical, and optical properties.
              </li>
            </ul>
            <h6 className="ff_Mulish">Cost</h6>
            <ul>
              <li>
                CVD: Costs may vary based on the specific conditions and
                equipment used.{' '}
              </li>
              <li>
                HPHT: Can be cost-effective due to better control over the
                growth process.
              </li>
            </ul>
            <p className="ff_Mulish">
              Major Difference is about Hardness, CVD has{' '}
              <b>
                10 on the Mohs scale of hardness, Where HPHT is close to 10 on
                the Mohs scale of hardness but Not 10,
              </b>{' '}
              So they react differently on Basic Diamond tester Pen(E.g.
              Presidium) ,
            </p>
            <p className="ff_Mulish">
              CVD will show as diamond on diamond tester but HPHT will not show
              as diamond on diamond tester
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
};
export default memo(CVDvsHPHT);
