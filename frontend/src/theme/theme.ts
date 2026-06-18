import {createTheme} from '@mui/material/styles';
import  colors  from "./colors.ts";

const theme = createTheme({
    palette: {
        primary: {
            main: colors.primary, 
        },
        secondary: {
            main: colors.secondary,
        },
        success: {
            main: colors.success,
        },
        warning: {
            main: colors.warning,
        },
        error: {
            main: colors.error,
        },
        background: {
            default: colors.background,
            paper: colors.surface,
        },
        text: {
            primary: colors.text,
            secondary: colors.textSecondary,
        },
        divider: colors.border,
    },
});
export default theme;