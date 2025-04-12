import { styled, width } from '@mui/system';
import { Card} from '@mui/material';
export const Styles = {

  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
    padding: '10px'
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },

}
// export const StyledCard = styled(Card)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-around',
//   borderRadius: '15px',
//   marginRight: '20px',
//   width: '30vw',
//   position: 'relative',
//   paddingBottom: '10px', // Optional: to give breathing space

//   // Desktop
//   [theme.breakpoints.up('md')]: {
//     minHeight: '55vh', 
//     width: '20vw' // not fixed height anymore
//   },

//   // Tablet
//   [theme.breakpoints.down('md')]: {
//     width: '45vw',
//     minHeight: '60vh',
//   },

//   // Mobile
//   [theme.breakpoints.down('sm')]: {
//     width: '90vw',
//     minHeight: 'auto', // Let content decide height
//   },
// }));

