import React, { memo, useCallback, useMemo } from 'react';
import NoImageAvailable from '../../Assets/Images/notfound2.png';
import { Form } from 'react-bootstrap';

const WatchListTableDataForJewellery = ({
  UserID,
  currentData,
  onSelectDiamond,
  onClickToJewelleryDetail,
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
            <th>Category Name</th>
            <th>Jewellery Name</th>
            <th>Jewellery No</th>
            <th>Size/Length</th>
            <th>Type</th>
            <th>Sub Type</th>
            <th>Metal</th>
            <th>M_Weight</th>
            <th>D_Weight</th>
            <th>Shape</th>
            <th>Price</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((x, i) => {
            return (
              <WatchListItemContainerForJewellery
                {...x}
                key={i}
                row={x}
                index={i}
                UserID={UserID}
                onSelectDiamond={onSelectDiamond}
                handleImageError={handleImageError}
                onClickToJewelleryDetail={onClickToJewelleryDetail}
              />
            );
          })}
        </tbody>
      </table>
    );
  }, [
    UserID,
    currentData,
    handleImageError,
    onSelectDiamond,
    onClickToJewelleryDetail,
  ]);
  return <>{renderTable}</>;
};

const WatchListItemContainerForJewellery = ({
  row,
  Type,
  index,
  Metal,
  Shape,
  UserID,
  isCheck,
  Stock_ID,
  Sub_Type,
  Sale_Rate,
  StockStatus,
  Jewellery_No,
  Img_Video_Url,
  Jewellery_Size,
  Category,
  Jewellery_Name,
  onSelectDiamond,
  handleImageError,
  Metal_PurityColor,
  Total_Stone_Weight,
  Total_Metal_Weight,
  onClickToJewelleryDetail,
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
          onClick={() => onClickToJewelleryDetail(Stock_ID)}
        >
          <img
            src={Img_Video_Url ? Img_Video_Url : NoImageAvailable}
            onError={handleImageError}
            alt="jewelleryImg"
            loading="lazy"
          />
        </div>
      </td>
    );
  }, [Stock_ID, Img_Video_Url, handleImageError, onClickToJewelleryDetail]);

  const jewelleryNameTd = useMemo(() => {
    const isExpanded = true;
    const preview = Jewellery_Name
      ? Jewellery_Name.slice(0, 15) + (Jewellery_Name.length > 15 ? '...' : '')
      : '-';
    return <td className="">{isExpanded || preview ? preview : '-'}</td>;
  }, [Jewellery_Name]);

  const jewelleryNoTd = useMemo(() => {
    return <td>{Jewellery_No ? Jewellery_No : '-'}</td>;
  }, [Jewellery_No]);

  const sizeLengthTd = useMemo(() => {
    return <td>{Jewellery_Size ? Jewellery_Size : '-'}</td>;
  }, [Jewellery_Size]);

  const CategoryName = useMemo(() => {
    return <td>{Category ? Category : '-'}</td>;
  }, [Category]);

  const typeTd = useMemo(() => {
    return <td>{Type ? Type : '-'}</td>;
  }, [Type]);

  const subTypeTd = useMemo(() => {
    return <td>{Sub_Type ? Sub_Type : '-'}</td>;
  }, [Sub_Type]);

  const locationList = useMemo(() => {
    return <td>{Location ? Location : '-'}</td>;
  }, [Location]);

  const goldTypeTd = useMemo(() => {
    return (
      <td>
        {UserID
          ? Metal
            ? Metal
            : '-'
          : Metal_PurityColor
          ? Metal_PurityColor
          : '-'}
      </td>
    );
  }, [UserID, Metal, Metal_PurityColor]);

  const metalWeightTd = useMemo(() => {
    return <td>{Total_Metal_Weight ? `${Total_Metal_Weight}gm` : '-'}</td>;
  }, [Total_Metal_Weight]);

  const stoneWeightTd = useMemo(() => {
    return <td>{Total_Stone_Weight ? `${Total_Stone_Weight}ct` : '-'}</td>;
  }, [Total_Stone_Weight]);

  const shapeTd = useMemo(() => {
    return <td>{Shape ? Shape : '-'}</td>;
  }, [Shape]);

  const saleRateTd = useMemo(() => {
    return <td>{Sale_Rate ? `$${(Sale_Rate || 0)?.toFixed(2)}` : '$0'}</td>;
  }, [Sale_Rate]);

  const renderRow = useMemo(() => {
    return (
      <tr key={index} className="center_all_td">
        {checkDiamondTd}
        {availabilityTd}
        {diamondImageTd}
        {CategoryName}
        {jewelleryNameTd}
        {jewelleryNoTd}
        {sizeLengthTd}
        {typeTd}
        {subTypeTd}
        {goldTypeTd}
        {metalWeightTd}
        {stoneWeightTd}
        {shapeTd}
        {saleRateTd}
        {locationList}
      </tr>
    );
  }, [
    index,
    typeTd,
    shapeTd,
    subTypeTd,
    goldTypeTd,
    saleRateTd,
    sizeLengthTd,
    CategoryName,
    metalWeightTd,
    stoneWeightTd,
    jewelleryNoTd,
    checkDiamondTd,
    availabilityTd,
    diamondImageTd,
    jewelleryNameTd,
    locationList,
  ]);

  return <>{renderRow}</>;
};

export default memo(WatchListTableDataForJewellery);
