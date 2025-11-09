import React, { memo, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import GoBackToEducation from './GoBackToEducation';

const HighPressureHighTemperature = () => {
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
              All About High Pressure High Temperature (HPHT) LGDs.
            </h4>
            <p className="ff_Mulish">
              Certainly! Let’s explore the fascinating process of creating
              lab-grown diamonds using the High Pressure High Temperature (HPHT)
              method.
            </p>
            <h6 className="ff_Mulish">Seed Diamond or Carbon Source</h6>
            <ul>
              <li>
                Begin with a small natural diamond (seed diamond) or carbon
                source like graphite.
              </li>
            </ul>
            <h6 className="ff_Mulish">High-Pressure Chamber</h6>
            <ul>
              <li>
                Place the seed diamond or carbon source in a high-pressure
                chamber.
              </li>
            </ul>
            <h6 className="ff_Mulish">Application of High Pressure</h6>
            <ul>
              <li>
                Seal the chamber and apply pressures up to 725,000 psi,
                simulating Earth's mantle conditions.
              </li>
            </ul>
            <h6 className="ff_Mulish">High-Temperature Environment</h6>
            <ul>
              <li>
                Expose the chamber to temperatures around 2,200°C (3,992°F) to
                rearrange carbon atoms.
              </li>
            </ul>
            <h6 className="ff_Mulish">Carbon Transformation</h6>
            <ul>
              <li>
                High pressure and temperature cause carbon atoms to form a
                crystal lattice, akin to natural diamonds.
              </li>
            </ul>
            <h6 className="ff_Mulish">Diamond Growth</h6>
            <ul>
              <li>
                Monitor as carbon atoms arrange and bond, allowing the diamond
                crystal to grow.
              </li>
            </ul>
            <h6 className="ff_Mulish">Cooling Process</h6>
            <ul>
              <li>
                Gradually release pressure, letting the diamond cool for
                stabilization.
              </li>
            </ul>
            <h6 className="ff_Mulish">Extraction and Cutting</h6>
            <ul>
              <li>
                Extract the diamond, and perform cutting and shaping for the
                desired gemstone.
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
};
export default memo(HighPressureHighTemperature);
