import { createMuiTheme } from '@material-ui/core/styles';

// Custom theme, refer to https://material-ui.com/customization/default-theme/ for a list of options
const theme = createMuiTheme({
  palette: {
    common: {
      black: colorBlack,
      white: '#fff',
    },
    background: {
      paper: '#FFF',
      default: colorCream,
    },
    primary: {
      main: deepOrange[700],
      light: deepOrange[500],
    },
    secondary: {
      main: indigo[700],
    },
    text: {
      primary: colorBlack,
    },
    action: {
      active: '#434242',
      selected: deepOrange[50],
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, Arial',
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 550,
    },
    overline: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },

  overrides: {
    //
  },
});

export default theme;
