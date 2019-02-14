// @flow
import React, { useContext } from 'react';

import { COLORS } from '../../../constants';

import CanvasToggle from '../../CanvasToggle';
import Svg from '../../Svg';

type Props = {
  size?: number,
  isActive: boolean,
  isPoweredOn: boolean,
  handleToggle: () => void,
};

const BulbToggle = ({
  size = 38,
  isActive,
  isPoweredOn,
  handleToggle,
}: Props) => {
  const visualizationSize = size - 6;

  return (
    <CanvasToggle
      size={size}
      isActive={!isActive}
      isPoweredOn={isPoweredOn}
      handleToggle={handleToggle}
    >
      <Svg
        width={size - 6}
        height={size - 2}
        viewBox="0 0 32 29"
        style={{ opacity: isPoweredOn ? 1 : 0 }}
      >
        <path
          data-layer-name="Filament"
          d="M13 13L14 14.8417M14 14.8417L15 13L16 14.8417L17 13L18 14.8417M14 14.8417L16 18.2M18 14.8417L19 13M18 14.8417L16 18.2M16 18.2V19.5"
          stroke="#FFFBDA"
          strokeOpacity={isActive ? 0 : 0.5}
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          data-layer-name="bulb"
          d="M18.9782 20H12.9688C12.9688 20 12.9955 19.4682 12.9688 19.1292C12.9137 18.4304 12.8265 18.0254 12.5395 17.3876C12.2886 16.8299 12.0163 16.5916 11.6811 16.0815L10.8226 14.7753C10.4873 14.2652 10.2249 14.0222 9.9641 13.4691C9.73538 12.984 9.61753 12.694 9.53485 12.1629C9.45642 11.6591 9.53479 11.7276 9.53479 10.8568C9.53479 9.94112 9.59107 9.51364 9.96405 8.6798C10.2236 8.09958 10.7791 7.52835 11.2518 6.93819C11.7803 6.27837 12.2127 5.99882 12.9688 5.63201C13.447 5.40002 13.7394 5.31505 14.2565 5.19662C15.4011 4.93446 16.1166 4.93446 17.2612 5.19662C17.7783 5.31505 18.0707 5.40002 18.5489 5.63201C19.3051 5.99882 19.6732 6.33704 20.2659 6.93819C20.8586 7.53935 21.2082 7.90518 21.5536 8.67977C21.8385 9.31851 21.9277 9.72252 21.9829 10.4213C22.0096 10.7603 22.0015 10.9526 21.9829 11.2921C21.9355 12.1578 21.8381 12.6515 21.5536 13.4691C21.3041 14.1862 21.0861 14.5618 20.6951 15.2107C20.2581 15.9361 19.769 16.1853 19.4074 16.9522C19.1787 17.4373 19.073 17.7294 18.9782 18.2584C18.8582 18.9276 18.9782 20 18.9782 20Z"
          stroke={isActive ? COLORS.gray[700] : COLORS.yellow[300]}
          strokeWidth="2"
        />
        <path
          data-layer-name="Base"
          d="M12 23H20M12 24.6667H20M13.1089 26.3333H18.9703M14.7723 28H16.9109"
          stroke={isActive ? COLORS.gray[700] : COLORS.gray[300]}
        />
        <g
          data-layer-name="Beams"
          style={{ display: isActive ? 'none' : 'block' }}
        >
          <path
            d="M27 10H31"
            stroke="#FFEB33"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 10H5"
            stroke="#FFEB33"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 -1L7.82843 1.82843"
            stroke="#FFEB33"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.8284 -1L23.9999 1.82843"
            stroke="#FFEB33"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </Svg>
    </CanvasToggle>
  );
};

export default BulbToggle;
