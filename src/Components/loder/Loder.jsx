import React from 'react';
import { Ellipsis } from 'react-spinners-css';
import { styled } from '@mui/material/styles';

const LoaderWrapper = styled('div')`
  height: 20vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = () => (
    <LoaderWrapper>
        <Ellipsis color="#be97e8" />
    </LoaderWrapper>
);

export default Loader;
