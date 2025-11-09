import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import PlusIcon from '../../Assets/Images/plusicon.svg';

const DiamondInfoForSetting = ({
  dispatch,
  stockDetailDnaList,
  onChangeStepForSetting,
  selectedJewelleryForSetting,
  setSelectedDiamondForSetting,
  setSelectedJewelleryForSetting,
  setIsSearchForJewellerySettingWise,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isShowWarning, setIsShowWarning] = useState(false);

  const handleClose = () => setIsShowWarning(false);
  const handleShow = () => setIsShowWarning(true);

  const handleSubmit = useCallback(() => {
    dispatch(setIsSearchForJewellerySettingWise(false));
    dispatch(setSelectedJewelleryForSetting({}));
    dispatch(setSelectedDiamondForSetting(stockDetailDnaList));
    onChangeStepForSetting(3);
    setIsShowWarning(false);
  }, [
    dispatch,
    stockDetailDnaList,
    onChangeStepForSetting,
    setSelectedDiamondForSetting,
    setSelectedJewelleryForSetting,
    setIsSearchForJewellerySettingWise,
  ]);

  const showWarning = useMemo(() => {
    return (
      <Modal
        show={isShowWarning}
        onHide={handleClose}
        centered
        className="warning_modal"
      >
        <Modal.Body>
          <div className="warning_text">
            <p> Are you sure want to change diamond!</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="outline-primary"
            size="md"
            className="rounded-pill fs_14"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            variant="primary"
            className="rounded-pill btn_shadow px30 px20-xl fs_14"
            size="md"
            onClick={handleSubmit}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }, [isShowWarning, handleSubmit]);

  return (
    <>
      {showWarning}
      <div className="diamond_detail_contemt_wrap">
        <div className="d-flex align-items-center justify-content-between border-bottom-color">
          <h6 className="fs_18 mb0 fw_500 ff_Mulish">
            {stockDetailDnaList?.Weight
              ? `${stockDetailDnaList.Weight}carat, `
              : ''}
            {stockDetailDnaList?.Shape
              ? `${stockDetailDnaList.Shape}  Shape `
              : ''}
            Diamond
          </h6>
          <div className="text-start text-sm-end">
            {stockDetailDnaList?.StockStatus && (
              <h6
                className={
                  stockDetailDnaList.StockStatus === 'AVAILABLE'
                    ? 'mb0 fw_500 available  ff_Mulish'
                    : stockDetailDnaList.StockStatus === 'ONHOLD'
                    ? ' mb0 fw_500 on_hold  ff_Mulish'
                    : stockDetailDnaList.StockStatus === 'ONMEMO'
                    ? 'mb0 fw_500 on_memo  ff_Mulish'
                    : ''
                }
              >
                {stockDetailDnaList.StockStatus}
              </h6>
            )}
          </div>
        </div>
        <ul className="action_button_wrap d-flex flex-wrap align-items-center mt10 mb20">
          <li>
            <Button
              variant="primary"
              size="sm"
              className="px20 px10-xs"
              onClick={() => {
                if (
                  window.location.pathname === '/setting-diamond-wise' &&
                  Object?.keys(selectedJewelleryForSetting)?.length > 0 &&
                  selectedJewelleryForSetting?.DiamondDetail?.[0]?.Shape !==
                    stockDetailDnaList?.Shape
                ) {
                  handleShow();
                } else {
                  window.location.pathname === '/setting-diamond-wise' &&
                    dispatch(setIsSearchForJewellerySettingWise(false));
                  onChangeStepForSetting(
                    window.location.pathname === '/setting-jewellery-wise'
                      ? 5
                      : 3,
                  );
                  dispatch(setSelectedDiamondForSetting(stockDetailDnaList));
                }
              }}
            >
              <img src={PlusIcon} alt="PlusIcon" />
              Choose This Diamond
            </Button>
          </li>
        </ul>
        <div className="detail_top_wrapper">
          <ul>
            <li>
              Lab
              <span>
                {stockDetailDnaList?.Lab ? `${stockDetailDnaList.Lab}` : '-'}
              </span>
            </li>
            <li>
              Certificate No <span>{stockDetailDnaList?.Stone_No}</span>
            </li>
            <li>
              Price / Rate <span>-</span>
            </li>
            <li>
              Amount
              <span>
                $
                {stockDetailDnaList?.Cost_Amt ? stockDetailDnaList.Cost_Amt : 0}
              </span>
            </li>
          </ul>
        </div>
        <div className="stone_detail_wrapper">
          <h4>Grading Details</h4>
          <div className="stone_detail_wrapper_inner">
            <Row className="g-2">
              <Col md={6}>
                <div className="additional_detail_box">
                  <table>
                    <tbody>
                      <tr>
                        <td>Shape</td>
                        <td>
                          {stockDetailDnaList?.Shape
                            ? `${stockDetailDnaList.Shape}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Size</td>
                        <td>
                          {stockDetailDnaList?.Weight
                            ? `${stockDetailDnaList.Weight} ct`
                            : '-'}{' '}
                        </td>
                      </tr>
                      <tr>
                        <td>Color</td>
                        <td>
                          {stockDetailDnaList?.Color
                            ? `${stockDetailDnaList.Color}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Clarity</td>
                        <td>
                          {stockDetailDnaList?.Clarity
                            ? `${stockDetailDnaList.Clarity}`
                            : '-'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col md={6}>
                <div className="additional_detail_box">
                  <table>
                    <tbody>
                      <tr>
                        <td>Cut</td>
                        <td>
                          {stockDetailDnaList?.Cut
                            ? `${stockDetailDnaList.Cut}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Polish</td>
                        <td>
                          {stockDetailDnaList?.Polish
                            ? `${stockDetailDnaList.Polish}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Symmetry</td>
                        <td>
                          {stockDetailDnaList?.Symm
                            ? `${stockDetailDnaList.Symm}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Fluorescence</td>
                        <td>
                          {stockDetailDnaList?.FlrIntens
                            ? `${stockDetailDnaList.FlrIntens}`
                            : '-'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="stone_detail_wrapper">
          <h4>Measurement Mapping</h4>
          <div className="stone_detail_wrapper_inner">
            <Row className="g-2">
              <Col md={6}>
                <div className="additional_detail_box">
                  <table>
                    <tbody>
                      <tr>
                        <td>Measurements</td>
                        <td>
                          {stockDetailDnaList?.Measurement
                            ? `${stockDetailDnaList.Measurement}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Table %</td>
                        <td>
                          {stockDetailDnaList?.Table_Diameter_Per
                            ? `${stockDetailDnaList.Table_Diameter_Per}%`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Depth %</td>
                        <td>
                          {stockDetailDnaList?.Total_Depth_Per
                            ? `${stockDetailDnaList.Total_Depth_Per}%`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>CA-CH</td>
                        <td>
                          {stockDetailDnaList?.CrownAngle
                            ? `${stockDetailDnaList.CrownAngle}°`
                            : '-'}
                          -{' '}
                          {stockDetailDnaList?.CrownHeight
                            ? `${stockDetailDnaList.CrownHeight}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>PA-PH</td>
                        <td>
                          {stockDetailDnaList?.PavillionAngle
                            ? `${stockDetailDnaList.PavillionAngle}°`
                            : '-'}{' '}
                          -{' '}
                          {stockDetailDnaList?.PavillionHeight
                            ? `${stockDetailDnaList.PavillionHeight}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Key To Symbol</td>
                        <td>
                          {stockDetailDnaList?.KeyToSymbols
                            ? `${stockDetailDnaList.KeyToSymbols}`
                            : '-'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col md={6}>
                <div className="additional_detail_box">
                  <table>
                    <tbody>
                      <tr>
                        <td>Star/LH</td>
                        <td>
                          {stockDetailDnaList?.StarLength
                            ? `${stockDetailDnaList.StarLength}°`
                            : '-'}
                          /
                          {stockDetailDnaList?.LowerHalve
                            ? `${stockDetailDnaList.LowerHalve}°`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Girdle</td>
                        <td>
                          {stockDetailDnaList?.GirdleName
                            ? `${stockDetailDnaList.GirdleName}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Girdle Condition</td>
                        <td>
                          {stockDetailDnaList?.GirdleCon
                            ? `${stockDetailDnaList.GirdleCon}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Culet</td>
                        <td>
                          {stockDetailDnaList?.CuletSize
                            ? `${stockDetailDnaList.CuletSize}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Girdle %</td>
                        <td>
                          {stockDetailDnaList?.Girdle_Per
                            ? `${stockDetailDnaList.Girdle_Per}%`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Report Comment</td>
                        <td>
                          {stockDetailDnaList?.Lab_Report_Comment
                            ? `${stockDetailDnaList.Lab_Report_Comment}`
                            : '-'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="stone_detail_wrapper">
          <h4>Inclusion Details</h4>
          <div className="stone_detail_wrapper_inner">
            <Row className="g-2">
              <Col md={6}>
                <div className="additional_detail_box">
                  <table>
                    <tbody>
                      <tr>
                        <td>Tinge</td>
                        <td>
                          {stockDetailDnaList?.Tinge
                            ? `${stockDetailDnaList.Tinge}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Milky</td>
                        <td>
                          {stockDetailDnaList?.Milkey
                            ? `${stockDetailDnaList.Milkey}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Eyeclean</td>
                        <td>
                          {stockDetailDnaList?.Eyeclean
                            ? `${stockDetailDnaList.Eyeclean}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>BIC</td>
                        <td>
                          {stockDetailDnaList?.BIC
                            ? `${stockDetailDnaList.BIC}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>H&A</td>
                        <td>
                          {stockDetailDnaList?.HnA
                            ? `${stockDetailDnaList.HnA}`
                            : '-'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col md={6}>
                <div className="additional_detail_box">
                  <table>
                    <tbody>
                      <tr>
                        <td>BIS</td>
                        <td>
                          {stockDetailDnaList?.BIS
                            ? `${stockDetailDnaList.BIS}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>WIC</td>
                        <td>
                          {stockDetailDnaList?.WIC
                            ? `${stockDetailDnaList.WIC}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>WIS</td>
                        <td>
                          {stockDetailDnaList?.WIS
                            ? `${stockDetailDnaList.WIS}`
                            : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Growth Type</td>
                        <td>
                          {stockDetailDnaList?.CVD_HPHT
                            ? `${stockDetailDnaList.CVD_HPHT}`
                            : '-'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(DiamondInfoForSetting);
