import React, { memo, useCallback, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LeftAngel from '../../Assets/Images/left-angle.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUrlParam } from 'Helper/CommonHelper';
import { getJewelleryDetailList } from 'Components/Redux/reducers/jewellery.slice';
import { setJewelleryDetailData } from 'Components/Redux/reducers/jewellery.slice';
import { setIsJewelleryGetApi } from 'Components/Redux/reducers/jewellery.slice';
import { getCartStockCount } from 'Components/Redux/reducers/dashboard.slice';
import { setIsAddToCartJewellery } from 'Components/Redux/reducers/jewellery.slice';
import JewelleryImgSlider from 'Components/Jewellery/JewelleryImgSlider';
import HipHopInfo from './HipHopInfo';
import CustomerReviews from 'Components/Common/CustomerReviews';

const HipHopDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    jewelleryDetailData,
    isAddToCartJewellery,
    jewellerySearchStock = new Map(),
  } = useSelector(({ jewellery }) => jewellery);
  const { userData } = useSelector(({ auth }) => auth);
  const stockId = getUrlParam(window.location.search, 'stockId');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stockId]);

  useEffect(() => {
    if (stockId) {
      dispatch(getJewelleryDetailList(stockId));
    }
    return () => {
      dispatch(setJewelleryDetailData({}));
      dispatch(setIsJewelleryGetApi(true));
    };
  }, [dispatch, stockId]);

  useEffect(() => {
    if (isAddToCartJewellery && userData?.UserID) {
      dispatch(getCartStockCount({ UserID: userData?.UserID }));
      dispatch(setIsAddToCartJewellery(false));
    }
  }, [dispatch, isAddToCartJewellery, userData]);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <main>
      <section className="jewellety_detail_wrapper pt20 pb10">
        <Container>
          {window.location.pathname === '/hip-hop-jewellery-detail' && (
            <div className="back_arrow ff_Mulish" onClick={goBack}>
              <img src={LeftAngel} alt="LeftAngel" />
              Back to Search
            </div>
          )}
          <Row className="g-4">
            <Col xl={4} lg={5}>
              <JewelleryImgSlider jewelleryDetailData={jewelleryDetailData} />
            </Col>
            <HipHopInfo
              userData={userData}
              stockId={stockId}
              jewelleryDetailData={jewelleryDetailData}
              jewellerySearchStock={jewellerySearchStock}
            />
          </Row>
          <CustomerReviews />
        </Container>
      </section>
    </main>
  );
};
export default memo(HipHopDetail);
