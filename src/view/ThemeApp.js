import {createMuiTheme} from '@material-ui/core/styles';

const themeApp = createMuiTheme({
    palette:{
        type: "light",
        primary: {
            main: '#0288d1',
        },
        secondary: {
            main: '#ffb300',
        },
        background:{
            paper: '#fff',
            default: '#eceff1'
        }
    },
});

export default themeApp;