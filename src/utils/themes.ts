import { createTheme } from '@mui/material/styles';

export const getDefaultTheme = () =>
	createTheme({
		palette: {
			primary: { main: '#1a1a1a' },
			background: { default: '#ffffff', paper: '#ffffff' },
		},
		typography: { fontFamily: 'Poppins, Arial, sans-serif' },
	});
