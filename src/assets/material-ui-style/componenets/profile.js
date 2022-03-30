const componentStyles = (theme) => ({
    text: {
        margin: theme.spacing(0, 0, 0.5),
        //color: #27293d,
    },
    avatar: {
        verticalAlign: "middle",
        marginRight: theme.spacing(0.5),
        zIndex: 1,
    },
    brand: {
        backgroundColor: '#e14eca',
        width: '100%',
        height: '100px'
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
    card: {
        borderRadius: 15,
        backgroundColor: theme.palette.background.card,
        overflow: "hidden",
        position: "relative",
        "&:hover": {
            border: '3px solid #8c3db9',
        },
    },
    cardContent: {
        padding: theme.spacing(2, 0, 0, 0),
    },

    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    haederView: {
        borderColor: "#8c3db9",
        borderBottom: "3px solid #8c3db9",
        // background: "radial-gradient(ellipse at bottom, #292D61 30%, #171941 80%)",
        //  marginBottom: '3%'
    },

    cardCheckbox: {
        backgroundColor: '#F3F2EE !important',
        boxshadow: 'none !important',
        color: 'rgba(0, 0, 0, 0.3) !important',
        transition: "0.2s",
        marginBottom: "10px",
        marginTop: "10px",
        padding: "10px 20px",
        "&:hover": {
            top: "-3px",
            opacity: 0.95,
            border: '1px solid #8c3db9',
            boxShadow: "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
        },
    },
});

export default componentStyles;