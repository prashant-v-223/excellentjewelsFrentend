import React, { memo, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import GoBackToEducation from './GoBackToEducation';

const ChemicalVaporDeposition = () => {
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
              All About Chemical Vapor Deposition (CVD) LGDs.
            </h4>
            <p className="ff_Mulish">
              {' '}
              Certainly! Lets get in to the method of producing lab grown
              diamond through Chemical Vapor Deposition (CVD) method:
            </p>
            <h6 className="ff_Mulish">Carbon Source</h6>
            <ul>
              <li>
                Begin with a carbon source, often methane gas, in the CVD
                process.
              </li>
            </ul>
            <h6 className="ff_Mulish">Reaction Chamber</h6>
            <ul>
              <li>Introduce the carbon source into a controlled chamber.</li>
            </ul>
            <h6 className="ff_Mulish">High-Temperature Environment</h6>
            <ul>
              <li>
                Heat the chamber to around 800°C (1,472°F), breaking down the
                gas into carbon atoms.
              </li>
            </ul>
            <h6 className="ff_Mulish">Carbon Deposition</h6>
            <ul>
              <li>
                Carbon atoms crystallize and deposit onto a substrate, typically
                a thin slice of diamond or other suitable material.
              </li>
            </ul>
            <h6 className="ff_Mulish">Layer Formation</h6>
            <ul>
              <li>
                Layers of carbon atoms build up on the substrate, gradually
                forming a diamond.
              </li>
            </ul>
            <h6 className="ff_Mulish">Cooling Process</h6>
            <ul>
              <li>
                Allow the diamond to cool, stabilizing the crystal structure.
              </li>
            </ul>
            <h6 className="ff_Mulish">Extraction and Cutting</h6>
            <ul>
              <li>
                Extract the diamond from the substrate and perform cutting and
                shaping as needed for the final gemstone.
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
};
export default memo(ChemicalVaporDeposition);
