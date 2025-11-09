import React, { useMemo } from 'react';
import _ from 'lodash';
import { Form } from 'react-bootstrap';

export function ParcelGoodsListView({
  currentData,
  onSelectDiamond,
  NoImageAvailable,
  handleImageError,
  onClickMixDiamondDetail,
}) {
  const renderTable = useMemo(() => {
    return (
      <div className="product_list_wrapper mt-0">
        <div className="table-responsive">
          <table>
            <thead>
              <tr className="center_all_td">
                <th></th>
                <th>Image</th>
                <th>Shape</th>
                <th>Size</th>
                <th>Color</th>
                <th>Clarity</th>
                <th>Growth Type</th>
                <th>Total Carat Weight</th>
                <th>Price/CT</th>
                <th>Pcs</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {_.map(currentData, (x, i) => {
                return (
                  <WatchContainerListView
                    {...x}
                    row={x}
                    index={i}
                    onSelectDiamond={onSelectDiamond}
                    NoImageAvailable={NoImageAvailable}
                    handleImageError={handleImageError}
                    onClickMixDiamondDetail={onClickMixDiamondDetail}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }, [
    currentData,
    onSelectDiamond,
    NoImageAvailable,
    handleImageError,
    onClickMixDiamondDetail,
  ]);
  return <>{renderTable}</>;
}

const WatchContainerListView = ({
  row,
  Cts,
  Price,
  Pcs,
  Size,
  Shape,
  Color,
  isCheck,
  Quality,
  Image_Url,
  GrowthType,
  onSelectDiamond,
  NoImageAvailable,
  handleImageError,
  onClickMixDiamondDetail,
  Location,
}) => {
  const checkBoxViewTd = useMemo(() => {
    return (
      <td>
        <Form.Check
          type="checkbox"
          readOnly
          id="selectProduct"
          name="selectProduct"
          checked={isCheck}
          onClick={() => onSelectDiamond(row)}
        />
      </td>
    );
  }, [row, isCheck, onSelectDiamond]);

  const imageViewTd = useMemo(() => {
    return (
      <td>
        <div className="diamond_list_img">
          <img
            src={Image_Url ? Image_Url : NoImageAvailable}
            onError={handleImageError}
            alt="DiamondImg"
            onClick={() => onClickMixDiamondDetail(row)}
          />
        </div>
      </td>
    );
  }, [
    row,
    Image_Url,
    NoImageAvailable,
    handleImageError,
    onClickMixDiamondDetail,
  ]);

  const shapeViewTd = useMemo(() => {
    return <td>{Shape ? Shape : '-'}</td>;
  }, [Shape]);

  const sizeViewTd = useMemo(() => {
    return <td>{Size ? Size : '-'}</td>;
  }, [Size]);

  const colorViewTd = useMemo(() => {
    return <td>{Color ? Color : '-'}</td>;
  }, [Color]);

  const clarityViewTd = useMemo(() => {
    return <td>{Quality ? Quality : '-'}</td>;
  }, [Quality]);

  const growthTypeViewTd = useMemo(() => {
    return <td>{GrowthType ? GrowthType : '-'}</td>;
  }, [GrowthType]);

  const ctsViewTd = useMemo(() => {
    return <td>{Cts ? Cts : '-'}</td>;
  }, [Cts]);

  const pricePerCtsViewTd = useMemo(() => {
    return <td>{Price ? Price : ''}</td>;
  }, [Price]);

  const pcsViewTd = useMemo(() => {
    return <td>{Pcs ? Pcs : '0'}</td>;
  }, [Pcs]);

  const locationList = useMemo(() => {
    return <td>{Location ? Location : '-'}</td>;
  }, [Location]);

  const renderRow = useMemo(() => {
    return (
      <tr className="center_all_td">
        {checkBoxViewTd}
        {imageViewTd}
        {shapeViewTd}
        {sizeViewTd}
        {colorViewTd}
        {clarityViewTd}
        {growthTypeViewTd}
        {ctsViewTd}
        {pricePerCtsViewTd}
        {pcsViewTd}
        {locationList}
      </tr>
    );
  }, [
    checkBoxViewTd,
    imageViewTd,
    shapeViewTd,
    sizeViewTd,
    colorViewTd,
    clarityViewTd,
    growthTypeViewTd,
    ctsViewTd,
    pricePerCtsViewTd,
    pcsViewTd,
    locationList,
  ]);

  return <>{renderRow}</>;
};
