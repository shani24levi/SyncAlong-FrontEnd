import theme from "./../../theme/theme";

const componentStyles = {
    listItemRoot: {
        display: "flex",
        alignItems: "center",
        fontSize: "1rem",
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        transition: "all .15s linear",
        fontWeight: "400",
        "& i": {
            marginRight: "0.25rem",
        },
        [theme.breakpoints.up("md")]: {
            marginRight: ".5rem",
            paddingLeft: ".5rem",
            paddingRight: ".5rem",
            justifyContent: "center",
            color: theme.palette.grey[600],
            "&:hover": {
                color: theme.palette.grey[100],
            },
        },
    },
    headerImg: {
        verticalAlign: "middle",
        borderStyle: "none",
    },
    menuPaper: {
        width: "calc(100% - 2rem)",
    },
    outlineNone: {
        outline: "none!important",
    },
    flexDirectionColumn: {
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
        },
    },
};

export default componentStyles;