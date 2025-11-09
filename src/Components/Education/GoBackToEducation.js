import React, { memo, useMemo } from 'react';
import LeftAngel from '../../Assets/Images/left-angle.svg';
import { useNavigate } from 'react-router-dom';

const GoBackToEducation = () => {
  const navigate = useNavigate();
  const goBackTag = useMemo(() => {
    return (
      <div
        className="back_arrow ff_Mulish"
        onClick={() => navigate('/education')}
      >
        <img src={LeftAngel} alt="LeftAngel" />
        Back to Education
      </div>
    );
  }, [navigate]);
  return <>{goBackTag}</>;
};
export default memo(GoBackToEducation);
