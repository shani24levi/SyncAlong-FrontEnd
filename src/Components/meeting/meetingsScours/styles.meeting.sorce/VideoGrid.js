import { styled } from '@mui/material/styles';
import { Grid } from '@material-ui/core';

const VideoGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  margin-top: 25px;
  @media screen and (max-width: 870px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
export default VideoGrid;