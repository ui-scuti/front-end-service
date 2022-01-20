import styled from 'styled-components';

export const ThemedPrimaryButton = styled.button`
	margin-top: 1rem;
	box-sizing: border-box;
	appearance: none;
	background-color: transparent;
	border-radius: 0.6em;
	cursor: pointer;
	display: flex;
	align-self: center;
	font-size: 1rem;
	line-height: 1;
	text-decoration: none;
	text-align: center;
	text-transform: uppercase;
	font-family: 'Montserrat', sans-serif;
	font-weight: 100;
	color: ${({ theme }) => theme.colors.buttons.primary.bg};
	&:hover,
	&:focus {
		color: ${({ theme }) => theme.colors.buttons.primary.text};
		outline: 0;
	}

	border-color: ${({ theme }) => theme.colors.buttons.primary.bg};
	transition: all 150ms ease-in-out;

	&:hover {
		box-shadow: 0 0 10px 0 ${({ theme }) => theme.colors.buttons.primary.bg}
				inset,
			0 0 10px 4px ${({ theme }) => theme.colors.buttons.primary.bg};
	}
`;
export const ThemedSecondaryButton = styled(ThemedPrimaryButton)`
	color: ${({ theme }) => theme.colors.buttons.secondary.bg};
	&:hover,
	&:focus {
		color: ${({ theme }) => theme.colors.buttons.secondary.text};
		outline: 0;
	}

	border-color: ${({ theme }) => theme.colors.buttons.secondary.bg};
	transition: all 150ms ease-in-out;

	&:hover {
		box-shadow: 0 0 10px 0 ${({ theme }) => theme.colors.buttons.secondary.bg}
				inset,
			0 0 10px 4px ${({ theme }) => theme.colors.buttons.secondary.bg};
	}
`;

export const ThemedSecondarySimpleButton = styled(ThemedPrimaryButton)`
	color: ${({ theme }) => theme.colors.buttons.secondary.bg};
	&:hover,
	&:focus {
		color: ${({ theme }) => theme.colors.buttons.secondary.bg};
		outline: 0;
	}

	&:hover {
		box-shadow: none;
	}
`;

export const ThemedSubmitButton = styled.input`
	width: 100%;
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
	margin-top: 20px;
	box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.1),
		2px 2px 6px rgba(0, 0, 0, 0.8);

	&:active {
		color: #006c9c;
		margin-top: 20px;
		box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
			inset 2px 2px 6px rgba(0, 0, 0, 0.8);
	}
`;

export const CircularButton = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100px;
	justify-content: center;
	.circular-button-logo {
		border-top: 5px double #999;
		border-right: 5px double #999;
		border-bottom: 5px double #999;
		border-left: 5px double #999;
		border-radius: 50%;
		height: 50px;
		width: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.circular-button-text {
	}
`;

export const ThemedFormSubmitButton = styled.button`
	width: 130px;
	height: 40px;
	border-radius: 5px;
	padding: 10px 25px;
	font-weight: 500;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	display: inline-block;
	box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
		7px 7px 20px 0px rgba(255, 255, 255, 0.1),
		4px 4px 5px 0px rgba(255, 255, 255, 0.1);
	outline: none;
	border: none;
	color: ${({ theme }) => theme.colors.buttons.primary.text};
	background: transparent;
	text-transform: uppercase;
	:after {
		position: absolute;
		content: '';
		width: 0;
		height: 100%;
		top: 0;
		left: 0;
		direction: rtl;
		z-index: -1;
		box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
			7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
		transition: all 0.3s ease;
	}
	:hover {
		background: ${({ theme }) => theme.colors.buttons.primary.bg};
		color: ${({ theme }) => theme.colors.buttons.primary.text};
	}
	:hover:after {
		left: auto;
		right: 0;
		width: 100%;
	}
	:active {
		top: 2px;
	}
`;
