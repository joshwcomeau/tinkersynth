import React from 'react';

const MobileWrapper = ({ children }) => (
  <td
    style={{
      padding: 16,
    }}
    align="center"
  >
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
);

const DesktopWrapper = ({ children }) => (
  <td
    style={{
      backgroundColor: '#EEE',
      padding: 50,
    }}
    align="center"
  >
    <div style={{ textAlign: 'left', maxWidth: 730 }}>
      <img
        src="https://storage.googleapis.com/tinkersynth-email-assets/logo-with-name.png"
        width={175}
        style={{ transform: 'translateX(-4px)' }}
      />
    </div>

    <table
      style={{
        maxWidth: 730,
      }}
    >
      <tr>
        <td
          style={{
            background: '#FFF',
            padding: 30,
            paddingTop: 20,
            borderRadius: 12,

            boxShadow: '0px 5px 50px rgba(0, 0, 0, 0.1)',
          }}
        >
          {children}
        </td>
      </tr>
    </table>
  </td>
);

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
      {window.innerWidth > 600 ? (
        <DesktopWrapper>{children}</DesktopWrapper>
      ) : (
        <MobileWrapper>{children}</MobileWrapper>
      )}
    </tr>
  </table>
);

export default Wrapper;
