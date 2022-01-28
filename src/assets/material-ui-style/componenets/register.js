// import boxShadows from "assets/theme/box-shadow.js";
import theme from "./../../theme/theme";

const componentStyles = {
    paperStyle2: { padding: 20, margin: "20px auto", maxWidth: 500, position: "relative", background: "rgb(255 237 255 / 68%)" },
    avatarStyle: { backgroundColor: '#1bbd7e' },
    cardRoot: {
        border: "0!important",
        backgroundColor: theme.palette.background.default,
        margin: 'auto'
    },
    cardHeader: {
        backgroundColor: "initial",
    },
    cardContent: {
        [theme.breakpoints.up("md")]: {
            padding: "3rem",
        },
    },
    buttonImg: {
        verticalAlign: "middle",
        borderStyle: "none",
    },
    buttonRoot: {
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.primary.main,
        borderColor: theme.palette.grey[100] + "!important",
        "&:hover": {
            color: theme.palette.grey[600],
            borderColor: theme.palette.grey[100] + "!important",
            backgroundColor: theme.palette.grey[100],
        },
    },
};

export default componentStyles;