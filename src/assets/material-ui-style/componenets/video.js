import theme from "./../../theme/theme";

const componentStyles = {
    video: {
        width: '600px',
        [theme.breakpoints.down('xs')]: {
            width: '400px',
        },
    },
    gridContainer: {
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    paper: {
        padding: '10px',
        border: '2px solid black',
        margin: '10px',
    },
};
export default componentStyles;