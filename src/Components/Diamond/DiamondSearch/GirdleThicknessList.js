import React, { memo, useCallback, useEffect } from 'react';
import { Form } from 'react-bootstrap';
function GirdleThicknessList({
  values,
  dispatch,
  setFieldValue,
  diamondFilterData,
  diamondFilterDetail,
  setDiamondFilterData,
  searchDiamondSavedData,
  setSearchDiamondSavedData,
}) {
  useEffect(() => {
    let slider = document.querySelector('.scroll_wrapper12');
    let isDown = false;
    let startX;
    let scrollLeft;
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
  }, []);
  const handlegridleThickToggle = useCallback(
    id => {
      setDiamondFilterData({
        ...diamondFilterData,
        gridleThickList: diamondFilterData.gridleThickList.map(item => {
          if (item.Display_Order === id) {
            return { ...item, classToggle: !item.classToggle };
          }
          return item;
        }),
      });
    },
    [diamondFilterData, setDiamondFilterData],
  );
  return (
    <div className="filter_box mt0 mt5-xl mb20 mb5-xl">
      <h6 className="mb20 mb5-xl ff_Mulish">Girdle Thickness</h6>
      <div className="check_input_wraper small">
        <ul className="scroll_wrapper12 flex-nowrap">
          {diamondFilterDetail?.gridleThickList?.map((item, index) => {
            return (
              <li key={`gridle_thickness_${index}`}>
                <div className="checkbox_wrapper">
                  <Form.Check
                    type="checkbox"
                    id={item.MasterTypeValue_Code}
                    name={item.MasterTypeValue_Code}
                    label={item.MasterTypeValue_Code}
                    checked={item.classToggle}
                    readOnly
                    onClick={e => {
                      const { checked } = e.target;
                      handlegridleThickToggle(item.Display_Order);
                      if (checked) {
                        if (
                          values.girdleThick.includes(item.MasterTypeValue_Code)
                        ) {
                          const newarr = values.girdleThick.filter(
                            item2 => item2 !== item.MasterTypeValue_Code,
                          );
                          setFieldValue('girdleThick', newarr);
                          dispatch(
                            setSearchDiamondSavedData({
                              ...searchDiamondSavedData,
                              girdleThick: newarr?.toString(),
                            }),
                          );
                        } else {
                          setFieldValue('girdleThick', [
                            ...values.girdleThick,
                            item.MasterTypeValue_Code,
                          ]);
                        }
                        dispatch(
                          setSearchDiamondSavedData({
                            ...searchDiamondSavedData,
                            girdleThick: [
                              ...values.girdleThick,
                              item.MasterTypeValue_Code,
                            ].toString(),
                          }),
                        );
                      } else {
                        setFieldValue(
                          'girdleThick',
                          values.girdleThick.filter(
                            v => v !== item.MasterTypeValue_Code,
                          ),
                        );
                        dispatch(
                          setSearchDiamondSavedData({
                            ...searchDiamondSavedData,
                            girdleThick: values.girdleThick
                              .filter(v => v !== item.MasterTypeValue_Code)
                              .toString(),
                          }),
                        );
                      }
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default memo(GirdleThicknessList);
