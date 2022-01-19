// using Material Dashboard React - v1.10.0 based on Material Dashboard - v1.2.0
// https://www.creative-tim.com/product/argon-dashboard-material-ui#
// https://github.com/creativetimofficial/argon-dashboard-material-ui/tree/main/src

const hexToRgb = (input) => {
    input = input + "";
    input = input.replace("#", "");
    let hexRegex = /[0-9A-Fa-f]/g;
    if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
        throw new Error("input is not a valid hex color.");
    }
    if (input.length === 3) {
        let first = input[0];
        let second = input[1];
        let last = input[2];
        input = first + first + second + second + last + last;
    }
    input = input.toUpperCase();
    let first = input[0] + input[1];
    let second = input[2] + input[3];
    let last = input[4] + input[5];
    return (
        parseInt(first, 16) +
        ", " +
        parseInt(second, 16) +
        ", " +
        parseInt(last, 16)
    );
};

export default hexToRgb;