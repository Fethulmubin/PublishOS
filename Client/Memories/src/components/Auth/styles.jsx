export const Styles = {
    paper: {
      marginTop: 64, // theme.spacing(8) -> 8 * 8 = 64
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 16, // theme.spacing(2) -> 2 * 8 = 16
    },
    root: {
      '& .MuiTextField-root': {
        margin: 8, // theme.spacing(1) -> 1 * 8 = 8
      },
    },
    avatar: {
      margin: 8, // theme.spacing(1) -> 1 * 8 = 8
      backgroundColor: '#f50057', // theme.palette.secondary.main -> example color
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: 24, // theme.spacing(3) -> 3 * 8 = 24
    },
    submit: {
      margin: '24px 0 16px', // theme.spacing(3, 0, 2) -> 3 * 8, 0, 2 * 8
    },
    googleButton: {
      marginBottom: 16, // theme.spacing(2) -> 2 * 8 = 16
    },
};