import React, { memo, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DiamondImgSlider from '../Diamond/DiamondImgSlider';
import DiamondInfo from '../Diamond/DiamondInfo';
import { getUrlParam } from 'Helper/CommonHelper';
import { useSelector } from 'react-redux';

const ChooseDiamondDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stoneNo = getUrlParam(window.location.search, 'stoneNo');
  const diamondType = getUrlParam(window.location.search, 'diamondType');
  const { stockDetailDnaList, stockDetailDnaLoading } = useSelector(
    ({ dashboard }) => dashboard,
  );

  return (
    <>
      <section className="diamond_detail_wrapper pt40 pb100 pb80-lg pb50-md pt0-md">
        <Container>
          <Row>
            <Col xl={4} lg={6}>
              <DiamondImgSlider
                stockDetailDnaList={stockDetailDnaList}
                stockDetailDnaLoading={stockDetailDnaLoading}
              />
            </Col>
            <Col xl={8} lg={6}>
              <DiamondInfo
                stoneNo={stoneNo}
                diamondType={diamondType}
                stoneId={stockDetailDnaList?.Stock_ID}
                stockDetailDnaList={stockDetailDnaList}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {stockDetailDnaList?.Certificate_file_url && (
        <section className="certificate_wrapper pb100">
          <Container>
            <iframe
              src={`${stockDetailDnaList?.Certificate_file_url}&navpanes=0`}
              height="900"
              width="100%"
              title="Iframe Example"
            ></iframe>
          </Container>
        </section>
      )}
    </>
  );
};
export default memo(ChooseDiamondDetail);
