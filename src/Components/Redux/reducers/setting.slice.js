import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chooseStepSelect: 1,
  selectedDiamondForSetting: {},
  selectedJewelleryForSetting: {},
  isDiamondSearchSettingWise: false,
  isResetDiamondFilter: false,
  isResetDiamondWiseSettingFilter: false,
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setChooseStepSelect: (state, action) => {
      state.chooseStepSelect = action.payload;
    },
    setIsResetDiamondFilter: (state, action) => {
      state.isResetDiamondFilter = action.payload;
    },
    setSelectedDiamondForSetting: (state, action) => {
      state.selectedDiamondForSetting = action.payload;
    },
    setSelectedJewelleryForSetting: (state, action) => {
      state.selectedJewelleryForSetting = action.payload;
    },
    setIsDiamondSearchSettingWise: (state, action) => {
      state.isDiamondSearchSettingWise = action.payload;
    },
    setIsResetDiamondWiseSettingFilter: (state, action) => {
      state.isResetDiamondWiseSettingFilter = action.payload;
    },
  },
  extraReducers: {},
});
export const {
  setChooseStepSelect,
  setIsResetDiamondFilter,
  setSelectedDiamondForSetting,
  setIsDiamondSearchSettingWise,
  setSelectedJewelleryForSetting,
  setIsResetDiamondWiseSettingFilter,
} = settingSlice.actions;

export default settingSlice.reducer;
