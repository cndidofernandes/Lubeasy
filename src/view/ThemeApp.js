import {createMuiTheme} from '@material-ui/core/styles';

const themeApp = createMuiTheme({
    palette:{
        type: "light",
        primary: {
            main: '#0090FF',
        },
        secondary: {
            main: '#EFD307',
        },
        background:{
            paper: '#fff',
            default: '#eceff1'
        }
    },
});

export default themeApp;