import React, { useState, useEffect } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import { createDailyChallenge, getAllSchedules, User } from '../../services';
import Loader from '../../components/loader/loader';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
	faLock,
	faCheck,
	faSyncAlt,
	faPlay,
	faMedal,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useHistory } from 'react-router-dom';
import {
	ThemedHeader,
	ThemedSecondaryButton,
	ThemedPrimaryButton,
	CircularButton,
	HomeWrapper,
	ThemedSmallCard,
	ThemedCardContent,
	ThemedCardMedia,
	ThemedTypography,
	ThemedCardActionArea,
	ThemedCommonBackground,
} from '../../components/styled';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NoRecords from '../../components/no-records/no-records';
import './daily-challenge.css';
const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: '#343436',
		border: '2px solid #000',
		color: '#787878',
		boxShadow: theme.shadows[5],
		maxWidth: '70%',
		padding: theme.spacing(2, 4, 3),
	},
}));

function DailyChallengeHome(props) {
	const [schedule, setSchedule] = useState([]);
	const [loading, setLoading] = useState(true);
	const [progress, setProgress] = useState(0);
	const [dcSuites, setDcSuites] = useState([]);

	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [selectedChallengeid, setSelectedChallengeid] = useState('');
	const history = useHistory();

	const onStartClicked = (cid) => {
		setSelectedChallengeid(cid);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	useEffect(() => {
		loadInitialDetails();
	}, []);

	const loadInitialDetails = () => {
		getAllSchedules().then((res) => {
			// setChallenges(res);
			setDcSuites(res);
		});
		setLoading(false);
	};

	const startChallenge = () => {
		User.startChallengeStatus(selectedChallengeid).then((res) => {
			handleClose();
			history.push(
				`/challenges/ground/${props.renderProps.match.params.id}/${selectedChallengeid}`
			);
		});
	};

	return (
		<div className='h-full w-full overflow-hidden'>
			{loading ? (
				<div className='flex flex-col h-full justify-center align-middle'>
					<div>
						<Loader text={'Loading your ground. please wait'} />
					</div>{' '}
				</div>
			) : (
				<div className='h-full flex flex-col bg-no-repeat bg-cover bg-gray-50 overflow-hidden'>
					<ThemedHeader className='flex'>
						<div className='flex-1'>
							<h1>
								Daily Challenges
								<span>Its new one every day</span>
							</h1>
						</div>
						<h1>
							<span></span>
						</h1>
					</ThemedHeader>
					<ThemedCommonBackground className='h-full w-full flex flex-col mx-1.5 w-full p-8'>
						<Link to={`/dc/create`}>Add New</Link>
						<div className='themed-cards grid grid-cols-3 gap-4'>
							{dcSuites.map((ch, chi) => {
								return (
									<div className='p-5'>
										<Link
											to={`/dc/challengess/${ch._id}`}
											className='flex flex-col'>
											<div className='themed-card flex flex-col'>
												<div className='themed-card_image'>
													<img
														src={
															ch.image ||
															require('../../assets/images/challenge.png')
														}
														alt={ch.title}
													/>
												</div>
												<div className='themed-card_content flex flex-col flex-1 overflow-hidden'>
													<div>
														<h2 className='themed-card_title'>{ch.title} </h2>
													</div>
													<div className='text-xs text-gray-500'>
														{new Date(ch.startdate * 1000).toLocaleDateString(
															'en-US'
														)}
														-
														{new Date(ch.enddate * 1000).toLocaleDateString(
															'en-US'
														)}
													</div>
													<div className='themed-card_text flex-1'>
														{ch.description}
													</div>
													<div className='h-5'>Take me to the challenge</div>
												</div>
											</div>
										</Link>
									</div>
								);
							})}
						</div>
					</ThemedCommonBackground>
				</div>
			)}
		</div>
	);
}

export default DailyChallengeHome;
