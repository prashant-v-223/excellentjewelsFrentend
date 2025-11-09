import { memo, useCallback, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import NoImageAvailable from '../../Assets/Images/notfound2.png';

const MixWatchListTableData = ({
  currentData,
  onSelectDiamond,
  onClickToMixDiamondDetail,
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
            <th>Image</th>
            <th>Packet Name</th>
            <th>Shape</th>
            <th>Color</th>
            <th>Size</th>
            <th>Clarity</th>
            <th>Cut</th>
            <th>Growth Type</th>
            <th>Carat</th>
            <th>Price</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((x, i) => {
            return (
              <MixWatchListItemContainer
                {...x}
                key={i}
                index={i}
                row={x}
                onSelectDiamond={onSelectDiamond}
                handleImageError={handleImageError}
                onClickToMixDiamondDetail={onClickToMixDiamondDetail}
              />
            );
          })}
        </tbody>
      </table>
    );
  }, [
    currentData,
    onSelectDiamond,
    handleImageError,
    onClickToMixDiamondDetail,
  ]);
  return <>{renderTable}</>;
};

const MixWatchListItemContainer = ({
  Cut,
  Cts,
  row,
  Size,
  Image,
  index,
  Color,
  Shape,
  Quality,
  CVDHPHT,
  isCheck,
  Packet_Id,
  Packet_Name,
  Running_Price,
  onSelectDiamond,
  handleImageError,
  onClickToMixDiamondDetail,
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
          onClick={e => onSelectDiamond(row, 'Packet_Id')}
        />
      </td>
    );
  }, [isCheck, onSelectDiamond, row]);

  const diamondImageTd = useMemo(() => {
    return (
      <td>
        <div
          className="diamond_list_img"
          onClick={() => onClickToMixDiamondDetail(Packet_Id)}
        >
          <img
            src={Image ? Image : NoImageAvailable}
            alt="diamond"
            onError={handleImageError}
          />
        </div>
      </td>
    );
  }, [Image, Packet_Id, handleImageError, onClickToMixDiamondDetail]);

  const shapeTd = useMemo(() => {
    return <td>{Shape ? Shape : '-'}</td>;
  }, [Shape]);

  const sizeTd = useMemo(() => {
    return <td>{Size ? Size : '-'}</td>;
  }, [Size]);

  const colorTd = useMemo(() => {
    return <td>{Color ? Color : '-'}</td>;
  }, [Color]);

  const clarityTd = useMemo(() => {
    return <td>{Quality ? Quality : '-'}</td>;
  }, [Quality]);

  const cutTd = useMemo(() => {
    return <td>{Cut ? Cut : '-'}</td>;
  }, [Cut]);

  const priceTd = useMemo(() => {
    return <td>{Running_Price ? `$${Running_Price}` : '$0'}</td>;
  }, [Running_Price]);

  const packetNameTd = useMemo(() => {
    return <td>{Packet_Name ? Packet_Name : '-'}</td>;
  }, [Packet_Name]);

  const growthTypeTd = useMemo(() => {
    return <td>{CVDHPHT ? CVDHPHT : '-'}</td>;
  }, [CVDHPHT]);

  const caratTd = useMemo(() => {
    return <td>{Cts ? Cts : '-'}</td>;
  }, [Cts]);

  const locationList = useMemo(() => {
    return <td>{Location ? Location : '-'}</td>;
  }, [Location]);

  const renderRow = useMemo(() => {
    return (
      <>
        <tr key={index} className="center_all_td">
          {checkDiamondTd}
          {diamondImageTd}
          {packetNameTd}
          {shapeTd}
          {colorTd}
          {sizeTd}
          {clarityTd}
          {cutTd}
          {growthTypeTd}
          {caratTd}
          {priceTd}
          {locationList}
        </tr>
      </>
    );
  }, [
    index,
    cutTd,
    sizeTd,
    priceTd,
    shapeTd,
    caratTd,
    colorTd,
    clarityTd,
    growthTypeTd,
    packetNameTd,
    diamondImageTd,
    checkDiamondTd,
    locationList,
  ]);

  return <>{renderRow}</>;
};
export default memo(MixWatchListTableData);
