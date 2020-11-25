import React from 'react';
import { PropType } from './types';
import StyledLogo from './style';

function Logo({ height }: PropType): React.ReactElement {
  return (
    <StyledLogo height={height}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="500.000000pt"
        height="200.000000pt"
        viewBox="0 0 500.000000 200.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
          fill="#24292e"
          stroke="none"
        >
          <path
            fill="#0366d6"
            d="M4356 1780 c-35 -17 -41 -18 -67 -5 -33 17 -125 20 -166 4 -45 -16
-91 -68 -109 -121 -14 -44 -14 -52 1 -98 11 -35 30 -62 61 -89 l45 -39 -16
-37 c-8 -21 -15 -39 -15 -40 0 -17 163 49 238 96 34 21 47 0 28 -46 -9 -21
-16 -39 -16 -40 0 -10 95 22 154 51 87 44 93 48 128 103 47 75 37 172 -24 227
-62 57 -168 72 -242 34z"
          />
          <path
            d="M2576 1559 c-165 -24 -273 -126 -284 -268 -6 -87 9 -133 63 -186 51
-51 109 -74 303 -121 164 -39 206 -55 244 -91 87 -83 42 -227 -84 -269 -59
-19 -183 -22 -243 -6 -100 28 -173 103 -183 188 l-5 44 -65 0 -65 0 6 -55 c16
-161 143 -271 340 -297 197 -26 387 48 455 177 8 17 17 65 20 107 4 69 2 84
-22 132 -47 95 -118 133 -361 191 -216 51 -268 87 -267 180 2 61 28 104 83
135 39 22 56 25 144 25 84 0 107 -3 142 -22 52 -29 88 -75 104 -136 l13 -47
64 0 64 0 -7 48 c-22 151 -126 248 -294 272 -75 11 -84 11 -165 -1z"
          />
          <path
            d="M3468 1560 c-131 -23 -216 -75 -263 -161 -25 -46 -29 -65 -30 -129 0
-64 4 -82 28 -123 46 -79 128 -116 376 -172 133 -29 206 -66 233 -116 39 -72
10 -170 -64 -213 -81 -47 -235 -53 -333 -12 -76 32 -144 121 -145 189 0 27 -1
27 -66 27 l-67 0 7 -52 c16 -116 89 -213 199 -263 67 -31 184 -49 268 -41 242
22 380 162 349 353 -23 141 -114 199 -417 267 -189 42 -238 80 -231 176 5 65
26 99 83 131 47 27 167 37 231 20 84 -23 148 -88 160 -163 l7 -38 63 0 c64 0
64 0 64 28 0 82 -58 185 -132 235 -74 49 -219 75 -320 57z"
          />
          <path
            d="M600 1485 l0 -55 170 0 170 0 2 -457 3 -458 68 -3 67 -3 0 461 0 460
170 0 170 0 0 55 0 55 -410 0 -410 0 0 -55z"
          />
          <path
            d="M1490 1025 l0 -515 355 0 355 0 0 60 0 60 -290 0 -290 0 2 177 3 178
268 3 267 2 0 55 0 55 -270 0 -270 0 0 165 0 165 290 0 290 0 0 55 0 55 -355
0 -355 0 0 -515z"
          />
        </g>
      </svg>
    </StyledLogo>
  );
}

export default Logo;
