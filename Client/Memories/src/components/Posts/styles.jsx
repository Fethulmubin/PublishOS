// export const Styles = {
//   mainContainer: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   smMargin: {
//     // margin: theme.spacing(1),
//   },
//   actionDiv: {
//     textAlign: 'center',
//   },
//   }
//   // Style.jsx
import { styled } from '@mui/system';
import { Grid } from '@mui/material';

export const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'stretch',
  padding: theme.spacing(2, 0), // theme-based spacing
}));
