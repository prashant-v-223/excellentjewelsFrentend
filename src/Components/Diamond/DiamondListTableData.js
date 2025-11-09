import React, { memo, useCallback, useMemo } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import NoImageAvailable from '../../Assets/Images/notfound2.png';
import RightArrow from '../../Assets/Images/accordian-arrow.svg';
import chooseDiamondIcon from '../../Assets/Images/choose-diamond-icon.svg';
import { Link } from 'react-router-dom';

const DiamondListTableData = ({
  currentData,
  diamondType,
  location,
  isViewCheckBox,
  onSelectDiamond,
  onExpandDiamond,
  onClickToDiamondDetail,
  onSelectDiamondForSetting,
}) => {
  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);

  const renderTable = useMemo(() => {
    return (
      <table>
        <thead>
          <tr className="center_all_td">
            <th></th>
            <th></th>
            <th>Status</th>
            <th>Image</th>
            <th>Shape</th>
            <th>Size</th>
            <th>Color</th>
            <th>Clarity</th>
            <th>Cut</th>
            <th>Pol</th>
            <th>Sym</th>
            <th>Fluor</th>
            <th>Lab</th>
            <th>Certi. No</th>
            <th>Disc</th>
            <th>Price</th>
            <th>Measurement</th>
            <th>Depth</th>
            <th>Table</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((x, i) => {
            return (
              <WatchListItemContainer
                {...x}
                key={i}
                row={x}
                index={i}
                location={location}
                diamondType={diamondType}
                isViewCheckBox={isViewCheckBox}
                onSelectDiamond={onSelectDiamond}
                onExpandDiamond={onExpandDiamond}
                handleImageError={handleImageError}
                onClickToDiamondDetail={onClickToDiamondDetail}
                onSelectDiamondForSetting={onSelectDiamondForSetting}
              />
            );
          })}
        </tbody>
      </table>
    );
  }, [
    location,
    currentData,
    diamondType,
    isViewCheckBox,
    onSelectDiamond,
    onExpandDiamond,
    handleImageError,
    onClickToDiamondDetail,
    onSelectDiamondForSetting,
  ]);
  return <>{renderTable}</>;
};

const WatchListItemContainer = ({
  Cut,
  row,
  Lab,
  Symm,
  index,
  Color,
  Shape,
  Ratio,
  Girdle,
  Luster,
  Weight,
  Polish,
  Clarity,
  isCheck,
  location,
  Eyeclean,
  Stone_No,
  Cost_Amt,
  FlrIntens,
  Cost_Rate,
  CrownAngle,
  isExpanded,
  CrownHeight,
  Measurement,
  diamondType,
  StockStatus,
  Stone_Img_url,
  Lab_Report_No,
  Live_Rap_Rate,
  Cost_Discount,
  isViewCheckBox,
  PavillionAngle,
  PavillionHeight,
  onSelectDiamond,
  onExpandDiamond,
  handleImageError,
  Total_Depth_Per,
  Table_Diameter_Per,
  rowPavillionHeight,
  onClickToDiamondDetail,
  onSelectDiamondForSetting,
  Location,
}) => {
  const checkDiamondTd = useMemo(() => {
    return (
      <td>
        <Form.Check
          type="checkbox"
          readOnly
          id="selectProduct"
          name="selectProduct"
          checked={isCheck}
          onClick={e => onSelectDiamond(row)}
        />
      </td>
    );
  }, [isCheck, onSelectDiamond, row]);

  const chooseDiamondTd = useMemo(() => {
    return (
      <td>
        <span
          className="choose-diamond-icon"
          onClick={() => onSelectDiamondForSetting(Stone_No, diamondType)}
        >
          <img src={chooseDiamondIcon} alt="chooseDiamondIcon" />
        </span>
      </td>
    );
  }, [Stone_No, diamondType, onSelectDiamondForSetting]);

  const availabilityTd = useMemo(() => {
    return (
      <td>
        {StockStatus ? (
          <span
            className={
              StockStatus === 'AVAILABLE'
                ? 'bedge mx-auto available'
                : StockStatus === 'ONHOLD'
                ? 'bedge mx-auto on_hold'
                : StockStatus === 'ONMEMO'
                ? 'bedge mx-auto on_memo'
                : ''
            }
          >
            {StockStatus === 'AVAILABLE'
              ? 'A'
              : StockStatus === 'ONHOLD'
              ? 'H'
              : StockStatus === 'ONMEMO'
              ? 'M'
              : ''}
          </span>
        ) : (
          '-'
        )}
      </td>
    );
  }, [StockStatus]);

  const diamondImageTd = useMemo(() => {
    return (
      <td>
        <div className="diamond_list_img">
          <img
            src={Stone_Img_url ? Stone_Img_url : NoImageAvailable}
            alt="diamond"
            onClick={() => onClickToDiamondDetail(Stone_No, diamondType)}
            onError={handleImageError}
          />
        </div>
      </td>
    );
  }, [
    Stone_No,
    diamondType,
    Stone_Img_url,
    handleImageError,
    onClickToDiamondDetail,
  ]);

  const expanedTd = useMemo(() => {
    return (
      <td>
        <span
          className={
            isExpanded
              ? 'toggle_arrow expanded_toggle'
              : 'toggle_arrow collapse_toggle'
          }
          onClick={() => onExpandDiamond(row)}
        >
          <img src={RightArrow} alt="" />
        </span>
      </td>
    );
  }, [isExpanded, onExpandDiamond, row]);

  const shapeTd = useMemo(() => {
    return <td>{Shape ? Shape : '-'}</td>;
  }, [Shape]);

  const sizeTd = useMemo(() => {
    return <td>{Weight ? `${Weight}ct` : '-'} </td>;
  }, [Weight]);

  const colorTd = useMemo(() => {
    return <td>{Color ? Color : '-'}</td>;
  }, [Color]);

  const clarityTd = useMemo(() => {
    return <td>{Clarity ? Clarity : '-'}</td>;
  }, [Clarity]);

  const cutTd = useMemo(() => {
    return <td>{Cut ? Cut : '-'}</td>;
  }, [Cut]);

  const polishTd = useMemo(() => {
    return <td>{Polish ? Polish : '-'}</td>;
  }, [Polish]);

  const symmTd = useMemo(() => {
    return <td>{Symm ? Symm : '-'}</td>;
  }, [Symm]);

  const flrIntensTd = useMemo(() => {
    return <td>{FlrIntens ? FlrIntens : '-'}</td>;
  }, [FlrIntens]);

  const labTd = useMemo(() => {
    return <td>{Lab ? Lab : '-'}</td>;
  }, [Lab]);

  const labReportNoTd = useMemo(() => {
    return <td>{Lab_Report_No ? Lab_Report_No : '-'}</td>;
  }, [Lab_Report_No]);

  const discTd = useMemo(() => {
    return <td>{Cost_Discount ? Cost_Discount : '-'}</td>;
  }, [Cost_Discount]);

  const priceTd = useMemo(() => {
    return <td>{Cost_Amt ? `$${Cost_Amt}` : '$0'}</td>;
  }, [Cost_Amt]);

  const tableTd = useMemo(() => {
    return <td>{Table_Diameter_Per ? `${Table_Diameter_Per}%` : '0.00%'}</td>;
  }, [Table_Diameter_Per]);

  const depthTd = useMemo(() => {
    return <td>{Total_Depth_Per ? `${Total_Depth_Per}%` : '0.00%'}</td>;
  }, [Total_Depth_Per]);

  const measurementTd = useMemo(() => {
    return <td>{Measurement ? `${Measurement}%` : '0.00%'}</td>;
  }, [Measurement]);

  const locationList = useMemo(() => {
    return <td>{Location ? Location : '-'}</td>;
  }, [Location]);

  const renderRowSubTd = useMemo(() => {
    return (
      <td colSpan={20}>
        <div className="expanded_table_Wrap">
          <div className="expanded_table_Wrap_inner">
            <div className="diamond_detail_main">
              <div className="diamond_detail_box">
                <h6 className="ff_Mulish">Diamond Detail</h6>
                <div className="diamond_detail_text left">
                  {(Luster || Eyeclean) && (
                    <ul>
                      {Luster && <li>{Luster} luster</li>}
                      {Eyeclean && <li>{Eyeclean} eye clean</li>}
                    </ul>
                  )}
                  <Row>
                    <Col xs={4}>
                      <div className="diamond_img mb10-lg">
                        <Link
                          to={
                            (`/diamond-detail?stoneNo=${Stone_No}&diamondType=${diamondType}`,
                            {
                              state: {
                                callbackUrl: `${location.pathname}${location.search}`,
                              },
                            })
                          }
                        >
                          <img
                            src={
                              Stone_Img_url ? Stone_Img_url : NoImageAvailable
                            }
                            alt="diamond"
                          />
                        </Link>
                      </div>
                    </Col>
                    <Col lg={8}>
                      <div className="diamond_detail_table">
                        <table>
                          <tbody>
                            <tr>
                              <th>Certification#</th>
                              <td>
                                {Lab ? Lab : '-'}{' '}
                                {Lab_Report_No ? Lab_Report_No : '-'}
                              </td>
                            </tr>
                            <tr>
                              <th>Stock#</th>
                              <td>{Stone_No ? Stone_No : '-'}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className="diamond_detail_main">
              <div className="diamond_detail_box">
                <h6 className="ff_Mulish">Diamond Detail</h6>
                <div className="diamond_detail_text left">
                  <Row className="g-3">
                    <Col xxl={6}>
                      <div className="diamond_detail_table">
                        <table>
                          <tbody>
                            <tr>
                              <th>Measurment</th>
                              <td>{Measurement ? Measurement : '-'}</td>
                            </tr>
                            <tr>
                              <th>Table</th>
                              <td>
                                {Table_Diameter_Per ? Table_Diameter_Per : '-'}
                              </td>
                            </tr>
                            <tr>
                              <th>Depth</th>
                              <td>{Total_Depth_Per ? Total_Depth_Per : '-'}</td>
                            </tr>
                            <tr>
                              <th>Ration</th>
                              <td>{Ratio ? Ratio : '-'}</td>
                            </tr>
                            <tr>
                              <th>Girdle</th>
                              <td>{Girdle ? Girdle : '-'}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Col>
                    <Col xxl={6}>
                      <div className="diamond_detail_table">
                        <table>
                          <tbody>
                            <tr>
                              <th>Crown angle</th>
                              <td>{CrownAngle ? CrownAngle : '-'}</td>
                            </tr>
                            <tr>
                              <th>Crown height</th>
                              <td>{CrownHeight ? CrownHeight : '-'}</td>
                            </tr>
                            <tr>
                              <th>Pavilion angle</th>
                              <td>{PavillionAngle ? PavillionAngle : '-'}</td>
                            </tr>
                            <tr>
                              <th>Pavilion depth</th>
                              <td>
                                {rowPavillionHeight ? PavillionHeight : '-'}
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
            <div className="supplyer_detail_main">
              <div className="diamond_detail_box">
                <h6 className="ff_Mulish">Price Details</h6>
                <div className="diamond_detail_text">
                  <div className="price_detail_wrap">
                    <div className="diamond_price">
                      <div>
                        <h4 className="ff_Mulish">Rap</h4>
                        <h4 className="ff_Mulish">Discount</h4>
                        <h4 className="ff_Mulish">Rate</h4>
                        <h4 className="ff_Mulish">Amount</h4>
                      </div>
                      <h3>
                        <p className="ff_Mulish">
                          {Live_Rap_Rate ? Live_Rap_Rate : '-'}
                        </p>
                        <p className="ff_Mulish">
                          {Cost_Discount ? Cost_Discount : '-'}
                        </p>
                        <p className="ff_Mulish">
                          {Cost_Rate ? Cost_Rate : '-'}
                        </p>
                        <p className="text_secondary  ff_Mulish fw_600">
                          {Cost_Amt ? Cost_Amt : '-'}
                        </p>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    );
  }, [
    diamondType,
    Eyeclean,
    Luster,
    Cost_Amt,
    Cost_Discount,
    Cost_Rate,
    CrownAngle,
    CrownHeight,
    Lab,
    Girdle,
    Live_Rap_Rate,
    Measurement,
    PavillionAngle,
    PavillionHeight,
    Ratio,
    Lab_Report_No,
    Stone_Img_url,
    Stone_No,
    Table_Diameter_Per,
    Total_Depth_Per,
    rowPavillionHeight,
  ]);
  const renderRow = useMemo(() => {
    return (
      <>
        <tr key={index} className="center_all_td">
          {expanedTd}
          {isViewCheckBox ? checkDiamondTd : chooseDiamondTd}
          {availabilityTd}
          {diamondImageTd}
          {shapeTd}
          {sizeTd}
          {colorTd}
          {clarityTd}
          {cutTd}
          {polishTd}
          {symmTd}
          {flrIntensTd}
          {labTd}
          {labReportNoTd}
          {discTd}
          {priceTd}
          {measurementTd}
          {depthTd}
          {tableTd}
          {locationList}
        </tr>
        {isExpanded && <tr className="exapanded_row">{renderRowSubTd}</tr>}
      </>
    );
  }, [
    isExpanded,
    index,
    expanedTd,
    isViewCheckBox,
    checkDiamondTd,
    availabilityTd,
    diamondImageTd,
    shapeTd,
    sizeTd,
    colorTd,
    clarityTd,
    cutTd,
    polishTd,
    symmTd,
    flrIntensTd,
    labTd,
    labReportNoTd,
    discTd,
    priceTd,
    tableTd,
    depthTd,
    renderRowSubTd,
    measurementTd,
    chooseDiamondTd,
    locationList,
  ]);

  return <>{renderRow}</>;
};

export default memo(DiamondListTableData);
