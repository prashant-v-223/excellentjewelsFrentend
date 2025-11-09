import { memo, useCallback, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import NoImageAvailable from '../../Assets/Images/notfound2.png';

const WatchListTableData = ({
  currentData,
  onSelectDiamond,
  onClickToDiamondDetail,
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
            {window.location.pathname === '/my-hold-list' && (
              <>
                <th>Availability</th>
                <th>Remark</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {currentData?.map((x, i) => {
            return (
              <WatchListItemContainer
                {...x}
                key={i}
                index={i}
                row={x}
                onSelectDiamond={onSelectDiamond}
                handleImageError={handleImageError}
                onClickToDiamondDetail={onClickToDiamondDetail}
              />
            );
          })}
        </tbody>
      </table>
    );
  }, [currentData, onSelectDiamond, handleImageError, onClickToDiamondDetail]);
  return <>{renderTable}</>;
};

const WatchListItemContainer = ({
  Cut,
  Lab,
  row,
  Symm,
  index,
  Color,
  Shape,
  Polish,
  Weight,
  Remark,
  Clarity,
  isCheck,
  Cost_Amt,
  Stone_No,
  FlrIntens,
  Measurement,
  StockStatus,
  Hold_Status,
  Lab_Report_No,
  Stone_Img_url,
  Cost_Discount,
  Total_Depth_Per,
  onSelectDiamond,
  handleImageError,
  Table_Diameter_Per,
  onClickToDiamondDetail,
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
          onClick={e => onSelectDiamond(row, 'Stock_ID')}
        />
      </td>
    );
  }, [isCheck, onSelectDiamond, row]);

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
        <div
          className="diamond_list_img"
          onClick={() => onClickToDiamondDetail(Stone_No)}
        >
          <img
            src={Stone_Img_url ? Stone_Img_url : NoImageAvailable}
            alt="diamond"
            onError={handleImageError}
          />
        </div>
      </td>
    );
  }, [Stone_No, Stone_Img_url, handleImageError, onClickToDiamondDetail]);

  const shapeTd = useMemo(() => {
    return <td>{Shape ? Shape : '-'}</td>;
  }, [Shape]);

  const sizeTd = useMemo(() => {
    return <td>{Weight ? `${Weight}ct` : '-'}</td>;
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

  const measurementTd = useMemo(() => {
    return <td>{Measurement ? `$${Measurement}` : '$0'}</td>;
  }, [Measurement]);

  const tableTd = useMemo(() => {
    return <td>{Table_Diameter_Per ? `${Table_Diameter_Per}%` : '0.00%'}</td>;
  }, [Table_Diameter_Per]);

  const depthTd = useMemo(() => {
    return <td>{Total_Depth_Per ? `${Total_Depth_Per}%` : '0.00%'}</td>;
  }, [Total_Depth_Per]);

  const holdStatusTd = useMemo(() => {
    return <td>{Hold_Status ? Hold_Status : '-'}</td>;
  }, [Hold_Status]);

  const remarkTd = useMemo(() => {
    return <td>{Remark ? Remark : '-'}</td>;
  }, [Remark]);

  const locationList = useMemo(() => {
    return <td>{Location ? Location : '-'}</td>;
  }, [Location]);

  const renderRow = useMemo(() => {
    return (
      <>
        <tr key={index} className="center_all_td">
          {checkDiamondTd}
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
          {window.location.pathname === '/my-hold-list' && (
            <>
              {holdStatusTd}
              {remarkTd}
            </>
          )}
        </tr>
      </>
    );
  }, [
    index,
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
    labReportNoTd,
    discTd,
    labTd,
    priceTd,
    measurementTd,
    tableTd,
    depthTd,
    holdStatusTd,
    remarkTd,
    locationList,
  ]);

  return <>{renderRow}</>;
};
export default memo(WatchListTableData);
