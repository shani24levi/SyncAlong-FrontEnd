import { createTheme } from "@material-ui/core/styles";
import { indigo, deepPurple } from "@material-ui/core/colors";
import themeColors from "./colors";

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        },
    },
    palette: {
        mode: deepPurple[50],
        primary: {
            ...themeColors,
            light: indigo[50],
            main: '#3f50b5',
            dark: indigo[800],
            contrastText: '#fff',
        },
        secondary: {
            light: deepPurple[50],
            main: '#8B0000',
            dark: deepPurple[800],
            contrastText: '#000',
        },
        text: {
            secondary: deepPurple[50]
        }
    },
    typography: {
        body1: {
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: "#ddd",
        },
        body2: {
            fontSize: 12,
            fontFamily: "'Montserrat', sans-serif",
            color: "#A52A2A",
        },
    },
    bottom: {
        main: {
            color: 'with',
            background: "linear-gradient(87deg," + "#11cdef" + ",#1171ef)",
            marginBottom: 15,
            padding: '5px 30px',
            borderRadius: 15
        }
    }
});

export default theme;
