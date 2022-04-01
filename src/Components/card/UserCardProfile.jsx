import React from 'react';
import { Paper, styled, Grid, Button } from '@mui/material';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import { Box } from '@mui/system';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ErrorIcon from '@mui/icons-material/Error';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// const Wrapper = styled(Paper)`
//   height: 300px;
//   width: 200px;
//   position: relative;
//   border-radius: 16px;
//   margin: 1rem;
//   cursor: pointer;
//   background: linear-gradient(rgb(130, 145, 224), rgb(214, 162, 228));
//   box-shadow:
//   0 1.6px 1.6px rgba(255,0,255, 0.023),
//   0 3.8px 3.8px rgba(255,0,255, 0.034),
//   0 6.9px 6.9px rgba(255
//     ,0,255, 0.041),
//   0 11.4px 11.4px rgba(255,0,255, 0.049),
//   0 18.8px 18.8px rgba(255,0,255, 0.056),
//   0 32.8px 32.8px rgba(255,0,255, 0.067),
//   0 71px 71px rgba(255,0,255, 0.09)
// ;
//   transition: all 0.2s ease-in-out;
//   &:hover,
//   &:focus {
//     transform: scale(1.1) !important;
//   }
//   .info__icon{
//     font-size: 25px;
//     color: var(--info);
//     opacity: 0.5;
//   }
//   &.info__icon:hover {
//     opacity: 1;
//   }
// `;

// const StyledImage = styled('img')`
//   display: flex;
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   object-position: center center;
//   background-color: #131313;
//   border-radius: 16px;
// `;

// const AbsoluteGrid = styled(Grid)`
//     color: #fff;
//   padding: 15px;
//   border-radius: 16px;
//   top: 0px;
//   left: 0px;
//     .UserCard_text {
//     font-size: 24px;
//     font-weight: 700;
//     padding: 8px px;
//   }
//   .UserCard_topics {
//     text-overflow: ellipsis;
//   }
//   .info__icon{
//     font-size: 25px;
//     color: var(--info);
//     opacity: 0.5;
//   }
//   &.info__icon:hover {
//     opacity: 1;
//   }
// `;

const Wrapper = styled(Paper)`
  height: 150px;
  width: 150px;
  position: relative;
  border-radius: 16px;
  margin: 1rem;
  box-shadow:
  0 1.6px 1.6px rgba(255,0,255, 0.023),
  0 3.8px 3.8px rgba(255,0,255, 0.034),
  0 6.9px 6.9px rgba(255,0,255, 0.041),
  0 11.4px 11.4px rgba(255,0,255, 0.049),
  0 18.8px 18.8px rgba(255,0,255, 0.056),
  0 32.8px 32.8px rgba(255,0,255, 0.067),
  0 71px 71px rgba(255,0,255, 0.09)
;
  transition: all 0.2s ease-in-out;
  &:hover,
  &:focus {
    transform: scale(1.1) !important;
  }
`;

const StyledImage = styled('img')`
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  background-color: #131313;
  border-radius: 16px;
`;

const AbsoluteGrid = styled(Grid)`
    color: #fff;
  padding: 5px;
  background: rgb(0, 0, 0, 0.4);
  border-radius: 16px;
  position: absolute;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  .MuiSvgIcon-root {
    padding-right: 4px;
  }
  .MuiGrid-item {
    padding: 4px;
    display: flex;
    align-content: center;
  }
    .UserCard_text {
    font-size: 24px;
    font-weight: 700;
    padding: 8px px;
  }
  .UserCard_topics {
    text-overflow: ellipsis;
  }
`;

function UserCardProfile({ trainee }) {
    return (
        <Wrapper elevation={4}>
            <StyledImage src={trainee.avatar} />
            <AbsoluteGrid container>
                <Grid item justifyContent='space-between'>
                    <Box
                        onClick={console.log('dd')}
                        role="presentation"
                        sx={{ bgcolor: '#ffff', borderColor: 'primary.main', borderRadius: 5, padding: '2%', cursor: 'pointer' }}>
                        <EditIcon color="secondary" size="small" aria-label="scroll back to top" />
                    </Box>
                    <Box
                        onClick={console.log('dd')}
                        role="presentation"
                        sx={{ bgcolor: '#ffff', borderColor: 'primary.main', borderRadius: 5, padding: '2%', cursor: 'pointer' }}>
                        <DeleteIcon color="secondary" size="small" aria-label="scroll back to top" />
                    </Box>

                    {/* <Button endIcon={<DeleteIcon />}> </Button> */}
                </Grid>
                <Grid item>{trainee.user}</Grid>
                <Grid item className="UserCard_text">
                    {trainee.user}
                </Grid>
            </AbsoluteGrid>
        </Wrapper>

        // <Wrapper elevation={4}>
        //     {/* <StyledImage src={trainee.avatar} /> */}
        //     <Box sx={{ width: '100%' }}>
        //         <AbsoluteGrid container spacing={3} justifyContent='space-between'>
        //             <Grid item>
        //                 <span className="UserCard_topics">{trainee.user}</span>
        //                 <Button endIcon={<ErrorIcon fontSize='large' className="info__icon" />} onClick={() => console.log('s')} />
        //             </Grid>
        //         </AbsoluteGrid>
        //     </Box>
        //     <Grid container justifyContent='center'>
        //         <Grid item>
        //             <LazyLoadImage
        //                 alt="image"
        //                 height={150}
        //                 src={trainee.avatar}
        //                 visibleByDefault={false}
        //                 delayMethod={'debounce'}
        //                 effect="blur"
        //             />
        //         </Grid>
        //     </Grid>
        //     <Grid>
        //         <Grid item>{trainee.user}</Grid>
        //     </Grid>
        // </Wrapper>
    );
}

export default UserCardProfile;