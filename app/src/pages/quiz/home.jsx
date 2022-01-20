import React, { useState, useEffect } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import { getSchedule, User } from '../../services';
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
} from '../../components/styled';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const LockLogo = styled.div`
	border-top: 5px double #999;
	border-right: 5px double #999;
	border-bottom: 5px double #999;
	border-left: 5px double #999;
	border-radius: 50%;
	height: 70px;
	width: 70px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 0.5rem;
`;

function CircularProgressWithLabel(props) {
	return (
		<Box position='relative' display='inline-flex'>
			<CircularProgress variant='determinate' {...props} />
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position='absolute'
				display='flex'
				alignItems='center'
				justifyContent='center'>
				<Typography
					variant='caption'
					component='div'
					className='text-white'>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

CircularProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate variant.
	 * Value between 0 and 100.
	 */
	value: PropTypes.number.isRequired,
};

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

function QuizHome(props) {
	const [schedule, setSchedule] = useState([]);
	const [loading, setLoading] = useState(true);
	const [progress, setProgress] = useState(0);

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
		const promises = [];
		promises.push(getSchedule(props.renderProps.match.params.id));
		promises.push(User.getScheduleStatus(props.renderProps.match.params.id));
		let completionCount = 0;
		Promise.all(promises).then((res) => {
			const scheduleData = res[0];
			const statusData = res[1];

			scheduleData.challenges.forEach((c) => {
				c.status = statusData.filter((fd) => {
					return fd.id === c._id;
				})[0].status;
				if (c.status === 1) {
					completionCount = completionCount + 1;
				}
			});
			setProgress((completionCount / scheduleData.challenges.length) * 100);
			setSchedule(scheduleData);
			setLoading(false);
		});
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
						<Loader text={'Loading challenges. please wait'} />
					</div>{' '}
				</div>
			) : (
				<div className='h-full flex flex-col bg-no-repeat bg-cover bg-gray-50 overflow-hidden'>
					<ThemedHeader className='flex'>
						<div className='flex-1'>
							<h1>
								{schedule.schedule.title}
								<span>{schedule.schedule.description}</span>
							</h1>
						</div>
						<div className='flex flex-col justify-center items-center mx-1.5'>
							<CircularProgressWithLabel value={progress} color='primary' />
						</div>
						<h1>
							<span></span>
						</h1>
					</ThemedHeader>
					<div className='w-full flex-1 p-4 block justify-center items-center bg-background  overflow-auto'>
						{schedule.challenges.map((ch, chi) => {
							return (
								<div
									className='w-full h-24 m-4 rounded-md card-challenge flex	bg-transparent shadow-neumorphism2'
									key={chi}>
									<div className='box flex-1 flex content text-white  transition duration-500 opacity-40 hover:opacity-100 p-2'>
										<div className='w-20 flex flex-col justify-center items-center'>
											<div
												className={`bg-${ch.language} bg-contain bg-no-repeat h-8 w-16`}></div>
											<div className='opacity-50 text-center'>
												<p>MEDIUM</p>
											</div>
										</div>
										<div className='flex-1'>
											<h4>{ch.title}</h4>
											<p>{ch.description}</p>
										</div>
										<div className='w-16'></div>
										<>
											{ch.status === 3 ? (
												<div style={{ bottom: '20px' }}>
													<CircularButton
														className='text-blue-300'
														onClick={() => onStartClicked(ch._id)}>
														<div className='circular-button-logo'>
															<FontAwesomeIcon icon={faPlay} />
														</div>
														<div className='circular-button-text'>START</div>
													</CircularButton>
													<Modal
														aria-labelledby='transition-modal-title'
														aria-describedby='transition-modal-description'
														className={classes.modal}
														open={open}
														onClose={() => handleClose()}
														closeAfterTransition
														BackdropComponent={Backdrop}
														BackdropProps={{
															timeout: 500,
														}}>
														<Fade in={open}>
															<div className={classes.paper}>
																<h2 id='transition-modal-title'>
																	Start Challenge
																</h2>
																<div
																	id='transition-modal-description'
																	style={{ fontSize: '10px' }}>
																	Upon clicking proceed, this challenege timer
																	will start for you
																	<br />
																	Instructions
																	<ul>
																		<li>Try to solve the challenges</li>
																	</ul>
																</div>
																<div style={{ display: 'flex' }}>
																	<Button
																		color='primary'
																		style={{ color: 'green' }}
																		onClick={() => startChallenge()}>
																		Proceed
																	</Button>
																	<Button
																		color='secondary'
																		onClick={() => handleClose()}>
																		Cancel
																	</Button>
																</div>
															</div>
														</Fade>
													</Modal>
												</div>
											) : null}

											{ch.status === 0 ? (
												<div style={{ bottom: '20px' }}>
													<Link
														to={`/challenges/ground/${props.renderProps.match.params.id}/${ch._id}`}>
														<CircularButton className='text-yellow-300'>
															<div className='circular-button-logo'>
																<FontAwesomeIcon icon={faSyncAlt} />
															</div>
															<div className='circular-button-text'>
																CONTINUE
															</div>
														</CircularButton>
													</Link>
												</div>
											) : null}
											{ch.status === 2 ? (
												<CircularButton disabled className='cursor-not-allowed'>
													<div className='circular-button-logo'>
														<FontAwesomeIcon icon={faLock} />
													</div>
													<div className='circular-button-text'>LOCKED</div>
												</CircularButton>
											) : null}
											{ch.status === 1 ? (
												<CircularButton
													disabled
													className='text-green-300 cursor-not-allowed'>
													<div className='circular-button-logo'>
														<FontAwesomeIcon icon={faMedal} />
													</div>
													<div className='circular-button-text'>COMPLETED</div>
												</CircularButton>
											) : null}
										</>
									</div>
									<div className='w-36 opacity-10'>
										<h2 className='text-pink-50 text-8xl'>0{chi + 1}</h2>
									</div>
									{/* <div className="box h-full bg-background1 border-1 border-border shadow-neumorphism rounded-xl transition duration-500 flex flex-col items-center flex-wrap text-center overflow-hidden">
                    <div className="content text-white opacity-40 transition duration-500 w-full text-8xl">
                    </div>
                  </div> */}
								</div>
							);
						})}
					</div>
					{/* <div className="flex justify-center items-center h-full flex-col">
            <div className="container-stack">
              {schedule.challenges.map((ch, chi) => {
                return <div className="card-stack">
                  <h3 className="title-stack">DAY {ch.sequence}: {ch.title}</h3>
                  <div className="bar-stack">
                    <div className="emptybar-stack"></div>
                    <div className="filledbar-stack"></div>
                  </div>
                  <>{ch.status === 3 ? (
                    <div className="details-stack">
                      <div style={{ flex: 1 }}>{ch.description}</div>
                      <h3 >{ch.language}</h3>
                      <div style={{ bottom: '20px' }}>
                        <ThemedPrimaryButton onClick={() => onStartClicked(ch._id)}>Start</ThemedPrimaryButton>
                        <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          className={classes.modal}
                          open={open}
                          onClose={() => handleClose()}
                          closeAfterTransition
                          BackdropComponent={Backdrop}
                          BackdropProps={{
                            timeout: 500,
                          }}
                        >
                          <Fade in={open}>
                            <div className={classes.paper}>
                              <h2 id="transition-modal-title">Start Challenge</h2>
                              <div id="transition-modal-description" style={{ fontSize: '10px' }}>Upon clicking proceed, this challenege timer will start for you
                              <br />
                              Instructions
                              <ul>
                                  <li>Try to solve the challenges</li></ul>
                              </div>
                              <div style={{ display: 'flex' }}>
                                <Button color="primary" style={{ color: 'green' }} onClick={() => startChallenge()}>Proceed</Button>
                                <Button color="secondary" onClick={() => handleClose()}>Cancel</Button></div>
                            </div>
                          </Fade>
                        </Modal>
                      </div>
                    </div>
                  ) : (null)}
                  </>
                  <>{ch.status === 0 ? (
                    <div className="details-stack">
                      <div style={{ flex: 1 }}>{ch.description}</div>
                      <h3 >{ch.language}</h3>
                      <div style={{ bottom: '20px' }}>
                        <Link to={`/challenges/ground/${props.renderProps.match.params.id}/${ch._id}`}>
                          <ThemedSecondaryButton>Continue</ThemedSecondaryButton>
                        </Link>
                      </div>
                    </div>
                  ) : (null)}
                  </>
                  <>{ch.status === 1 ? (
                    <div className="details-stack">
                      <div style={{ flex: 1 }}>{ch.description}</div>
                      <h3 >{ch.language}</h3>
                      <div style={{ marginTop: '20px' }}>
                        <div><span className="stamp is-approved">COMPLETED</span></div>
                      </div>
                    </div>
                  ) : (null)}
                  </>
                  <>{ch.status === 2 ? (
                    <div className="details-stack">
                      <div style={{ flex: 1 }}>You need to complete previous quest first</div>
                      <h3 ></h3>
                      <div style={{ marginTop: '20px' }}>
                        <div><span className="stamp is-nope">LOCKED</span></div>
                      </div>
                    </div>

                  ) : (null)}
                  </>

                </div>
              })}
            </div>
          </div> */}
				</div>
			)}
		</div>
	);
}

export default QuizHome;
