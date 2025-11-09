import _ from 'lodash';
import { useMemo } from 'react';

export const HipHopListView = ({
  currentData,
  handleImageError,
  NoImageAvailable,
  onClickJewelleryDetail,
}) => {
  const renderRow = useMemo(() => {
    return (
      <div className="product_list_wrapper mt-0">
        <div className="table-responsive">
          <table>
            <thead>
              <tr className="center_all_td">
                <th>Stock No</th>
                <th>Image</th>
                <th>Type</th>
                <th>Sub Type</th>
                <th>Metal</th>
                <th>Gross Weight</th>
                <th>Net Weight</th>
                <th>Total Diamond Weight</th>
                <th>Price</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {_.map(currentData, (x, i) => {
                return (
                  <HipHopListTableContainer
                    {...x}
                    key={i}
                    row={x}
                    index={i}
                    NoImageAvailable={NoImageAvailable}
                    handleImageError={handleImageError}
                    onClickJewelleryDetail={onClickJewelleryDetail}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }, [currentData, handleImageError, NoImageAvailable, onClickJewelleryDetail]);

  return <>{renderRow}</>;
};

const HipHopListTableContainer = ({
  row,
  Type,
  isCheck,
  Sub_Type,
  Stock_ID,
  Sale_Rate,
  GrossWeight,
  Jewellery_No,
  Img_Video_Url,
  NoImageAvailable,
  handleImageError,
  Metal_PurityColor,
  Total_Stone_Weight,
  Total_Metal_Weight,
  onClickJewelleryDetail,
  Location,
}) => {
  const stockNoTd = useMemo(() => {
    return (
      <td className="text-uppercase">{Jewellery_No ? Jewellery_No : '-'}</td>
    );
  }, [Jewellery_No]);

  const imageViewTd = useMemo(() => {
    return (
      <td>
        <div className="diamond_list_img">
          <img
            src={Img_Video_Url ? Img_Video_Url : NoImageAvailable}
            onError={handleImageError}
            alt="DiamondImg"
            onClick={() => onClickJewelleryDetail(Stock_ID)}
          />
        </div>
      </td>
    );
  }, [
    Stock_ID,
    Img_Video_Url,
    NoImageAvailable,
    handleImageError,
    onClickJewelleryDetail,
  ]);

  const typeTd = useMemo(() => {
    return <td>{Type ? Type : '-'}</td>;
  }, [Type]);

  const subTypeTd = useMemo(() => {
    return <td>{Sub_Type ? Sub_Type : '-'}</td>;
  }, [Sub_Type]);

  const metalPurityColorTd = useMemo(() => {
    return <td>{Metal_PurityColor ? Metal_PurityColor : '-'}</td>;
  }, [Metal_PurityColor]);

  const netWeightTd = useMemo(() => {
    return <td>{Total_Metal_Weight ? `${Total_Metal_Weight}gm` : '-'}</td>;
  }, [Total_Metal_Weight]);

  const grossWeightTd = useMemo(() => {
    return <td>{GrossWeight ? `${GrossWeight}gm` : '-'}</td>;
  }, [GrossWeight]);

  const diamondWeightTd = useMemo(() => {
    return <td>{Total_Stone_Weight ? `${Total_Stone_Weight}ct` : '-'}</td>;
  }, [Total_Stone_Weight]);

  const priceTd = useMemo(() => {
    return <td>{Sale_Rate ? `$${Sale_Rate}` : '$0'}</td>;
  }, [Sale_Rate]);

  const locationList = useMemo(() => {
    return <td>{Location ? Location : '-'}</td>;
  }, [Location]);

  const renderRow = useMemo(() => {
    return (
      <tr className="center_all_td">
        {stockNoTd}
        {imageViewTd}
        {typeTd}
        {subTypeTd}
        {metalPurityColorTd}
        {grossWeightTd}
        {netWeightTd}
        {diamondWeightTd}
        {priceTd}
        {locationList}
      </tr>
    );
  }, [
    diamondWeightTd,
    grossWeightTd,
    imageViewTd,
    metalPurityColorTd,
    netWeightTd,
    priceTd,
    stockNoTd,
    subTypeTd,
    typeTd,
    locationList,
  ]);
  return <>{renderRow}</>;
};
