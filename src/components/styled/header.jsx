import styled from 'styled-components';

export const ThemedHeader = styled.div`
	padding-left: 1rem;
	width: 100%;
	height: 60px;
	background: ${({ theme }) => theme.colors.body};
	border-bottom: 1px solid #fff;
	overflow: hidden;
	h1 {
		position: relative;
		padding: 0;

		margin: 0;
		font-family: 'Raleway', sans-serif;
		font-weight: 300;
		font-size: 30px;
		-webkit-transition: all 0.4s ease 0s;
		-o-transition: all 0.4s ease 0s;
		transition: all 0.4s ease 0s;
		text-transform: capitalize;
		&:before {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 60px;
			height: 2px;
			content: '';
			background-color: #c50000;
		}
	}

	h1 span {
		font-size: 10px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 4px;
		line-height: 3em;
		padding-left: 0.25em;
		padding-bottom: 10px;
	}
	h1 em {
		font-style: normal;
		font-weight: 600;
	}
`;
