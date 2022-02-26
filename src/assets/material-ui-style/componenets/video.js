import theme from "./../../theme/theme";

const componentStyles = {
    video: {
        width: '640px',
        //position: 'relative',
        [theme.breakpoints.down('xs')]: {
            width: '400px',
        },
    },
    gridContainer: {
        justifyContent: 'center',
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    paper: {
        // padding: '10px',
        // border: '2px solid black',
        // margin: '10px',
    },

    timerWrapper: {
        display: "flex",
        justifyContent: "center"
    },

    wraperMiddleContiner: {
        position: 'absolute',
        marginTop: '50px',
    },

    timer: {
        // position: 'absolute',
        // marginTop: '50px',
        fontFamily: "Montserrat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    text: {
        color: "#aaa"
    },

    value: {
        fontSize: "40px"
    },

    info: {
        maxWidth: "360px",
        margin: "40px auto 0",
        textAlign: "center",
        fontSize: "16px"
    },
    emoji: {
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 400,
        bottom: 500,
        right: 0,
        textAlign: "center",
        height: 100,
    }
};
export default componentStyles;