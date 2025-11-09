import React, { memo, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import GoBackToEducation from './GoBackToEducation';

const LabGrownDiamonds = () => {
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
              What Are Lab-Grown Diamonds?
            </h4>
            <ul>
              <li>
                Diamonds have long been admired for their timeless beauty and
                rarity.
              </li>
              <li>
                However, a new chapter in the world of diamonds has emerged with
                the advent of lab-grown diamonds, providing consumers with a
                sustainable and ethical alternative to traditional mined
                diamonds in attractive price.
              </li>
              <li>
                Lab-grown diamonds, also known man made diamonds, cultured
                diamonds, created diamonds.
              </li>
              <li>
                lab grown diamonds are created in controlled laboratory
                environments with ecofriendly method rather than being mined
                from the Earth.
              </li>
              <li>
                These diamonds share the same chemical composition and crystal
                structure as natural diamonds.
              </li>
              <li>
                Difference between natural diamond and Lab Grown Diamonds are
                virtually indistinguishable to the naked eye.
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
};
export default memo(LabGrownDiamonds);
