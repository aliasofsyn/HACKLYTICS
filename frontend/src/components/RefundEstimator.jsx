import { useState } from 'react';
import axios from 'axios';
import wingmanLogo from '../../public/wingmanLogo.png';

function RefundEstimator() {
  const [delayDuration, setDelayDuration] = useState('');
  const [internationalFlight, setInternationalFlight] = useState(false);
  const [refundProbability, setRefundProbability] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/predict-refund', {
        DelayDuration: parseInt(delayDuration),
        InternationalFlight: internationalFlight ? 1 : 0
      });
      setRefundProbability(response.data.refund_probability);
    } catch (error) {
      console.error('❌ Error fetching prediction:', error.message);
      alert('Error fetching prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src={wingmanLogo}
          alt="Wingman Logo"
          style={{
            width: '140px',
            height: 'auto',
            marginBottom: '15px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        />
      </div>

      <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '24px' }}>
        Refund Probability Estimator
      </h2>

      <label>
        Delay Duration (minutes):
        <input
          type="number"
          value={delayDuration}
          onChange={(e) => {
            const value = e.target.value;
            // Allow empty input or whole numbers only
            if (value === '' || /^\d+$/.test(value)) {
              setDelayDuration(value);
            }
          }}
          placeholder="Enter delay duration"
          min="0"
          step="1"
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '8px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        />
      </label>

      <div style={{ marginTop: '10px' }}>
        <label>
          <input
            type="checkbox"
            checked={internationalFlight}
            onChange={() => setInternationalFlight(!internationalFlight)}
          />
          International Flight
        </label>
      </div>

      <button
        style={{
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: '16px',
          backgroundColor: '#132F5E',
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          width: '100%',
          cursor: 'pointer',
        }}
        onClick={handleSubmit}
        disabled={loading}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#0f254b'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#132F5E'}
      >
        {loading ? 'Calculating...' : 'Estimate Refund Probability'}
      </button>

      {refundProbability !== null && (
        <div style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '18px' }}>
            Refund Probability: <strong>{refundProbability}%</strong>
          </p>
          <div style={{ backgroundColor: '#e0e0e0', borderRadius: '8px', overflow: 'hidden', height: '20px' }}>
            <div
              style={{
                width: `${refundProbability}%`,
                backgroundColor: refundProbability >= 70 ? '#4caf50' : refundProbability >= 40 ? '#ff9800' : '#f44336',
                height: '100%',
                transition: 'width 0.5s ease',
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RefundEstimator;
