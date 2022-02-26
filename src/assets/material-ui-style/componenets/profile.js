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
        marginTop: '-60px',
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
    }
});

export default componentStyles;