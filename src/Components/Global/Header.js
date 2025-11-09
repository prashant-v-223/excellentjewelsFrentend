import {
  getDiamondDetailList,
  setIsMixGetStockApiRefresh,
} from 'Components/Redux/reducers/common.slice';
import {
  getCartStockCount,
  setIsFancyColor,
  setIsModifySearchForDiamond,
  setIsRefreshSearchApi,
  setSearchDiamondSavedData,
} from 'Components/Redux/reducers/dashboard.slice';
import {
  getJewelleryBaseMetal,
  getJewelleryCategoryList,
  getJewelleryMainCategoryList,
  getJewelleryParameterListByName,
  setIsModifySearchForJewellery,
  setIsSearchForJewellerySettingWise,
  setHipHopJewelleryFilterDetailByHeader,
} from 'Components/Redux/reducers/jewellery.slice';
import { getWatchStockListCount } from 'Components/Redux/reducers/myAccount.slice';
import { setDiamondType } from 'Components/Redux/reducers/offlineList.slice';
import {
  setChooseStepSelect,
  setIsDiamondSearchSettingWise,
  setIsResetDiamondFilter,
  setIsResetDiamondWiseSettingFilter,
  setSelectedDiamondForSetting,
  setSelectedJewelleryForSetting,
} from 'Components/Redux/reducers/setting.slice';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Container, Dropdown, Modal, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AddCart from '../../Assets/Images/cart.svg';
import DownArrow from '../../Assets/Images/down-arrow.svg';
import {
  default as LogoDark,
  default as LogoLight,
} from '../../Assets/Images/header-logo.svg';
import NoImageAvailable from '../../Assets/Images/notfound2.png';
import LogoMobile from '../../Assets/Images/responsive-logo.png';
// import UserImg from '../../Assets/Images/user.png';
import UserImg from '../../Assets/Images/user-icon.svg';
import WishList from '../../Assets/Images/wishliat.svg';
import { logout, setIsLogout } from '../Redux/reducers/auth.slice';
import {
  getPayload,
  initialValuesForDiamondSearch,
} from './../../Helper/CommonHelper';
import { DiamondHeaderMenu } from './DiamondHeaderMenu';
import { JewelleryHeaderMenu } from './JewelleryHeaderMenu';
import { setIsJewelleryGetApi } from 'Components/Redux/reducers/jewellery.slice';
import { setJewelleryFilterDetailByHeader } from 'Components/Redux/reducers/jewellery.slice';
import { getWebConfigurationType } from 'Components/Redux/reducers/common.slice';
import CloseIcon from '../../Assets/Images/close-btn.svg';
import { getCurrentEventsList } from 'Components/Redux/reducers/order.slice';
import { OptimizedImage } from 'utils/performanceUtils';

const Header = () => {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [bannerImagePopUp, setBannerImagePopUp] = useState('');

  const { diamondFilterDetail } = useSelector(({ common }) => common);
  const { selectedDiamondForSetting, selectedJewelleryForSetting } =
    useSelector(({ setting }) => setting);
  const { userData, isLogin, isLogout } = useSelector(({ auth }) => auth);
  const {
    totalCart,
    isRefreshSearchApi,
    isModifySearchForDiamond,
    searchDiamondSavedData,
    searchDiamondFilterList2 = new Map(),
  } = useSelector(({ dashboard }) => dashboard);
  const { countOfWatchList } = useSelector(({ myAccount }) => myAccount);
  const {
    jewelleryCategoryDetail,
    isJewelleryGetApi,
    jewelleryFilterDetailByHeader,
  } = useSelector(({ jewellery }) => jewellery);
  const {
    diamondType,
    cartDiamondList,
    wishDiamondList,
    wishMixDiamondList,
    cartMixDiamondList,
    jewelleryCartListData,
    jewelleryWatchListData,
  } = useSelector(({ offlineList }) => offlineList);

  const [navbarHideShow, setNavbarHideShow] = useState(false);

  const [isDiamondDropdownHovered, setIsDiamondDropdownHovered] =
    useState(false);

  const [isJewelleryDropdownHovered, setIsJewelleryDropdownHovered] =
    useState(false);
  const [
    isHipHopJewelleryDropdownHovered,
    setIsHipHopJewelleryDropdownHovered,
  ] = useState(false);

  const [accountMenu, setAccountMenu] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleDiamondMouseEnter = useCallback(() => {
    setIsDiamondDropdownHovered(true);
  }, []);

  const handleDiamondMouseLeave = useCallback(() => {
    setIsDiamondDropdownHovered(false);
  }, []);

  const handleJewelleryMouseEnter = useCallback(() => {
    setIsJewelleryDropdownHovered(true);
  }, []);

  const handleJewelleryMouseLeave = useCallback(() => {
    setIsJewelleryDropdownHovered(false);
  }, []);

  const handleHipHopJewelleryMouseEnter = useCallback(() => {
    setIsHipHopJewelleryDropdownHovered(true);
  }, []);

  const handleHipHopJewelleryMouseLeave = useCallback(() => {
    setIsHipHopJewelleryDropdownHovered(false);
  }, []);

  const handleClickOutside = useCallback(event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setAccountMenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsSmallScreen(window.innerWidth <= 767);
    };
    window.addEventListener('resize', checkScreenWidth);
    checkScreenWidth();
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  useEffect(() => {
    let scrollpos = window.scrollY;
    const header = document.querySelector('header');
    const header_height = header.offsetHeight;
    const add_class_on_scroll = () => header.classList.add('fixed');
    const remove_class_on_scroll = () => header.classList.remove('fixed');
    window.addEventListener('scroll', function () {
      scrollpos = window.scrollY;
      if (scrollpos >= header_height) {
        add_class_on_scroll();
      } else {
        remove_class_on_scroll();
      }
      if (scrollpos >= 400) {
        header.classList.add('fixed_header');
      } else {
        header.classList.remove('fixed_header');
      }
    });
  }, []);

  const getEventDetail = async () => {
    const { payload } = await dispatch(getCurrentEventsList());

    if (payload?.data?.length > 0) {
      setBannerImagePopUp(payload?.data?.[0]?.Img_Url);
      setShow(true);
    }
  };

  useEffect(() => {
    dispatch(
      getDiamondDetailList(
        'SHAPE, COLOR, CLARITY, CUT, POLISH, SYMMETRY, LOCATION, LAB, FLUROINT, MAKE, FC, FCINTESE, FCOVERTON, GIRDLE, NATURE OF ORG, MIXSHAPE, MIXCOLOR, MIXQUALITY, MIXCUT, LOCATION, GROWTHTYPE',
      ),
    );
    dispatch(getWebConfigurationType());
    dispatch(getJewelleryCategoryList());
    dispatch(getJewelleryBaseMetal());
    dispatch(getJewelleryParameterListByName('SHAPE, LOCATION'));
    getEventDetail();
    dispatch(getJewelleryMainCategoryList());
  }, [dispatch]);

  const totalItemInCart = useMemo(() => {
    if (userData?.UserID) {
      return totalCart;
    } else {
      let totalInCart = 0;
      totalInCart += cartDiamondList?.labGrownDiamond.length || 0;
      totalInCart += cartDiamondList?.naturalDiamond.length || 0;
      totalInCart += cartMixDiamondList?.labGrownDiamond.length || 0;
      totalInCart += cartMixDiamondList?.naturalDiamond.length || 0;
      totalInCart += jewelleryCartListData?.length || 0;
      return totalInCart || 0;
    }
  }, [
    userData,
    totalCart,
    cartDiamondList,
    cartMixDiamondList,
    jewelleryCartListData,
  ]);

  const totalItemInWatchList = useMemo(() => {
    if (userData?.UserID) {
      return countOfWatchList;
    } else {
      let totalInWatchList = 0;
      totalInWatchList += wishMixDiamondList?.labGrownDiamond.length || 0;
      totalInWatchList += wishMixDiamondList?.naturalDiamond.length || 0;
      totalInWatchList += wishDiamondList?.labGrownDiamond.length || 0;
      totalInWatchList += wishDiamondList?.naturalDiamond.length || 0;
      totalInWatchList += jewelleryWatchListData?.length || 0;
      return totalInWatchList || 0;
    }
  }, [
    userData,
    countOfWatchList,
    wishDiamondList,
    wishMixDiamondList,
    jewelleryWatchListData,
  ]);

  useEffect(() => {
    if (location.pathname !== '/cart' && userData?.UserID) {
      dispatch(getCartStockCount({ UserID: userData?.UserID }));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (location.pathname !== 'watchlist' && userData?.UserID) {
      dispatch(getWatchStockListCount({ UserID: userData?.UserID }));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (isLogout) {
      navigate('/login');
      dispatch(setIsLogout(false));
    }
  }, [isLogout, navigate, dispatch]);

  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);

  const educationUrl = [
    '/education',
    '/education/4cs-diamond',
    '/education/what-are-lab-grown-diamonds',
    '/education/how-are-lab-grown-diamonds-created',
    '/education/chemical-vapor-deposition',
    '/education/cvd-diamond-vs-hpht-diamond',
    '/education/natural-diamond-vs-lab-grown-diamond',
    '/education/advantages-of-lab-grown-diamonds',
    '/education/choosing-the-perfect-engagement-ring',
    '/education/caring-for-your-lab-grown-diamond-jewelry',
    '/education/high-pressure-high-temperature',
    '/education/diamond-mm-to-carat-weight-chats',
  ];
  const shapeListForHeader = useMemo(() => {
    const shapeList =
      diamondFilterDetail?.shapeList?.length > 0
        ? diamondFilterDetail?.shapeList.slice(0, 10)
        : [];
    return shapeList;
  }, [diamondFilterDetail]);

  const onDiamondTypeSelected = useCallback(
    (diamondTypeValues, colorTypeValues) => {
      dispatch(setDiamondType(diamondTypeValues));
      dispatch(setIsFancyColor(colorTypeValues));
      let newObj = getPayload({
        ...initialValuesForDiamondSearch,
        diamondType: diamondTypeValues,
        colorType: colorTypeValues,
      });
      !isRefreshSearchApi && dispatch(setIsRefreshSearchApi(true));
      dispatch(setSearchDiamondSavedData({ ...newObj }));
      dispatch(setIsModifySearchForDiamond(true));
      navigate('/diamond');
    },
    [dispatch, navigate, isRefreshSearchApi],
  );

  const onShapeSelectHandler = useCallback(
    (diamondTypeValues, shapeValues) => {
      if (Object.keys(shapeValues)?.length > 0) {
        let newObj = getPayload({
          ...initialValuesForDiamondSearch,
          diamondType: diamondTypeValues,
          colorType: 1,
          shape: shapeValues.MasterTypeValue_Code,
        });
        !isRefreshSearchApi && dispatch(setIsRefreshSearchApi(true));
        dispatch(setDiamondType(diamondTypeValues));
        dispatch(setSearchDiamondSavedData({ ...newObj }));
        dispatch(setIsModifySearchForDiamond(true));
        navigate('/diamond');
      }
    },
    [dispatch, navigate, isRefreshSearchApi],
  );

  const onColorSelectHandler = useCallback(
    (diamondTypeValues, colorValues) => {
      if (colorValues && diamondTypeValues) {
        let newObj = getPayload({
          ...initialValuesForDiamondSearch,
          diamondType: diamondTypeValues,
          colorType: 2,
          fancyColor: [{ label: colorValues, value: colorValues }],
        });
        !isRefreshSearchApi && dispatch(setIsRefreshSearchApi(true));
        dispatch(setSearchDiamondSavedData({ ...newObj }));
        dispatch(setIsModifySearchForDiamond(true));
        navigate('/diamond');
      }
    },
    [dispatch, navigate, isRefreshSearchApi],
  );
  const onJewelleryTypeSelected = useCallback(
    (type, jewelleryType) => {
      if (type?.MasterTypeValue_Code) {
        dispatch(
          setHipHopJewelleryFilterDetailByHeader({
            type: type.MasterTypeValue_Code,
            subType: [],
          }),
        );
        dispatch(setIsModifySearchForJewellery(true));
        navigate(
          jewelleryType === 'fineJewellery'
            ? '/jewellery'
            : '/hip-hop-jewellery',
        );
      } else if (type === 'View All') {
        dispatch(
          setHipHopJewelleryFilterDetailByHeader({
            type: '',
            subType: [],
          }),
        );
        dispatch(setIsModifySearchForJewellery(true));
        navigate(
          jewelleryType === 'fineJewellery'
            ? '/jewellery'
            : '/hip-hop-jewellery',
        );
      }
    },
    [dispatch, navigate],
  );

  const onJewellerySubTypeSelected = useCallback(
    (type, subType, jewelleryType) => {
      if (type?.MasterTypeValue_Code && subType.MasterSubTypeValue_Code) {
        dispatch(
          setHipHopJewelleryFilterDetailByHeader({
            type: type.MasterTypeValue_Code,
            subType: [subType.MasterSubTypeValue_Code],
          }),
        );
        dispatch(setIsModifySearchForJewellery(true));
        navigate(
          jewelleryType === 'fineJewellery'
            ? '/jewellery'
            : '/hip-hop-jewellery',
        );
      }
    },
    [dispatch, navigate],
  );

  const clearSelectedSetting = useCallback(() => {
    Object.keys(selectedDiamondForSetting)?.length > 0 &&
      dispatch(setSelectedDiamondForSetting({}));
    Object.keys(selectedJewelleryForSetting)?.length > 0 &&
      dispatch(setSelectedJewelleryForSetting({}));
  }, [dispatch, selectedDiamondForSetting, selectedJewelleryForSetting]);

  const startWithSettingWise = useCallback(() => {
    Object?.keys(searchDiamondSavedData)?.length > 0 &&
      dispatch(setSearchDiamondSavedData(''));
    isModifySearchForDiamond && dispatch(setIsModifySearchForDiamond(false));
    !isRefreshSearchApi && dispatch(setIsRefreshSearchApi(true));
    dispatch(setIsDiamondSearchSettingWise(false));
    dispatch(setIsSearchForJewellerySettingWise(false));
    dispatch(setChooseStepSelect(1));
    clearSelectedSetting();
    navigate('/setting-jewellery-wise');
  }, [
    navigate,
    dispatch,
    isRefreshSearchApi,
    clearSelectedSetting,
    searchDiamondSavedData,
    isModifySearchForDiamond,
  ]);

  const startWithLabGrownDiamondSetting = useCallback(() => {
    window.location.pathname === '/setting-diamond-wise' &&
      dispatch(setIsResetDiamondWiseSettingFilter(true));
    dispatch(setChooseStepSelect(1));
    dispatch(setDiamondType('LABGROWN'));
    let newObj = getPayload({
      ...initialValuesForDiamondSearch,
      diamondType: 'LABGROWN',
    });
    dispatch(setSearchDiamondSavedData({ ...newObj }));
    dispatch(setIsModifySearchForDiamond(true));
    !isRefreshSearchApi && dispatch(setIsRefreshSearchApi(true));
    clearSelectedSetting();
    navigate('/setting-diamond-wise');
  }, [navigate, dispatch, isRefreshSearchApi, clearSelectedSetting]);

  const startWithNaturalDiamondSetting = useCallback(() => {
    if (window.location.pathname === '/setting-diamond-wise') {
      searchDiamondFilterList2?.size > 0 &&
        dispatch(setIsResetDiamondFilter(true));
      dispatch(setIsResetDiamondWiseSettingFilter(true));
    } else {
      dispatch(setIsRefreshSearchApi(true));
      dispatch(setIsDiamondSearchSettingWise(false));
    }
    if (window.location.pathname === '/diamond') {
      dispatch(setIsResetDiamondWiseSettingFilter(true));
    }
    dispatch(setChooseStepSelect(1));
    dispatch(setDiamondType('NATURAL'));
    let newObj = getPayload({
      ...initialValuesForDiamondSearch,
      diamondType: 'NATURAL',
    });
    dispatch(setSearchDiamondSavedData({ ...newObj }));
    dispatch(setIsModifySearchForDiamond(true));
    clearSelectedSetting();
    navigate('/setting-diamond-wise');
  }, [navigate, dispatch, clearSelectedSetting, searchDiamondFilterList2]);

  return (
    <>
      <header
        className={
          (location.pathname === '/' || location.pathname === '/about-us') &&
          !isSmallScreen
            ? 'header_white'
            : ''
        }
      >
        <div className="top-header">
          <Navbar expand="xl">
            <Container>
              <ul className="button_right_wrapper ml0  d-none d-xl-flex">
                <li>
                  <Button
                    className="btn_transperent"
                    onClick={() => navigate('/cart')}
                  >
                    <img src={AddCart} alt="AddCartIcon" className="icon" />
                    <span>{totalItemInCart}</span>
                  </Button>
                </li>
                <li>
                  <Button
                    className="btn_transperent"
                    onClick={() => navigate('/watchlist')}
                  >
                    <img src={WishList} alt="WishListIcon" className="icon" />
                    <span>{totalItemInWatchList}</span>
                  </Button>
                </li>
              </ul>
              <Button
                variant="link"
                className={
                  !navbarHideShow
                    ? 'navbar-toggler order-first collapsed d-block d-xl-none'
                    : 'navbar-toggler order-first'
                }
                onClick={() => setNavbarHideShow(!navbarHideShow)}
              >
                <span className="navbar-toggler-icon"></span>
              </Button>
              <Link to="/" className="navbar-brand">
                <img
                  src={LogoDark}
                  alt=""
                  className="logo_dark"
                  loading="lazy"
                />
                <img
                  src={LogoLight}
                  alt=""
                  className="logo_white"
                  loading="lazy"
                />
                <img
                  src={LogoMobile}
                  alt=""
                  className="logo_mobile"
                  loading="lazy"
                />
              </Link>
              <div className="right_header_wrap d-flex align-items-center">
                <ul className="button_right_wrapper ml20 ">
                  <li className="d-block d-xl-none">
                    <Button
                      className="btn_transperent"
                      onClick={() => navigate('/cart')}
                    >
                      <img src={AddCart} alt="AddCartIcon" className="icon" />
                      <span>{totalItemInCart}</span>
                    </Button>
                  </li>
                  <li className="d-block d-xl-none">
                    <Button
                      className="btn_transperent"
                      onClick={() => navigate('/watchlist')}
                    >
                      <img src={WishList} alt="WishListIcon" className="icon" />
                      <span>{totalItemInWatchList}</span>
                    </Button>
                  </li>
                  {!isLogin ? (
                    <>
                      <li className="me-2 d-none d-xl-block">
                        <Button
                          className="btn-primary"
                          size="sm"
                          onClick={() => navigate('/sign-up')}
                        >
                          Sign Up
                        </Button>
                      </li>
                      <li className="me-2">
                        <Button
                          className="btn-outline-primary"
                          size="sm"
                          onClick={() => navigate('/login')}
                        >
                          Sign In
                        </Button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Dropdown
                        className="user_dropdown"
                        ref={dropdownRef}
                        show={accountMenu}
                        onClick={() => setAccountMenu(true)}
                      >
                        <Dropdown.Toggle
                          variant="link"
                          id="dropdown-basic"
                          className="btn_transperent"
                        >
                          <img src={UserImg} alt="" className="icon" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Link
                            className="dropdown-item"
                            to="edit-profile"
                            onClick={() => {
                              setTimeout(() => {
                                setAccountMenu(false);
                              }, 100);
                            }}
                          >
                            My Account
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="/cart"
                            onClick={() => {
                              setTimeout(() => {
                                setAccountMenu(false);
                              }, 100);
                            }}
                          >
                            My Cart List
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="/my-hold-list"
                            onClick={() => {
                              setTimeout(() => {
                                setAccountMenu(false);
                              }, 100);
                            }}
                          >
                            My Hold List
                          </Link>
                          <Link
                            className="dropdown-item"
                            onClick={() => {
                              dispatch(logout({ UserID: userData.UserID }));
                              setTimeout(() => {
                                setAccountMenu(false);
                              }, 100);
                            }}
                          >
                            Logout
                          </Link>
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                  )}
                </ul>
              </div>
            </Container>
          </Navbar>
        </div>
        <div className="menu-header">
          <Navbar expand="xl">
            <Container>
              <Navbar
                id="navbarScroll"
                className={navbarHideShow ? 'show' : 'hide'}
              >
                <ul>
                  <li>
                    <Link
                      to="/"
                      className={location.pathname === '/' ? 'active' : ''}
                      onClick={() => setNavbarHideShow(!navbarHideShow)}
                    >
                      Home
                    </Link>
                  </li>
                  <li
                    className="megamenu_Wrapper"
                    onMouseEnter={handleDiamondMouseEnter}
                    onMouseLeave={handleDiamondMouseLeave}
                  >
                    <Link
                      to="/diamond"
                      className={
                        location.pathname === '/diamond' ||
                        location.pathname === '/diamond-detail'
                          ? 'active'
                          : ''
                      }
                      onClick={() => {
                        setNavbarHideShow(!navbarHideShow);
                        setIsDiamondDropdownHovered(false);
                        onDiamondTypeSelected(diamondType, 1);
                      }}
                    >
                      Diamonds
                    </Link>
                    <div className="mobile_toggle_button">
                      <button
                        className="btn_arrow"
                        onClick={() =>
                          setIsDiamondDropdownHovered(!isDiamondDropdownHovered)
                        }
                      >
                        <img src={DownArrow} className="me-0" alt="" />
                      </button>
                    </div>
                    {isDiamondDropdownHovered && (
                      <div className="megamenu_diamond_wrapper">
                        <DiamondHeaderMenu
                          handleImageError={handleImageError}
                          shapeListForHeader={shapeListForHeader}
                          onColorSelectHandler={onColorSelectHandler}
                          onShapeSelectHandler={onShapeSelectHandler}
                          onDiamondTypeSelected={onDiamondTypeSelected}
                          setNavbarHideShow={setNavbarHideShow}
                          navbarHideShow={navbarHideShow}
                          className=""
                        />
                      </div>
                    )}
                  </li>
                  <li
                    className="megamenu_Wrapper"
                    onMouseEnter={handleJewelleryMouseEnter}
                    onMouseLeave={handleJewelleryMouseLeave}
                  >
                    <Link
                      to="/jewellery"
                      className={
                        location.pathname === '/jewellery' ||
                        location.pathname === '/jewellery-detail' ||
                        location.pathname === '/setting-diamond-wise' ||
                        location.pathname === '/setting-jewellery-wise'
                          ? 'active'
                          : ''
                      }
                      onClick={() => {
                        Object.keys(jewelleryFilterDetailByHeader)?.length >
                          0 && dispatch(setJewelleryFilterDetailByHeader({}));

                        !isJewelleryGetApi &&
                          dispatch(setIsJewelleryGetApi(true));

                        setNavbarHideShow(!navbarHideShow);
                        setIsJewelleryDropdownHovered(false);
                      }}
                    >
                      Fine Jewellery
                    </Link>
                    <div className="mobile_toggle_button">
                      <button
                        className="btn_arrow"
                        onClick={() =>
                          setIsJewelleryDropdownHovered(
                            !isJewelleryDropdownHovered,
                          )
                        }
                      >
                        <img src={DownArrow} className="me-0" alt="" />
                      </button>
                    </div>
                    {isJewelleryDropdownHovered && (
                      <div className="megamenu_diamond_wrapper">
                        <JewelleryHeaderMenu
                          jewelleryType="fineJewellery"
                          startWithSettingWise={startWithSettingWise}
                          jewelleryListForHeader={jewelleryCategoryDetail}
                          onJewelleryTypeSelected={onJewelleryTypeSelected}
                          onJewellerySubTypeSelected={
                            onJewellerySubTypeSelected
                          }
                          startWithLabGrownDiamondSetting={
                            startWithLabGrownDiamondSetting
                          }
                          categryType="fine"
                          startWithNaturalDiamondSetting={
                            startWithNaturalDiamondSetting
                          }
                        />
                      </div>
                    )}
                  </li>
                  <li
                    className="megamenu_Wrapper"
                    onMouseEnter={handleHipHopJewelleryMouseEnter}
                    onMouseLeave={handleHipHopJewelleryMouseLeave}
                  >
                    <Link
                      to="/hip-hop-jewellery"
                      className={
                        location.pathname === '/hip-hop-jewellery' ||
                        location.pathname === '/hip-hop-jewellery-detail'
                          ? 'active'
                          : ''
                      }
                      onClick={() => {
                        Object.keys(jewelleryFilterDetailByHeader)?.length >
                          0 && dispatch(setJewelleryFilterDetailByHeader({}));

                        !isJewelleryGetApi &&
                          dispatch(setIsJewelleryGetApi(true));

                        setNavbarHideShow(!navbarHideShow);
                        setIsHipHopJewelleryDropdownHovered(false);
                      }}
                    >
                      Hip Hop Jewellery
                    </Link>
                    <div className="mobile_toggle_button">
                      <button
                        className="btn_arrow"
                        onClick={() =>
                          setIsHipHopJewelleryDropdownHovered(
                            !isHipHopJewelleryDropdownHovered,
                          )
                        }
                      >
                        <img src={DownArrow} className="me-0" alt="" />
                      </button>
                    </div>
                    {isHipHopJewelleryDropdownHovered && (
                      <div className="megamenu_diamond_wrapper">
                        <JewelleryHeaderMenu
                          startWithSettingWise={startWithSettingWise}
                          jewelleryListForHeader={jewelleryCategoryDetail}
                          onJewelleryTypeSelected={onJewelleryTypeSelected}
                          onJewellerySubTypeSelected={
                            onJewellerySubTypeSelected
                          }
                          startWithLabGrownDiamondSetting={
                            startWithLabGrownDiamondSetting
                          }
                          startWithNaturalDiamondSetting={
                            startWithNaturalDiamondSetting
                          }
                        />
                      </div>
                    )}
                  </li>
                  {/* <li>
                    <Link
                      to="/parcel-goods"
                      className={
                        location.pathname === '/parcel-goods' ? 'active' : ''
                      }
                      onClick={() => {
                        if (location.pathname !== '/parcel-goods')
                          dispatch(setIsMixGetStockApiRefresh(true));
                        setNavbarHideShow(!navbarHideShow);
                      }}
                    >
                      Parcel Goods
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      to="/share-demand"
                      className={
                        location.pathname === '/share-demand' ? 'active' : ''
                      }
                      onClick={() => setNavbarHideShow(!navbarHideShow)}
                    >
                      Share Demand
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/events"
                      className={
                        location.pathname === '/events' ? 'active' : ''
                      }
                      onClick={() => setNavbarHideShow(!navbarHideShow)}
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/education"
                      className={
                        educationUrl.includes(location.pathname) ? 'active' : ''
                      }
                      onClick={() => setNavbarHideShow(!navbarHideShow)}
                    >
                      Education
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact-us"
                      className={
                        location.pathname === '/contact-us' ? 'active' : ''
                      }
                      onClick={() => setNavbarHideShow(!navbarHideShow)}
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
                <Button
                  variant="link"
                  className="navbar-toggler header_close_icon me-0"
                  onClick={() => setNavbarHideShow(!navbarHideShow)}
                >
                  <span className="navbar-toggler-icon"></span>
                </Button>
              </Navbar>
            </Container>
          </Navbar>
        </div>
        <span
          className={navbarHideShow ? 'shadow_show' : ''}
          onClick={() => setNavbarHideShow(!navbarHideShow)}
        ></span>
      </header>
      <Modal
        className="main_modal"
        size="lg"
        show={show}
        onHide={() => {
          setShow(false);
          setBannerImagePopUp('');
        }}
        centered
        backdrop="static"
      >
        <Modal.Body className="position-relative body_modal">
          <div
            className="close_btn position-absolute"
            onClick={() => {
              setShow(false);
              setBannerImagePopUp('');
            }}
          >
            <img src={CloseIcon} alt="" />
          </div>
          <div className="modal_image">
            <img src={bannerImagePopUp} alt="" onError={handleImageError} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default memo(Header);
