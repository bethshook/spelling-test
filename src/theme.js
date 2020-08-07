import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

const slang = '#2099f9';
const lightGray = '#EFEFEF';

// Custom theme, refer to https://material-ui.com/customization/default-theme/ for a list of options
const theme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: {
      main: teal[500],
    },
    // background: {
    //   default: lightGray,
    // }
  },
  typography: {
    h5: {
      color: teal[500],
    },
  },
});

export default theme;
