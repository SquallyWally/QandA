import React from 'react';
import user from './logos/user.svg';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

export const UserIcon = () => (
  <img
    src={user}
    alt="User"
    css={css`
      width: 12px;
      opacity: 0.6;
    `}
    width="12px"
  />
);
