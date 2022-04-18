const componentStyles = (theme) => ({
    avatar: {
        verticalAlign: "middle",
        marginRight: theme.spacing(0.5),
        zIndex: 1,
    },
    middle: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        position: "relative",
        zIndex: 1,
        border: '2px solid black',
    },
    large: {
        width: theme.spacing(16),
        height: theme.spacing(16),
        position: "relative",
        zIndex: 1,
        //marginTop: '-60px',
        border: '3px solid white',
        "&:hover": {
            height: "100%",
            opacity: 0.95,
            border: '3px solid #8c3db9',
            boxShadow: "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
        },
        "&:before": {
            content: "",
            width: "100%",
            background: "#eb1768",
            position: "absolute",
            bottom: "135%",
            right: 0,
            left: 0,
            transform: "scale(3)",
            transition: "all 0.3s linear 0s"
        },
        "&:after": {
            content: "",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zindex: -1,
        },
    },
    largelarge: {
        width: theme.spacing(40),
        height: theme.spacing(40),
        border: '3px solid white',
        margin: '10px',
        "&:hover": {
            top: "-1px",
            opacity: 0.95,
            border: '3px solid #8c3db9',
            boxShadow: "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
        },
    },
});

export default componentStyles;