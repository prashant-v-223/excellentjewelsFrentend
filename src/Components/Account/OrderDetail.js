import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  getMyOrderDetail,
  setIsRefreshOrderDetailAPI,
} from 'Components/Redux/reducers/order.slice';
import { getUrlParam } from 'Helper/CommonHelper';
import arrowIcon from '../../Assets/Images/accordian-arrow.svg';
import AccountSidebar from './AccountSidebar';
import OrderDetailTable2 from './OrderDetailTable2';
import  './Order.css'

const OrderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector(({ auth }) => auth);
  const {
    myOrderDetail,
    myOrderListLoading,
    isRefreshOrderDetailAPI,
  } = useSelector(({ order }) => order);

  const [summaryToggle, setSummaryToggle] = useState({
    diamondTab: true,
    mixDiamondTab: true,
    jewelleryTab: true,
    settingTab: true,
  });

  useEffect(() => {
    const orderId = getUrlParam(window.location.search, 'orderId');
    if (isRefreshOrderDetailAPI && orderId && userData?.UserID) {
      const obj = {
        orderId: orderId,
        customerId: userData.UserID,
      };
      dispatch(getMyOrderDetail(obj));
    }
    return () => {
      if (
        window.location.pathname !== '/diamond-detail' &&
        window.location.pathname !== '/jewellery-detail' &&
        !isRefreshOrderDetailAPI
      ) {
        dispatch(setIsRefreshOrderDetailAPI(true));
      }
    };
  }, [dispatch, userData, isRefreshOrderDetailAPI]);

  const categorizedItems = useMemo(() => {
    if (!myOrderDetail?.items || !Array.isArray(myOrderDetail.items)) {
      return {
        diamonds: [],
        jewellery: [],
        mixDiamond: [],
        settings: [],
      };
    }

    return {
      diamonds: myOrderDetail.items.filter(item => item?.isDiamond === true),
      jewellery: myOrderDetail.items.filter(item => item?.isJewellery === true),
      mixDiamond: myOrderDetail.items.filter(item => item?.isMixDiamond === true),
      settings: myOrderDetail.items.filter(item => item?.isSetting === true),
    };
  }, [myOrderDetail?.items]);

  const orderSummary = useMemo(() => {
    const defaultSummary = {
      totalDiamondAmt: 0,
      totalJewelleryAmt: 0,
      totalCustomizeAmt: 0,
      totalMixAmt: 0,
      subtotal: 0,
    };

    if (!myOrderDetail?.items || !Array.isArray(myOrderDetail.items) || myOrderDetail.items.length === 0) {
      return defaultSummary;
    }

    const totalDiamondAmt = myOrderDetail.items
      .filter(item => item?.isDiamond === true)
      .reduce((sum, item) => sum + (Number(item.Cost_Amt) || 0), 0);

    const totalJewelleryAmt = myOrderDetail.items
      .filter(item => item?.isJewellery === true)
      .reduce((sum, item) => sum + (Number(item.Sale_Rate) || 0), 0);

    const totalMixAmt = myOrderDetail.items
      .filter(item => item?.isMixDiamond === true)
      .reduce((sum, item) => sum + (Number(item.Cost_Amt) || 0), 0);

    const subtotal = totalDiamondAmt + totalJewelleryAmt + totalMixAmt;

    return {
      totalDiamondAmt,
      totalJewelleryAmt,
      totalCustomizeAmt: 0,
      totalMixAmt,
      subtotal,
    };
  }, [myOrderDetail?.items]);

  const onClickToDiamondDetail = useCallback(
    (Stone_No, Diamond_Type) => {
      if (Stone_No && Diamond_Type) {
        navigate(
          `/diamond-detail?stoneNo=${Stone_No}&diamondType=${Diamond_Type}`,
          {
            state: {
              callbackUrl: `${location.pathname}${location.search}`,
            },
          },
        );
        dispatch(setIsRefreshOrderDetailAPI(false));
      }
    },
    [dispatch, navigate, location],
  );

  const onClickToJewelleryDetail = useCallback(
    (Jewellery_Stock_ID) => {
      if (Jewellery_Stock_ID) {
        navigate(`/jewellery-detail?stockId=${Jewellery_Stock_ID}`);
        dispatch(setIsRefreshOrderDetailAPI(false));
      }
    },
    [dispatch, navigate],
  );

  const handleChangeToggleTab = useCallback(
    (name, value) => {
      setSummaryToggle(prev => ({ ...prev, [name]: !value }));
    },
    [],
  );

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        bg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
        color: '#92400E',
        icon: '⏳',
        text: 'PENDING'
      },
      completed: {
        bg: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
        color: '#065F46',
        icon: '✓',
        text: 'COMPLETED'
      },
      shipped: {
        bg: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
        color: '#1E40AF',
        icon: '🚚',
        text: 'SHIPPED'
      },
      cancelled: {
        bg: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
        color: '#991B1B',
        icon: '✕',
        text: 'CANCELLED'
      }
    };
    return configs[status?.toLowerCase()] || configs.pending;
  };

  return (
    <main style={{ background: 'linear-gradient(180deg, #F8F9FA 0%, #E9ECEF 100%)', minHeight: '100vh' }}>
      <section style={{ padding: '2rem 0' }}>
        <div className="container-fluid">
          <Row>
            <Col xxl={2} lg={3} className="mb-4">
              <div style={{ position: 'sticky', top: '20px' }}>
                <AccountSidebar />
              </div>
            </Col>

            <Col xxl={10} lg={9}>
              <div>
                {/* Back Navigation */}
                <Link
                  to="/my-orders"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: '#6B7280',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    marginBottom: '1.5rem',
                    padding: '0.625rem 1.25rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.06)';
                  }}
                >
                  <img src={arrowIcon} alt="arrow" width="16" style={{ marginRight: '0.5rem' }} />
                  Go back to Order List
                </Link>

                {/* Order Header */}
                {!myOrderListLoading && myOrderDetail && (
                  <div
                    style={{
                      background: 'white',
                      borderRadius: '20px',
                      padding: '2rem',
                      marginBottom: '2rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '400px',
                      height: '100%',
                      background: 'radial-gradient(circle at 100% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }} />

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '1.5rem',
                      position: 'relative',
                    }}>
                      <div style={{ flex: 1, minWidth: '250px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                          <div style={{
                            width: '4px',
                            height: '48px',
                            background: 'linear-gradient(180deg, #3B82F6 0%, #2563EB 100%)',
                            borderRadius: '4px',
                          }} />
                          <div>
                            <h4 style={{
                              fontSize: '2rem',
                              fontWeight: '800',
                              margin: 0,
                              color: '#111827',
                              letterSpacing: '-0.02em',
                            }}>
                              Order #{myOrderDetail.orderId}
                            </h4>
                            <p style={{
                              margin: '0.375rem 0 0 0',
                              fontSize: '0.95rem',
                              color: '#6B7280',
                              fontWeight: 500,
                            }}>
                              Placed on {new Date(myOrderDetail.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {(() => {
                          const statusConfig = getStatusConfig(myOrderDetail.orderStatus);
                          return (
                            <div
                              style={{
                                background: statusConfig.bg,
                                color: statusConfig.color,
                                padding: '0.75rem 1.5rem',
                                borderRadius: '12px',
                                fontSize: '0.9rem',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: `2px solid ${statusConfig.color}20`,
                              }}
                            >
                              <span style={{ fontSize: '1.1rem' }}>{statusConfig.icon}</span>
                              {statusConfig.text}
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Order Stats Bar */}
                    {myOrderDetail.items && myOrderDetail.items.length > 0 && (
                      <div style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
                        borderRadius: '16px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '1.5rem',
                        border: '1px solid #E5E7EB',
                      }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Total Items
                          </div>
                          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#111827' }}>
                            {myOrderDetail.items.length}
                          </div>
                        </div>
                        {categorizedItems.diamonds.length > 0 && (
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Total Carats
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: '800', color: '#3B82F6' }}>
                              {categorizedItems.diamonds.reduce((sum, item) => sum + (Number(item.Weight) || 0), 0).toFixed(2)}
                            </div>
                          </div>
                        )}
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Order Total
                          </div>
                          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#10B981' }}>
                            ${(myOrderDetail?.payment?.finalAmount || 0).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <Row className="g-4">
                  <Col xxl={8} lg={7}>
                    {myOrderListLoading ? (
                      <div>
                        {[1, 2].map((item) => (
                          <div key={item} style={{ marginBottom: '1.5rem' }}>
                            <Skeleton height={150} style={{ borderRadius: '16px' }} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        {myOrderDetail && (
                          <OrderDetailTable2
                            summaryToggle={summaryToggle}
                            myOrderDetail={myOrderDetail}
                            currentData={myOrderDetail?.items || []}
                            categorizedItems={categorizedItems}
                            handleChangeToggleTab={handleChangeToggleTab}
                            onClickToDiamondDetail={onClickToDiamondDetail}
                            onClickToJewelleryDetail={onClickToJewelleryDetail}
                          />
                        )}

                        {/* Address & Tracking Section */}
                        {myOrderDetail && (myOrderDetail.billingAddress || myOrderDetail.shippingAddress || myOrderDetail.tracking) && (
                          <div style={{ marginTop: '2rem' }}>
                            <Row className="g-4">
                              {myOrderDetail.billingAddress && (
                                <Col md={6}>
                                  <div style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    padding: '1.75rem',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    border: '1px solid #E5E7EB',
                                    height: '100%',
                                  }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                      <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}>
                                        <svg width="20" height="20" fill="#3B82F6" viewBox="0 0 16 16">
                                          <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                                        </svg>
                                      </div>
                                      <h6 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '700', color: '#111827' }}>
                                        Billing Address
                                      </h6>
                                    </div>
                                    <div style={{
                                      background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
                                      padding: '1.25rem',
                                      borderRadius: '12px',
                                      border: '1px solid #E5E7EB',
                                    }}>
                                      {myOrderDetail.billingAddress.addressLine1 && (
                                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#374151', fontWeight: 500 }}>
                                          {myOrderDetail.billingAddress.addressLine1}
                                        </p>
                                      )}
                                      {myOrderDetail.billingAddress.addressLine2 && (
                                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#374151', fontWeight: 500 }}>
                                          {myOrderDetail.billingAddress.addressLine2}
                                        </p>
                                      )}
                                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#374151', fontWeight: 500 }}>
                                        {[myOrderDetail.billingAddress.city, myOrderDetail.billingAddress.state].filter(Boolean).join(', ')}
                                        {myOrderDetail.billingAddress.zipCode && `, ${myOrderDetail.billingAddress.zipCode}`}
                                      </p>
                                      {myOrderDetail.billingAddress.countryId && (
                                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#374151', fontWeight: 600 }}>
                                          {myOrderDetail.billingAddress.countryId}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </Col>
                              )}

                              <Col md={6}>
                                {myOrderDetail.shippingAddress && (
                                  <div style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    padding: '1.75rem',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    border: '1px solid #E5E7EB',
                                    marginBottom: myOrderDetail.tracking ? '1.5rem' : 0,
                                  }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                      <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}>
                                        <svg width="20" height="20" fill="#F59E0B" viewBox="0 0 16 16">
                                          <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                        </svg>
                                      </div>
                                      <h6 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '700', color: '#111827' }}>
                                        Shipping Address
                                      </h6>
                                    </div>
                                    <div style={{
                                      background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
                                      padding: '1.25rem',
                                      borderRadius: '12px',
                                      border: '1px solid #E5E7EB',
                                    }}>
                                      {myOrderDetail.shippingAddress.addressLine1 && (
                                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#374151', fontWeight: 500 }}>
                                          {myOrderDetail.shippingAddress.addressLine1}
                                        </p>
                                      )}
                                      {myOrderDetail.shippingAddress.addressLine2 && (
                                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#374151', fontWeight: 500 }}>
                                          {myOrderDetail.shippingAddress.addressLine2}
                                        </p>
                                      )}
                                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#374151', fontWeight: 500 }}>
                                        {[myOrderDetail.shippingAddress.city, myOrderDetail.shippingAddress.state].filter(Boolean).join(', ')}
                                        {myOrderDetail.shippingAddress.zipCode && `, ${myOrderDetail.shippingAddress.zipCode}`}
                                      </p>
                                      {myOrderDetail.shippingAddress.countryId && (
                                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#374151', fontWeight: 600 }}>
                                          {myOrderDetail.shippingAddress.countryId}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {myOrderDetail.tracking && (myOrderDetail.tracking.trackingName || myOrderDetail.tracking.trackingNo || myOrderDetail.tracking.trackingUrl) && (
                                  <div style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    padding: '1.75rem',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    border: '1px solid #E5E7EB',
                                  }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                      <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}>
                                        <svg width="20" height="20" fill="#10B981" viewBox="0 0 16 16">
                                          <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        </svg>
                                      </div>
                                      <h6 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '700', color: '#111827' }}>
                                        Tracking Details
                                      </h6>
                                    </div>
                                    <div style={{
                                      background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
                                      padding: '1.25rem',
                                      borderRadius: '12px',
                                      border: '1px solid #E5E7EB',
                                    }}>
                                      {myOrderDetail.tracking.trackingName && (
                                        <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: '#111827', fontWeight: 600 }}>
                                          {myOrderDetail.tracking.trackingName}
                                        </p>
                                      )}
                                      {myOrderDetail.tracking.trackingNo && (
                                        <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#374151' }}>
                                          <strong style={{ color: '#111827' }}>Tracking No:</strong> {myOrderDetail.tracking.trackingNo}
                                        </p>
                                      )}
                                      {myOrderDetail.tracking.trackingUrl && (
                                        <a
                                          href={myOrderDetail.tracking.trackingUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.625rem 1.25rem',
                                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                            color: 'white',
                                            textDecoration: 'none',
                                            borderRadius: '10px',
                                            fontSize: '0.875rem',
                                            fontWeight: 700,
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)',
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 6px 12px rgba(16, 185, 129, 0.4)';
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(16, 185, 129, 0.3)';
                                          }}
                                        >
                                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                                          </svg>
                                          Track Package
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </Col>
                            </Row>
                          </div>
                        )}
                      </>
                    )}
                  </Col>

                  {/* Order Summary Sidebar */}
                  <Col xxl={4} lg={5}>
                    <div style={{ position: 'sticky', top: '100px' }}>
                      {myOrderListLoading ? (
                        <Skeleton height={400} style={{ borderRadius: '20px' }} />
                      ) : (
                        myOrderDetail && (
                          <div
                            style={{
                              background: 'white',
                              borderRadius: '20px',
                              padding: '2rem',
                              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                              border: '1px solid #E5E7EB',
                              position: 'relative',
                              overflow: 'hidden',
                            }}
                          >
                            {/* Decorative gradient */}
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              height: '4px',
                              background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
                            }} />

                            <h5 style={{
                              margin: '0 0 1.5rem 0',
                              fontSize: '1.5rem',
                              fontWeight: '800',
                              color: '#111827',
                              letterSpacing: '-0.02em',
                            }}>
                              Order Summary
                            </h5>

                            <div style={{ marginBottom: '1.5rem' }}>
                              {orderSummary.totalDiamondAmt > 0 && (
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  padding: '0.875rem 0',
                                  borderBottom: '1px solid #F3F4F6',
                                }}>
                                  <span style={{ fontSize: '0.95rem', color: '#6B7280', fontWeight: 600 }}>
                                    Diamonds ({categorizedItems.diamonds.length})
                                  </span>
                                  <span style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>
                                    ${orderSummary.totalDiamondAmt.toFixed(2)}
                                  </span>
                                </div>
                              )}

                              {orderSummary.totalJewelleryAmt > 0 && (
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  padding: '0.875rem 0',
                                  borderBottom: '1px solid #F3F4F6',
                                }}>
                                  <span style={{ fontSize: '0.95rem', color: '#6B7280', fontWeight: 600 }}>
                                    Jewellery ({categorizedItems.jewellery.length})
                                  </span>
                                  <span style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>
                                    ${orderSummary.totalJewelleryAmt.toFixed(2)}
                                  </span>
                                </div>
                              )}

                              {orderSummary.totalMixAmt > 0 && (
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  padding: '0.875rem 0',
                                  borderBottom: '1px solid #F3F4F6',
                                }}>
                                  <span style={{ fontSize: '0.95rem', color: '#6B7280', fontWeight: 600 }}>
                                    Parcel Goods ({categorizedItems.mixDiamond.length})
                                  </span>
                                  <span style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>
                                    ${orderSummary.totalMixAmt.toFixed(2)}
                                  </span>
                                </div>
                              )}

                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.875rem 0',
                                borderBottom: '1px solid #F3F4F6',
                              }}>
                                <span style={{ fontSize: '0.95rem', color: '#6B7280', fontWeight: 600 }}>
                                  Subtotal
                                </span>
                                <span style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>
                                  ${(myOrderDetail?.payment?.payAmount || 0).toFixed(2)}
                                </span>
                              </div>

                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.875rem 0',
                                borderBottom: '2px solid #E5E7EB',
                              }}>
                                <span style={{ fontSize: '0.95rem', color: '#6B7280', fontWeight: 600 }}>
                                  Shipping
                                </span>
                                <span style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>
                                  ${(myOrderDetail?.payment?.shippingAmount || 0).toFixed(2)}
                                </span>
                              </div>
                            </div>

                            <div
                              style={{
                                background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                marginBottom: '1.5rem',
                                border: '2px solid #3B82F620',
                              }}
                            >
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}>
                                <span style={{
                                  fontSize: '1.125rem',
                                  fontWeight: '800',
                                  color: '#1E40AF',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em',
                                }}>
                                  Total
                                </span>
                                <span style={{
                                  fontSize: '2rem',
                                  fontWeight: '900',
                                  color: '#1E40AF',
                                  letterSpacing: '-0.02em',
                                }}>
                                  ${(myOrderDetail?.payment?.finalAmount || 0).toFixed(2)}
                                </span>
                              </div>
                            </div>

                            {/* WhatsApp Button */}
                            <button
                              style={{
                                width: '100%',
                                padding: '1rem 1.5rem',
                                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '14px',
                                fontSize: '1rem',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: '0 8px 16px rgba(37, 211, 102, 0.3)',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 12px 24px rgba(37, 211, 102, 0.4)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(37, 211, 102, 0.3)';
                              }}
                            >
                              <svg width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.1.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.05-.084-.197-.133-.445-.232z"/>
                              </svg>
                              Contact Us on WhatsApp
                            </button>

                            <p style={{
                              marginTop: '1rem',
                              textAlign: 'center',
                              fontSize: '0.8rem',
                              color: '#9CA3AF',
                              fontWeight: 500,
                            }}>
                              Have questions? We're here to help!
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </main>
  );
};

export default memo(OrderDetail);