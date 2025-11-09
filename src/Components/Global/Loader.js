import React, { memo } from 'react';
import LogoIcon from '../../Assets/Images/logo-icon.svg';
import { OptimizedImage } from 'utils/performanceUtils';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader_inner">
        <img src={LogoIcon} alt="" />
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
export default memo(Loader);
