const componentStyles = {
    card: {
        maxWidth: 200,
        margin: "auto",
        backgroundColor: 'inherit !important',
        color: '#ffffff !important',
        border: "1px solid #344675",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(192,192,192,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(192,192,192,0.3)"
        }
    },
    cardHeader: {
        margin: 'auto',
        padding: '10px',
        borderRadius: '10%',
        width: '70% !important',
    },
    divider: {
        margin: `15px 0`,
        backgroundColor: '#344675'
    },
    avatar: {
        display: "inline-block",
        border: "2px solid white",
        "&:not(:first-of-type)": {
            marginLeft: '-1'
        }
    }
};

export default componentStyles;

