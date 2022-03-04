const componentStyles = (theme) => ({
    quickStartBtn: {
        color: "#ffffff !important",
        background: "linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca)",
        padding: "10px 20px",
        borderRadius: '50px !important',
        transition: "0.1s",
        boxShadow: "none",
        "&:hover": {
            top: "-6px",
            opacity: 0.85,
            boxShadow: "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
        },
    }

});

export default componentStyles;