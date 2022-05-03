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
        orange: {
            light: 'rgb(251, 233, 231)',
            dark: 'rgb(216, 67, 21)'
        },
        text: {
            secondary: deepPurple[50]
        }
    },
    typography: {
        h6: {
            fontWeight: 700,
            flexGrow: 1,
            color: '#000',
        },
        h5: {
            fontWeight: 700,
            flexGrow: 1,
            color: '#f5f5f5'
        },
        body1: {
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: "#646060",
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
    },
    overrides: {
        MuiButtonBase: {
            root: {
                fontFamily: "'Montserrat', sans-serif",
            },
        },
        MuiButton: {
            root: {
                borderRadius: "30px",
                padding: "5px 30px",
                fonrSize: "15px",
            },
            label: {
                fontSize: "16px",
            },
            text: {
                padding: "6px 20px",
            },
        },
        MuiTypography: {
            h6: {
                textTransform: "none",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "26px",
            },
            colorTextSecondary: {
                color: "white",
            },
            colorInherit: {
                color: "white",
            },
        },
        MuiMenuItem: {
            root: {
                fontFamily: "'Montserrat', sans-serif",
                textTransform: "capitalize",
            },
        },
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: "#ffff",
            },
        },
        // MuiPaper: {
        //     root: {
        //         backgroundColor: "#171941 !important",
        //         color: "white !important",
        //     },
        // },
        MuiFormHelperText: {
            root: {
                color: "#faf7f791",
                fontFamily: "'Montserrat', sans-serif",
            },
        },
        MuiPickersCalendarHeader: {
            iconButton: {
                backgroundColor: "#252529 !important ",
            },
            dayLabel: {
                color: "#e3d6d661 !important",
            },
        },

        MuiPickersDay: {
            root: {
                "&$selected:hover": {
                    color: "#e14eca !important",
                    backgroundColor: "#e14eca !important",
                },
                "&:hover": {
                    backgroundColor: "#e14eca !important",
                },
            },
            daySelected: {
                color: "#e14eca",
                backgroundColor: "#e14eca",
            },
            hover: {
                color: "#e14eca",
                backgroundColor: "#e14eca",
            },
        },
        MuiListItem: {
            button: {},
            root: {
                "&$selected:hover": {},
                "&$selected": {
                    borderBottom: "solid",
                    borderImageSlice: 1,
                    borderImageSource: "linear-gradient(to left, #e14eca, #3AA4D1)",
                },
            },
        },
        MuiFormLabel: {
            root: {
                color: "white",
            },
        },
        MuiInputLabel: {
            root: {
                "&$focused": {
                    color: "#e14eca",
                },
            },
        },
        // MuiInputBase: {
        //     root: {
        //         color: "white !important",
        //     },
        // },
        // MuiTextField: {
        //     root: {
        //         color: "white",
        //     },
        // },
        MuiOutlinedInput: {
            root: {
                // color: "white",
                '&$focused $notchedOutline': {
                    borderColor: '#8c3db9',
                    borderWidth: 1,
                },
            }
        },
        MuiFormLabel: {
            root: {
                color: "#ddd",
            },
        },
        MuiInput: {
            underline: {
                "&:before": {
                    borderBottom: "1px solid rgba(203, 207, 212, 1)",
                },
                "&:after": {
                    borderBottom: `2px solid #91d88e87`,
                },
                "&:hover:not($disabled):not($focused):not($error):before": {
                    borderBottom: `2px solid rgba(203, 207, 212, 1)`,
                },
            },
        },
        MuiCardContent: {
            root: {
                color: "#ffffff",
                fontFamily: "'Montserrat', sans-serif",
                paddingTop: "10px",
            },
        },
        MuiDialog: {
            paperWidthSm: {
                maxWidth: 1500,
            },
        },
        // MuiIconButton: {
        //     label: {
        //         color: "#ffffff !important",
        //     },
        // },
        MuiDataGrid: {
            root: {
                color: "#ffffff !important",
            },
        },
        MuiDataGridPanel: {
            paper: {
                backgroundColor: "#333337eb",
            },
        },
    },
});

export default theme;
