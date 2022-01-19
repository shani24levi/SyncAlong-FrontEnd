// import boxShadows from "assets/theme/box-shadow.js";
import theme from "./../../theme/theme";

const componentStyles = {
    paperStyle: {
        padding: 20, height: '70vh', margin: "20px auto"
    },
    cardRoot: {
        // boxShadow: boxShadows.boxShadow + "!important",
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
        // boxShadow: boxShadows.buttonBoxShadowNeutral,
        borderColor: theme.palette.grey[100] + "!important",
        "&:hover": {
            color: theme.palette.grey[600],
            borderColor: theme.palette.grey[100] + "!important",
            backgroundColor: theme.palette.grey[100],
        },
    },
    formControlLabelRoot: {
        position: "relative",
        display: "flex",
        minHeight: "1.5rem",
        WebkitPrintColorAdjust: "exact",
    },
    formControlLabelLabel: {
        cursor: "pointer",
        fontSize: ".875rem",
        position: "relative",
        verticalAlign: "top",
        display: "inline-block",
        color: theme.palette.grey[600],
    },
    footerLinks: {
        olor: theme.palette.grey[400],
        textDecoration: "none",
    },
};

export default componentStyles;