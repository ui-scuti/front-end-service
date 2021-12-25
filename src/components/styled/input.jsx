import styled, { css } from 'styled-components';
import {
	TextField,
	TextareaAutosize,
	Radio,
	RadioGroup,
	Select,
} from '@material-ui/core';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import ImageUploader from 'react-images-upload';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export const ThemedInput = styled(TextField)`
	margin-top: 40px;
	text-align: left;
	width: 50%;
	height: 50px;
	color: #03a9f4;
	background: #131419;
	border: none;
	outline: none;
	border-radius: 40px;
	padding: 5px 15px;
	font-size: 18px;
	box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
		inset 2px 2px 6px rgba(0, 0, 0, 0.8);

	&:focus {
		color: #006c9c;
		margin-top: 20px;
		box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
			inset 2px 2px 6px rgba(0, 0, 0, 0.8);
	}
`;

export const ThemedTextField = styled(TextField)`
	.MuiOutlinedInput-notchedOutline {
		border-color: ${({ theme }) => theme.colors.input.border} !important;
	}
	.MuiTextField-root {
		display: flex !important;
	}
	.MuiOutlinedInput-multiline {
		flex: 1 !important;
	}
	.MuiOutlinedInput-inputMultiline {
		height: 100% !important;
	}

	.MuiInput-underline:before {
		border-color: ${({ theme }) => theme.colors.input.border} !important;
	}

	.MuiInputLabel-animated {
		color: ${({ theme }) => theme.colors.input.border} !important;
	}
	.MuiInputBase-input {
		color: ${({ theme }) => theme.colors.input.placeholder} !important;
	}

	.MuiInputLabel-outlined {
		color: ${({ theme }) => theme.colors.input.placeholder} !important;
	}
`;

export const ThemedSelect = styled(Select)`
	.MuiOutlinedInput-notchedOutline {
		border-color: ${({ theme }) => theme.colors.input.border} !important;
	}

	.MuiInput-underline:before {
		border-color: ${({ theme }) => theme.colors.input.border} !important;
	}

	.MuiInputLabel-animated {
		color: ${({ theme }) => theme.colors.input.border} !important;
	}
	.MuiInputBase-input {
		color: ${({ theme }) => theme.colors.input.placeholder} !important;
	}

	.MuiInputLabel-outlined {
		color: ${({ theme }) => theme.colors.input.placeholder} !important;
	}
`;

export const ThemedTextArea = styled(TextareaAutosize)`
	.MuiOutlinedInput-notchedOutline {
		border-color: ${({ theme }) => theme.colors.input.border} !important;
	}

	.MuiInput-underline:before {
		border-color: ${({ theme }) => theme.colors.input.border} !important;
	}

	.MuiInputLabel-animated {
		color: ${({ theme }) => theme.colors.input.border} !important;
	}
	.MuiInputBase-input {
		color: ${({ theme }) => theme.colors.input.placeholder} !important;
	}

	.MuiInputLabel-outlined {
		color: ${({ theme }) => theme.colors.input.placeholder} !important;
	}
`;

export const ThemeDatePicker = styled(DesktopDatePicker)`
	.MuiOutlinedInput-notchedOutline {
		border-color: ${({ theme }) => theme.colors.input.border} !important;
	}

	.MuiInput-underline:before {
		border-color: ${({ theme }) => theme.colors.input.border} !important;
	}

	.MuiInputLabel-animated {
		color: ${({ theme }) => theme.colors.input.border} !important;
	}
	.MuiInputBase-input {
		color: ${({ theme }) => theme.colors.input.placeholder} !important;
	}

	.MuiInputLabel-outlined {
		color: ${({ theme }) => theme.colors.input.placeholder} !important;
	}
`;

export const ThemedToggleButton = styled(ToggleButton)``;

export const ThemedToggleButtonGroup = styled(ToggleButtonGroup)`
	.MuiToggleButtonGroup-grouped {
		color: ${({ theme }) => theme.colors.input.placeholder} !important;
	}
	.MuiToggleButton-root.Mui-selected {
		color: ${({ theme }) => theme.colors.error.color} !important;
	}
`;

export const ThemedImageUploader = styled(ImageUploader)`
	.fileContainer {
		background: transparent;
		border: 1px solid;
		border-color: ${({ theme }) => theme.colors.input.border} !important;
		color: ${({ theme }) => theme.colors.input.placeholder} !important;
	}
`;
