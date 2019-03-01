import React from 'react';

const Wrapper = ({ children }) => (
  <table
    width="100%"
    style={{
      fontSize: 18,
      lineHeight: 1.4,
      WebkitFontSmoothing: 'antialiased',
      fontFamily: 'sans-serif',
    }}
  >
    <tr>
      <td style={{ padding: 16 }} align="center">
        <div style={{ textAlign: 'left' }}>
          <img
            src="https://storage.googleapis.com/tinkersynth-email-assets/logo-with-name.png"
            width={175}
            style={{ transform: 'translateX(-4px)' }}
          />
        </div>

        <table style={{ width: '100%' }}>
          <tr>
            <td
              style={{
                paddingTop: 20,
              }}
            >
              {children}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
);

export default Wrapper;
