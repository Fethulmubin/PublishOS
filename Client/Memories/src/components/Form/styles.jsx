// // import { TextField } from "@mui/material";

// import { blue } from "@mui/material/colors";

// export const Styles = {
//     root: {
//           margin: '20px',
//         },
//       paper: {
//         padding: '20px',
//         margin : '20px'
//       },
//       form: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//       },
//       fileInput: {
//         width: '97%',
//         margin: '20px',
//       },
//       buttonSubmit: {
//         marginBottom: 10,
//         color : blue,
//       },
//       textField:{
//         margin : '5px'
//       }
//   }
// Style.jsx
import { border, styled } from '@mui/system';
import { Paper, Button, TextField, Grid } from '@mui/material';
import { blue } from '@mui/material/colors';

// Styled Components
export const StyledPaper = styled(Paper)(({ theme }) => ({

  padding: '10px',
  // margin: '10px',
  display: 'flex',
  justifySelf: 'center',
  justifyContent: 'center',
  border: '1px solid #ccc',
  borderRadius: '20px',
  width: '50%'
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: '10px',
  color: blue[500],
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: '5px',
  // borderRadius: '60px'
}));

export const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'stretch',
  padding: theme.spacing(2, 0),
}));

// Other non-component styles
export const Styles = {
  root: {
    margin: '20px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '20px',
  },
};
