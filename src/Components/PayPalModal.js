import { useEffect, useState } from 'react';
import './PayPalModal.css';

const PayPalModal = ({ orderDetail, onSuccess, onCancel, onError }) => {
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    const loadPayPalScript = () => {
      if (window.paypal) {
        setPaypalLoaded(true);
        return;
      }

      if (document.getElementById('paypal-sdk')) return;

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=AVFJMh80Wq-_WfMqgCUnL4HZeLazFlm_nMYmFSRaiZVL2ejuJvtdxx9endVcV6OpbYfaZKLoAX9ppOBs&currency=USD`;
      script.id = 'paypal-sdk';
      script.onload = () => {
        setPaypalLoaded(true);
      };
      script.onerror = () => {
        onError(new Error('Failed to load PayPal SDK'));
      };
      document.body.appendChild(script);
    };

    loadPayPalScript();
  }, [onError]);

  useEffect(() => {
    if (paypalLoaded && window.paypal) {
      renderButton();
    }
  }, [paypalLoaded, orderDetail]);

  const renderButton = () => {
    if (!window.paypal) return;

    // Clear existing buttons
    const container = document.getElementById('paypal-button-container');
    if (container) {
      container.innerHTML = '';
    }

    window.paypal.Buttons({
      createOrder: async () => {
        try {
          const res = await fetch('http://72.61.170.111:8088/api/paypal/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderDetail }),
          });
          
          if (!res.ok) {
            throw new Error('Failed to create order');
          }
          
          const data = await res.json();
          return data.id;
        } catch (error) {
          console.error('Create order error:', error);
          onError(error);
          throw error;
        }
      },
      onApprove: async (data) => {
        try {
          const res = await fetch('http://72.61.170.111:8088/api/paypal/capture-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderID: data.orderID,
              orderDetail,
            }),
          });
          
          if (!res.ok) {
            throw new Error('Failed to capture order');
          }
          
          const result = await res.json();
          onSuccess(result);
        } catch (error) {
          console.error('Capture order error:', error);
          onError(error);
        }
      },
      onCancel: () => {
        onCancel();
      },
      onError: (err) => {
        console.error('PayPal error:', err);
        onError(err);
      },
    }).render('#paypal-button-container');
  };

  return (
    <div className="paypal-modal-wrapper">
      <div className="paypal-modal-backdrop" onClick={onCancel} />
      <div className="paypal-modal-content">
        <button className="close-btn" onClick={onCancel}>×</button>
        <h4 className="mb-3">Pay with PayPal</h4>
        <div id="paypal-button-container" style={{ minHeight: '200px' }} />
        {!paypalLoaded && (
          <div className="text-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading PayPal...</span>
            </div>
            <p className="mt-2">Loading PayPal...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayPalModal;