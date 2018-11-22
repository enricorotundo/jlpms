import { createMuiTheme } from '@material-ui/core/styles';

const themeFactory = () => {
  return createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    // palette: {
    //   mywhite: '#fff'
    // }
  });
}

export default themeFactory;