import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import "../Account/Order.css"
const OrderDetailTable2 = ({
  summaryToggle,
  categorizedItems = {},
  handleChangeToggleTab,
  onClickToDiamondDetail,
  onClickToJewelleryDetail,
}) => {
  const {
    diamonds = [],
    jewellery = [],
    mixDiamond = [],
    settings = [],
  } = categorizedItems;

  const COLORS = {
    diamond: { bg: '#EFF6FF', border: '#3B82F6', text: '#1E40AF', accent: '#60A5FA' },
    jewellery: { bg: '#FEF3C7', border: '#F59E0B', text: '#92400E', accent: '#FBBF24' },
    mix: { bg: '#FCE7F3', border: '#EC4899', text: '#9F1239', accent: '#F472B6' },
    setting: { bg: '#F3E8FF', border: '#A855F7', text: '#6B21A8', accent: '#C084FC' },
  };

  const renderSection = (title, items, tabKey, renderItem, colorScheme) => {
    if (!items || items.length === 0) return null;

    const isOpen = summaryToggle[tabKey];

    const onToggle = () => {
      handleChangeToggleTab(tabKey, isOpen);
    };

    return (
      <div 
        style={{
          marginBottom: '1.5rem',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: `2px solid ${colorScheme.border}`,
          backgroundColor: '#fff',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggle();
            }
          }}
          role="button"
          tabIndex={0}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.25rem 1.5rem',
            cursor: 'pointer',
            backgroundColor: colorScheme.bg,
            transition: 'background-color 0.2s ease',
            borderBottom: isOpen ? `1px solid ${colorScheme.border}20` : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span
              style={{
                backgroundColor: colorScheme.border,
                color: 'white',
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: '700',
                borderRadius: '9999px',
                minWidth: '2.5rem',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              {items.length}
            </span>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                margin: 0,
                color: colorScheme.text,
                letterSpacing: '-0.025em',
              }}
            >
              {title}
            </h3>
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colorScheme.text}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transition: 'transform 0.3s ease',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {isOpen && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
              padding: '1.5rem',
              backgroundColor: '#F9FAFB',
            }}
          >
            {items.map((item, idx) => (
              <React.Fragment key={item._id ?? idx}>
                {renderItem(item, idx, colorScheme)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderDiamondItem = useCallback((item, idx, colorScheme) => {
    return (
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid #E5E7EB',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 24px -4px rgba(0, 0, 0, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.08)';
          e.currentTarget.style.borderColor = colorScheme.border;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
          e.currentTarget.style.borderColor = '#E5E7EB';
        }}
      >
        <div style={{ position: 'relative', backgroundColor: '#F9FAFB', aspectRatio: '1/1' }}>
          <img
            src={item.Stone_Img_url || 'https://via.placeholder.com/400'}
            alt={item.Diamond_Name || 'Diamond'}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '1rem',
            }}
          />
          {item.Diamond_Type === 'LABGROWN' && (
            <span
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                backgroundColor: '#10B981',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: '600',
                padding: '0.375rem 0.75rem',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Lab Grown
            </span>
          )}
        </div>

        <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h4
            style={{
              fontSize: '1.125rem',
              fontWeight: '700',
              marginBottom: '0.75rem',
              color: '#111827',
              lineHeight: '1.4',
            }}
          >
            {item.Diamond_Name}
          </h4>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            {item.Shape && (
              <span
                style={{
                  backgroundColor: colorScheme.bg,
                  color: colorScheme.text,
                  padding: '0.375rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  border: `1px solid ${colorScheme.border}40`,
                }}
              >
                {item.Shape}
              </span>
            )}
            {item.Weight != null && (
              <span
                style={{
                  backgroundColor: colorScheme.bg,
                  color: colorScheme.text,
                  padding: '0.375rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  border: `1px solid ${colorScheme.border}40`,
                }}
              >
                {item.Weight} ct
              </span>
            )}
            {item.Color && (
              <span
                style={{
                  backgroundColor: colorScheme.bg,
                  color: colorScheme.text,
                  padding: '0.375rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  border: `1px solid ${colorScheme.border}40`,
                }}
              >
                {item.Color}
              </span>
            )}
            {item.Clarity && (
              <span
                style={{
                  backgroundColor: colorScheme.bg,
                  color: colorScheme.text,
                  padding: '0.375rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  border: `1px solid ${colorScheme.border}40`,
                }}
              >
                {item.Clarity}
              </span>
            )}
            {item.Cut && (
              <span
                style={{
                  backgroundColor: colorScheme.bg,
                  color: colorScheme.text,
                  padding: '0.375rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  border: `1px solid ${colorScheme.border}40`,
                }}
              >
                {item.Cut}
              </span>
            )}
          </div>

          <div
            style={{
              fontSize: '0.85rem',
              color: '#6B7280',
              marginBottom: '1rem',
              borderLeft: `3px solid ${colorScheme.border}`,
              paddingLeft: '0.75rem',
            }}
          >
            {item.Lab && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                <span style={{ fontWeight: '500' }}>Lab:</span>
                <span style={{ fontWeight: '600', color: '#374151' }}>{item.Lab}</span>
              </div>
            )}
            {item.Lab_Report_No && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                <span style={{ fontWeight: '500' }}>Certificate:</span>
                <span style={{ fontWeight: '600', color: '#374151' }}>{item.Lab_Report_No}</span>
              </div>
            )}
            {item.Stone_No && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '500' }}>Stock:</span>
                <span style={{ fontWeight: '600', color: '#374151' }}>{item.Stone_No}</span>
              </div>
            )}
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div
              style={{
                backgroundColor: colorScheme.bg,
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                border: `1px solid ${colorScheme.border}30`,
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem', fontWeight: '500' }}>
                Price
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: colorScheme.text, marginBottom: '0.25rem' }}>
                ${item.Cost_Amt?.toFixed(2)}
              </div>
              {item.Cost_Rate != null && (
                <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: '500' }}>
                  ${item.Cost_Rate.toFixed(2)}/ct
                </div>
              )}
            </div>

            <button
              onClick={() => onClickToDiamondDetail(item.Stone_No, item.Diamond_Type)}
              style={{
                width: '100%',
                backgroundColor: colorScheme.border,
                color: 'white',
                padding: '0.75rem 1rem',
                border: 'none',
                fontSize: '0.9rem',
                fontWeight: '600',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                marginBottom: '0.75rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colorScheme.text;
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colorScheme.border;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span>View Details</span>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </button>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              {item.Certificate_file_url && (
                <a
                  href={item.Certificate_file_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: '0.8rem',
                    color: colorScheme.border,
                    textDecoration: 'none',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colorScheme.text;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colorScheme.border;
                  }}
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                  </svg>
                  Certificate
                </a>
              )}
              {item.Video_url && (
                <a
                  href={item.Video_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: '0.8rem',
                    color: colorScheme.border,
                    textDecoration: 'none',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colorScheme.text;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colorScheme.border;
                  }}
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                  </svg>
                  Video
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }, [onClickToDiamondDetail]);

  const renderJewelleryItem = useCallback((item, idx, colorScheme) => {
    const stockId = item.Jewellery_Stock_ID || item.Stock_ID;
    return (
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid #E5E7EB',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 24px -4px rgba(0, 0, 0, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.08)';
          e.currentTarget.style.borderColor = colorScheme.border;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
          e.currentTarget.style.borderColor = '#E5E7EB';
        }}
      >
        <div style={{ position: 'relative', backgroundColor: '#F9FAFB', aspectRatio: '1/1' }}>
          <img
            src={item.Jewellery_Img_url || item.Stone_Img_url || 'https://via.placeholder.com/400'}
            alt={item.Jewellery_Name || 'Jewellery'}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '1rem',
            }}
          />
        </div>

        <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h4
            style={{
              fontSize: '1.125rem',
              fontWeight: '700',
              marginBottom: '0.75rem',
              color: '#111827',
              lineHeight: '1.4',
            }}
          >
            {item.Jewellery_Name || 'Jewellery Item'}
          </h4>

          <div
            style={{
              fontSize: '0.85rem',
              color: '#6B7280',
              marginBottom: '1rem',
              borderLeft: `3px solid ${colorScheme.border}`,
              paddingLeft: '0.75rem',
            }}
          >
            {stockId && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                <span style={{ fontWeight: '500' }}>Stock ID:</span>
                <span style={{ fontWeight: '600', color: '#374151' }}>{stockId}</span>
              </div>
            )}
            {item.Metal_Type && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                <span style={{ fontWeight: '500' }}>Metal:</span>
                <span style={{ fontWeight: '600', color: '#374151' }}>{item.Metal_Type}</span>
              </div>
            )}
            {item.Metal_Weight != null && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '500' }}>Weight:</span>
                <span style={{ fontWeight: '600', color: '#374151' }}>{item.Metal_Weight} g</span>
              </div>
            )}
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div
              style={{
                backgroundColor: colorScheme.bg,
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                border: `1px solid ${colorScheme.border}30`,
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem', fontWeight: '500' }}>
                Price
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: colorScheme.text }}>
                ${(item.Sale_Rate ?? item.Cost_Amt)?.toFixed(2)}
              </div>
            </div>

            <button
              onClick={() => onClickToJewelleryDetail(stockId)}
              style={{
                width: '100%',
                backgroundColor: colorScheme.border,
                color: 'white',
                padding: '0.75rem 1rem',
                border: 'none',
                fontSize: '0.9rem',
                fontWeight: '600',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colorScheme.text;
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colorScheme.border;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span>View Details</span>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }, [onClickToJewelleryDetail]);

  const noItems =
    diamonds.length + jewellery.length + mixDiamond.length + settings.length === 0;

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {renderSection('Diamond Items', diamonds, 'diamondTab', renderDiamondItem, COLORS.diamond)}
      {renderSection('Jewellery Items', jewellery, 'jewelleryTab', renderJewelleryItem, COLORS.jewellery)}
      {renderSection('Mix Diamond Items', mixDiamond, 'mixDiamondTab', renderDiamondItem, COLORS.mix)}
      {renderSection('Setting Items', settings, 'settingTab', renderJewelleryItem, COLORS.setting)}

      {noItems && (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem',
              backgroundColor: '#F3F4F6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="40" height="40" fill="#9CA3AF" viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
            </svg>
          </div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#374151', marginBottom: '0.5rem' }}>
            No Items Found
          </h4>
          <p style={{ fontSize: '0.95rem', color: '#6B7280', margin: 0 }}>
            There are no items in this order yet.
          </p>
        </div>
      )}
    </div>
  );
};

OrderDetailTable2.propTypes = {
  summaryToggle: PropTypes.object.isRequired,
  categorizedItems: PropTypes.shape({
    diamonds: PropTypes.array,
    jewellery: PropTypes.array,
    mixDiamond: PropTypes.array,
    settings: PropTypes.array,
  }),
  handleChangeToggleTab: PropTypes.func.isRequired,
  onClickToDiamondDetail: PropTypes.func.isRequired,
  onClickToJewelleryDetail: PropTypes.func.isRequired,
};

export default memo(OrderDetailTable2);