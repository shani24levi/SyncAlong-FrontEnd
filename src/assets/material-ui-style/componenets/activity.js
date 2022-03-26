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