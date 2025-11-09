import NoImageAvailable from 'Assets/Images/notfound2.png';
import {
  getCompareList,
  removeToCompareList,
  setIsAddToCompareList,
} from 'Components/Redux/reducers/myAccount.slice';
import {
  removeFromCompareListInLocal,
  setDiamondType,
} from 'Components/Redux/reducers/offlineList.slice';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { Container, Form } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '../../Assets/Images/close-btn.svg';
import recordsNotFound from '../../Assets/Images/records-not-found1.png';

const Compare = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const { userData } = useSelector(({ auth }) => auth);
  const { diamondType, compareDiamondList } = useSelector(
    ({ offlineList }) => offlineList,
  );
  const { compareStockList, isAddToCompareList, compareListLoading } =
    useSelector(({ myAccount }) => myAccount);
  useEffect(() => {
    if (Object.keys(userData)?.length > 0 && diamondType) {
      dispatch(
        getCompareList({ UserID: userData?.UserID, Diamond_Type: diamondType }),
      );
    }
  }, [dispatch, userData, diamondType]);

  useEffect(() => {
    if (isAddToCompareList && userData?.UserID) {
      dispatch(
        getCompareList({ UserID: userData?.UserID, Diamond_Type: diamondType }),
      );
      dispatch(setIsAddToCompareList(false));
    }
  }, [dispatch, isAddToCompareList, userData]);

  const compareListData = useMemo(() => {
    if (userData?.UserID) {
      return compareStockList;
    } else {
      if (diamondType === 'LABGROWN') {
        return compareDiamondList.labGrownDiamond;
      } else if (diamondType === 'NATURAL') {
        return compareDiamondList.naturalDiamond;
      } else return [];
    }
  }, [userData, compareDiamondList, compareStockList, diamondType]);

  useEffect(() => {
    const slider = document.querySelector('.compare_list_wrapper');
    let isDown = false;
    let startX;
    let scrollLeft;
    if (slider) {
      slider.addEventListener('mousedown', e => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1;
        slider.scrollLeft = scrollLeft - walk;
      });
    }
  }, [compareListData]);
  const onRemoveFormCompare = useCallback(
    diamond => {
      if (diamond) {
        if (userData?.UserID) {
          dispatch(
            removeToCompareList({
              StockIDs: diamond?.Stock_ID,
              CustomerID: userData?.UserID,
              diamondType: diamondType,
            }),
          );
        } else {
          dispatch(
            removeFromCompareListInLocal({
              diamondCompareObj: diamond,
              diamondType: diamond?.Diamond_Type,
            }),
          );
        }
      }
    },
    [dispatch, userData, diamondType],
  );
  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);

  return (
    <main>
      <section className="compare_wrapper pt80 pt40-lg pb100 pb80-lg pb10-md">
        <Container>
          <h3 className="text-center mb25 h3 ff_Title text-uppercase fw-bold">
            Compare Table
          </h3>
          <div className="check_input_wraper mb25">
            <ul>
              <li className="ff_Mulish">
                <div className="checkbox_wrapper radio_wrapper">
                  <Form.Check
                    type="radio"
                    name="diamondType"
                    id="LabGrownDiamond"
                    readOnly
                    label="Lab Grown Diamond"
                    checked={diamondType === 'LABGROWN'}
                    onClick={() => {
                      if (diamondType !== 'LABGROWN') {
                        dispatch(setDiamondType('LABGROWN'));
                      }
                    }}
                    disabled={compareListLoading}
                  />
                </div>
              </li>
              <li className="ff_Mulish">
                <div className="checkbox_wrapper radio_wrapper">
                  <Form.Check
                    type="radio"
                    name="diamondType"
                    id="NaturalDiamond"
                    readOnly
                    label="Natural Diamond"
                    checked={diamondType === 'NATURAL'}
                    onClick={() => {
                      if (diamondType !== 'NATURAL') {
                        dispatch(setDiamondType('NATURAL'));
                      }
                    }}
                    disabled={compareListLoading}
                  />
                </div>
              </li>
            </ul>
          </div>
          {compareListData?.length > 0 && (
            <div className="compare_inner_wrapper">
              <div className="comapre_title_box">
                <div className="compare_box">
                  <h6 className="ff_Mulish">Grading</h6>
                  <ul>
                    <li className="ff_Mulish">Diamond Shape</li>
                    <li className="ff_Mulish">Size</li>
                    <li className="ff_Mulish">Color</li>
                    <li className="ff_Mulish">Clarity</li>
                    <li className="ff_Mulish">Cut</li>
                    <li className="ff_Mulish">Polish</li>
                  </ul>
                  <h6 className="ff_Mulish">Advanced</h6>
                  <ul>
                    <li className="ff_Mulish">Symmetry</li>
                    <li className="ff_Mulish">Flourescence</li>
                    <li className="ff_Mulish">Depth</li>
                    <li className="ff_Mulish">Lab</li>
                    <li className="ff_Mulish">Girdle%</li>
                    <li className="ff_Mulish">Crown</li>
                    <li className="ff_Mulish">Pavillion</li>
                    <li className="ff_Mulish">Culet</li>
                    <li className="ff_Mulish">Shade</li>
                    <li className="ff_Mulish">H&A</li>
                    <li className="ff_Mulish">LowerHalve</li>
                    <li className="ff_Mulish">Tinge</li>
                    <li className="ff_Mulish">Milky</li>
                    <li className="ff_Mulish">Eyeclean</li>
                    <li className="ff_Mulish">Key To Symbol</li>
                    <li className="ff_Mulish">Comment</li>
                  </ul>
                  <h6 className="ff_Mulish">Inclusion</h6>
                  <ul>
                    <li className="ff_Mulish">BIS</li>
                    <li className="ff_Mulish">BIC</li>
                    <li className="ff_Mulish">WIS</li>
                    <li className="ff_Mulish">WIC</li>
                    <li className="ff_Mulish">Inclusion</li>
                  </ul>
                </div>
              </div>
              <div className="compare_list_wrapper ff_Title ">
                {compareListData?.map(diamond => {
                  return (
                    <>
                      <div className="compare_box">
                        <div className="compare_head">
                          <h5 className="ff_Mulish">#{diamond?.Stone_No}</h5>
                          <img
                            src={CloseIcon}
                            alt="CloseIcon"
                            onClick={() => onRemoveFormCompare(diamond)}
                          />
                        </div>
                        <div className="compare_img">
                          <img
                            src={
                              diamond?.Stone_Img_url
                                ? diamond.Stone_Img_url
                                : NoImageAvailable
                            }
                            onError={handleImageError}
                            alt=""
                          />
                        </div>
                        <h6>
                          <span>Grading</span>
                        </h6>
                        <ul>
                          <li className="ff_Mulish">
                            <span>Diamond Shape</span>
                            {diamond?.Shape ? diamond.Shape : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Size</span>
                            {diamond?.Weight ? `${diamond.Weight} ct` : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Color</span>
                            {diamond?.Color ? diamond.Color : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Clarity</span>
                            {diamond?.Clarity ? diamond.Clarity : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Cut</span>
                            {diamond?.Cut ? diamond.Cut : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Polish</span>
                            {diamond?.Polish ? diamond.Polish : '-'}
                          </li>
                        </ul>
                        <h6>
                          <span>Advanced</span>
                        </h6>
                        <ul>
                          <li className="ff_Mulish">
                            <span>Symmetry</span>
                            {diamond?.Symm ? diamond.Symm : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Flourescence</span>
                            {diamond?.FlrIntens ? diamond.FlrIntens : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Depth</span>
                            {diamond?.Total_Depth ? diamond.Total_Depth : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Lab</span>
                            {diamond?.Lab ? diamond.Lab : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Girdle%</span>
                            {diamond?.Girdle_Per ? diamond.Girdle_Per : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Crown</span>
                            {diamond?.CrownAngle ? diamond.CrownAngle : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Pavillion</span>
                            {diamond?.PavillionAngle
                              ? diamond.PavillionAngle
                              : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Culet</span>
                            {diamond?.CuletSize ? diamond.CuletSize : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Shade</span>
                            {diamond?.Shade ? diamond.Shade : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>H&A</span>
                            {diamond?.HnA ? diamond.HnA : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>LowerHalve</span>
                            {diamond?.LowerHalve ? diamond.LowerHalve : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Tinge</span>
                            {diamond?.Tinge ? diamond.Tinge : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Milky</span>
                            {diamond?.Milkey ? diamond.Milkey : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Eyeclean</span>
                            {diamond?.Eyeclean ? diamond.Eyeclean : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Key To Symbol</span>
                            {diamond?.KeyToSymbols ? diamond.KeyToSymbols : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Comment</span>
                            {diamond?.Comment ? diamond.Comment : '-'}
                          </li>
                        </ul>
                        <h6>
                          <span>Inclusion</span>
                        </h6>
                        <ul>
                          <li className="ff_Mulish">
                            <span>BIS</span>
                            {diamond?.BIS ? diamond.BIS : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>BIC</span>
                            {diamond?.BIC ? diamond.BIC : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>WIS</span>
                            {diamond?.WIS ? diamond.WIS : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>WIC</span>
                            {diamond?.WIC ? diamond.WIC : '-'}
                          </li>
                          <li className="ff_Mulish">
                            <span>Inclusion</span>
                            {diamond?.Table_Inclusion
                              ? diamond.Table_Inclusion
                              : '-'}
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          )}
          {compareListLoading && (
            <div className="skelleton_Wrapper compare_skeleton">
              <Skeleton height={500} count={6} style={{ width: '100%' }} />
            </div>
          )}
          {!compareListLoading && compareListData?.length === 0 && (
            <div className="d-flex justify-content-center flex-column align-items-center data_not_found">
              <img src={recordsNotFound} alt="Records Not Found" />
              <h4 className="ff_Mulish">Data Not Found</h4>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
};
export default memo(Compare);
