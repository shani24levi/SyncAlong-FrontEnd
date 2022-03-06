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
        //marginTop: '-60px',
        border: '3px solid white',
        "&:hover": {
            top: "-1px",
            opacity: 0.95,
            border: '3px solid #8c3db9',
            boxShadow: "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
        },
    },
    largelarge: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        border: '3px solid white',
    },
    card: {
        borderRadius: 15,
        backgroundColor: theme.palette.background.card,
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
        padding: "20px 5px",
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
    }

});

export default componentStyles;