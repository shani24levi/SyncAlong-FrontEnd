import theme from "./theme";

const themeButtons = {
    purpleDefult: {
        backgroundImage: "linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca)",
        backgroundSize: "210% 210%",
        backgroundPosition: "top right",
        backgroundColor: "#e14eca",
        transition: "0.1s",
        boxShadow: "none",
        padding: "10px 20px",
        color: "#ffffff !important",
        marginBottom: "10px",
        marginTop: "10px",
        "&:hover": {
            top: "-1px",
            opacity: 0.85,
            boxShadow: "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
        },
    },
    purpleRound: {
        color: "#ffffff !important",
        background: "linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca)",
        padding: "10px 20px",
        borderRadius: '30px !important',
        transition: "0.1s",
        boxShadow: "none",
        marginBottom: "10px",
        marginTop: "10px",
        "&:hover": {
            top: "-1px",
            opacity: 0.85,
            boxShadow: "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
        },
    },
    purpleRoundEmpty: {
        color: '#e14eca',
        background: "transparent",
        borderColor: "linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca)",
        border: "solid",
        borderRadius: '30px',
        padding: "10px 20px",
        transition: "0.1s",
        marginBottom: "10px",
        marginTop: "10px",
        "&:hover": {
            top: "-1px",
            boxShadow: "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
        },
    },
    blueDefult: {
        background: "linear-gradient(87deg," + "#11cdef" + ",#1171ef)",
        backgroundSize: "210% 210%",
        backgroundPosition: "top right",
        backgroundColor: "#11cdef",
        transition: "0.1s",
        boxShadow: "none",
        padding: "10px 20px",
        color: "#ffffff",
        marginBottom: "10px",
        marginTop: "10px",
        "&:hover": {
            top: "-1px",
            opacity: 0.85,
            boxShadow: "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
        },
    },
    blueRound: {
        color: "#ffffff",
        background: "linear-gradient(87deg," + "#11cdef" + ",#1171ef)",
        padding: "10px 20px",
        borderRadius: 15,
        transition: "0.1s",
        boxShadow: "none",
        marginBottom: "10px",
        marginTop: "10px",
        "&:hover": {
            top: "-1px",
            opacity: 0.85,
            boxShadow: "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
        },
    },
};

export default themeButtons;