import styled, { keyframes } from 'styled-components';
import img from '../../assets/images/logo.png';
import homeImageBg from '../../assets/images/home_bg.jpg';
import challengeImageBg from '../../assets/images/challenge.png';

import {
	Drawer,
	FormControl,
	MenuItem,
	InputLabel,
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardActionArea,
} from '@mui/material';

export const ThemedCard = styled.div`
	background-image: linear-gradient(
		to right,
		${({ theme }) => theme.colors.card.start},
		${({ theme }) => theme.colors.card.end}
	) !important;
	width: 100%;
`;

export const ThemedPaper = styled.div`
	box-shadow: 6px 6px 13px #191a1c, -6px -6px 13px #212224;
	padding: 8px;
	border-radius: 5px;
`;

export const Logo = styled.div`
	background-image: url(${img}) !important;
	width: 50px;
	height: 50px;
	background-repeat: round;
`;

export const HomeWrapper = styled.div`
	background-image: url(${homeImageBg}) !important;
	background-repeat: no-repeat;
	background-size: cover;
`;

export const ThemedBackgroundWrapper = styled.div`
	background-image: linear-gradient(
		to right,
		${({ theme }) => theme.colors.card.start},
		${({ theme }) => theme.colors.card.end}
	) !important;
`;

const ScrollingTextKeyFrame = keyframes`
  0%  { top: 0px; }
20% { top: -18px; }
40% { top: -36px; }
60% { top: -54px; }
80% { top: -72px; }
`;

export const TextScroller = styled.div`
	color: #787878;
	margin-top: 16px;
	font-size: 12px;
	letter-spacing: 10px;
	p {
		float: left;
		margin-right: 0.3em;
	}
	b {
		float: left;
		overflow: hidden;
		position: relative;
		height: 15px;
		top: 0px;
	}

	div {
		display: inline-block;
		color: #e6e91f;
		position: relative;
		white-space: nowrap;
		top: 0px;
		left: 0;
		text-align: center;
		/*animation*/
		-webkit-animation: ${ScrollingTextKeyFrame} 5s;
		-moz-animation: ${ScrollingTextKeyFrame} 5s;
		-ms-animation: ${ScrollingTextKeyFrame} 5s;
		-o-animation: ${ScrollingTextKeyFrame} 5s;
		animation: ${ScrollingTextKeyFrame} 5s;
		/*animation-iteration-count*/
		-webkit-animation-iteration-count: infinite;
		-moz-animation-iteration-count: infinite;
		-ms-animation-iteration-count: infinite;
		-o-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
		/*animation-delay*/
		-webkit-animation-delay: 1s;
		-moz-animation-delay: 1s;
		-ms-animation-delay: 1s;
		-o-animation-delay: 1s;
		animation-delay: 1s;
		animation-direction: normal;
	}
`;

export const ThemedFeldset = styled.div`
	border: 1px solid ${({ theme }) => theme.colors.input.border} !important;
	border-radius: 4px;
	min-height: 100px;
	width: 100%;
	legend {
		top: -10px;
		left: 10px;
		padding: 0px 16px;
		background: transparent;
		position: relative;
		width: fit-content;
		background: black;
	}
`;

export const ThemedDrawer = styled(Drawer)`
	.MuiDrawer-paper {
		background-image: linear-gradient(
			to right,
			${({ theme }) => theme.colors.card.start},
			${({ theme }) => theme.colors.card.end}
		) !important;
		width: 60%;
	}
`;

export const ThemedFormControl = styled(FormControl)``;
export const ThemedMenuItem = styled(MenuItem)`
	color: ${({ theme }) => theme.colors.input.placeholder} !important;
	background-image: linear-gradient(
		to right,
		${({ theme }) => theme.colors.card.start},
		${({ theme }) => theme.colors.card.end}
	) !important;
`;
export const ThemedInputLabel = styled(InputLabel)``;

export const ThemedFooter = styled.div`
	height: 60px;
	background: rgba(0, 0, 0, 0.2);
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0px 2rem;
`;

export const ThemedSmallCard = styled(Card)`
	background-image: linear-gradient(
		to right,
		${({ theme }) => theme.colors.card.start},
		${({ theme }) => theme.colors.card.end}
	) !important;
	height: 300px !important;
	background: #222 !important;
`;
export const ThemedCardContent = styled(CardContent)``;
export const ThemedCardMedia = styled.div`
	background-image: url(${challengeImageBg}) !important;
	height: 140px;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	border-bottom: 1px solid #787878;
`;
export const ThemedTypography = styled(Typography)`
	color: ${({ theme }) => theme.colors.input.placeholder} !important;
`;
export const ThemedCardActionArea = styled(CardActionArea)``;

export const ThemedCommonBackground = styled.div`
	/* background-image: linear-gradient(
		to right,
		${({ theme }) => theme.colors.card.start},
		${({ theme }) => theme.colors.card.end}
	) !important; */
	background-repeat: no-repeat;
	background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1015%26quot%3b)' fill='none'%3e%3cpath d='M1044 112L1043 -97' stroke-width='10' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M1383 431L1382 192' stroke-width='8' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M23 323L22 657' stroke-width='6' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M744 207L743 376' stroke-width='10' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M384 363L383 93' stroke-width='10' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M1163 228L1162 378' stroke-width='10' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M814 235L813 378' stroke-width='6' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M118 391L117 -21' stroke-width='8' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M338 509L337 865' stroke-width='8' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M444 423L443 79' stroke-width='8' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M1392 159L1391 432' stroke-width='6' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M507 505L506 726' stroke-width='6' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M231 255L230 494' stroke-width='8' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M632 89L631 -281' stroke-width='8' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M404 58L403 -92' stroke-width='6' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M801 116L800 392' stroke-width='10' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M1131 323L1130 494' stroke-width='6' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M605 478L604 648' stroke-width='8' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M13 321L12 -48' stroke-width='8' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M915 130L914 394' stroke-width='8' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M1363 74L1362 331' stroke-width='10' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M1027 423L1026 702' stroke-width='6' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M406 147L405 -77' stroke-width='10' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M215 414L214 89' stroke-width='10' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M771 353L770 211' stroke-width='8' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M726 557L725 787' stroke-width='10' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M44 441L43 262' stroke-width='8' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M1176 225L1175 73' stroke-width='10' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M815 327L814 129' stroke-width='8' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M914 83L913 -63' stroke-width='10' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M1342 177L1341 -10' stroke-width='8' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M1346 473L1345 717' stroke-width='8' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M547 300L546 0' stroke-width='6' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M1150 426L1149 91' stroke-width='8' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M788 46L787 295' stroke-width='10' stroke='url(%23SvgjsLinearGradient1017)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M340 333L339 520' stroke-width='10' stroke='url(%23SvgjsLinearGradient1016)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1015'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='0%25' y1='0%25' x2='0%25' y2='100%25' id='SvgjsLinearGradient1016'%3e%3cstop stop-color='rgba(28%2c 83%2c 142%2c 0)' offset='0'%3e%3c/stop%3e%3cstop stop-color='%231c538e' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='0%25' y1='100%25' x2='0%25' y2='0%25' id='SvgjsLinearGradient1017'%3e%3cstop stop-color='rgba(28%2c 83%2c 142%2c 0)' offset='0'%3e%3c/stop%3e%3cstop stop-color='%231c538e' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"),
		${({ theme }) => theme.colors.body};
	background-position: bottom;
	background-size: cover;
`;
