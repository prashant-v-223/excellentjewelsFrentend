import { getStockDetailDna } from 'Components/Redux/reducers/dashboard.slice';
import { getSessionData } from 'Helper/AuthTokenHelper';
import { getUrlParam } from 'Helper/CommonHelper';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import compareIcon from '../../Assets/Images/compare.svg';
import LeftAngel from '../../Assets/Images/left-angle.svg';
import DiamondImgSlider from './DiamondImgSlider';
import DiamondInfo from './DiamondInfo';
import CustomerReviews from 'Components/Common/CustomerReviews';

const DiamondDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { callbackUrl } = location.state || {};

  const deviceType = useMemo(() => {
    const detectDeviceType = () => {
      if (
        /Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      )
        return 'mobile';
      else if (/iPad|iPod/i.test(navigator.userAgent)) return 'tablet';
      else return 'browser';
    };
    return detectDeviceType();
  }, []);

  const stoneNo = getUrlParam(window.location.search, 'stoneNo');
  const diamondType = getUrlParam(window.location.search, 'diamondType');
  const {
    stockDetailDnaList,
    stockDetailDnaLoading,
    similarDiamondList,
    searchDiamondFilterList2 = new Map(),
  } = useSelector(({ dashboard }) => dashboard);
  useEffect(() => {
    if (stoneNo && diamondType) {
      const userDataToken = getSessionData();
      dispatch(
        getStockDetailDna({
          StoneNo: stoneNo,
          UserID: userDataToken ? userDataToken?.UserID : 0,
        }),
      );
    }
  }, [dispatch, stoneNo, diamondType]);

  const goBack = useCallback(() => {
    callbackUrl && navigate(callbackUrl);
  }, [callbackUrl, navigate]);

  return (
    <main>
      <section className="diamond_detail_wrapper pt40 pb10">
        <Container>
          {callbackUrl && (
            <div className="back_arrow ff_Mulish" onClick={goBack}>
              <img src={LeftAngel} alt="LeftAngel" />
              Back to Search
            </div>
          )}
          <Row>
            <Col xl={4} lg={6}>
              <DiamondImgSlider
                stockDetailDnaList={stockDetailDnaList}
                stockDetailDnaLoading={stockDetailDnaLoading}
              />
            </Col>
            <DiamondInfo
              stoneNo={stoneNo}
              deviceType={deviceType}
              stoneId={stockDetailDnaList?.Stock_ID}
              stockDetailDnaList={stockDetailDnaList}
              diamondType={stockDetailDnaList?.Diamond_Type}
              searchDiamondFilterList2={searchDiamondFilterList2}
              similarDiamondList={similarDiamondList}
            />
          </Row>
          <CustomerReviews />
        </Container>
      </section>

      <div
        className="compare_button d-none d-sm-block"
        onClick={() => navigate('/compare')}
      >
        <span>Compare</span> <img src={compareIcon} alt="" />
      </div>
    </main>
  );
};
export default memo(DiamondDetail);
