import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	ThemedHeader,
	Logo,
	HomeWrapper,
	TextScroller,
	ThemedToggleButton,
	ThemedToggleButtonGroup,
	ThemedFeldset,
	ThemedTextField,
	ThemeDatePicker,
	ThemedSecondarySimpleButton,
	ThemedDrawer,
	ThemedSelect,
	ThemedFormControl,
	ThemedMenuItem,
	ThemedInputLabel,
	ThemedFooter,
	ThemedFormSubmitButton,
	ThemedImageUploader,
} from '../../components/styled';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import {
	faBolt,
	faCode,
	faCoins,
	faHourglass,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { faJava, faJs } from '@fortawesome/free-brands-svg-icons';
import { createDailyChallenge } from '../../services';

const DailyChallengeCreate = (props) => {
	const [challengeObject, setChallengeObject] = useState({
		title: '',
		description: '',
		startdate: new Date(),
		enddate: new Date(),
		image: '',
		strictmode: '1',
	});

	const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
	const [protocol, setProtocol] = React.useState('1');
	const [openAdd, setOpenAdd] = React.useState(false);
	const [language, setLanguage] = React.useState('js');

	const setChallengeValue = (name, value) => {
		challengeObject[name] = value;
		setChallengeObject({ ...challengeObject });
	};

	const onSubmit = () => {
		if (
			challengeObject.title &&
			challengeObject.startdate &&
			(challengeObject.strictmode === '1' || challengeObject.enddate)
		) {
			const nObj = { ...challengeObject };
			nObj.startdate = parseInt((nObj.startdate.getTime() / 1000).toFixed(0));
			if (challengeObject.strictmode !== '1') {
				nObj.enddate = parseInt((nObj.enddate.getTime() / 1000).toFixed(0));
			} else {
				delete nObj.enddate;
			}
			createDailyChallenge(nObj);
		}
	};

	return (
		<div className='h-full w-full overflow-hidden'>
			<div className='h-full flex flex-col bg-no-repeat bg-cover overflow-hidden'>
				<ThemedHeader className='flex'>
					<div className='flex-1'>
						<h1>
							New Daily Challenge Suite
							<span>Create your own curiosity set</span>
						</h1>
					</div>

					<h1>
						<span></span>
					</h1>
				</ThemedHeader>
				<HomeWrapper className='h-full w-full flex flex-col mx-1.5 w-full p-8'>
					<div className='w-full h-full flex flex-1'>
						<div className='flex-1 flex flex-col w-full card-challenge flex	bg-transparent shadow-neumorphism2'>
							<div className='font-light flex w-full h-30 p-4'>
								<ThemedTextField
									placeholder='[give your challenge a catchy name]'
									label='Suite Name'
									variant='outlined'
									value={challengeObject.title}
									onChange={(e) => setChallengeValue('title', e.target.value)}
								/>
							</div>
							<div className='font-light flex w-full  p-4 flex-1'>
								<ThemedImageUploader
									withIcon={true}
									withPreview={true}
									buttonText='Challenge image'
									onChange={(e, x) => {
										setChallengeValue('image', x[0]);
									}}
									imgExtension={['.jpg', '.gif', '.png', '.gif']}
									maxFileSize={5242880}
								/>
							</div>
							<div className='font-light flex w-full  p-4 flex-1'>
								<ThemedTextField
									placeholder='[How best you can describe the challenge]'
									label='Suite Description'
									multiline
									variant='outlined'
									className='h-full'
									value={challengeObject.description}
									onChange={(e) =>
										setChallengeValue('description', e.target.description)
									}
								/>
							</div>
							<div className='font-light flex w-full  p-4'>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<div className='px-4 w-full'>
										<ThemeDatePicker
											label='Start Date'
											inputFormat='MM/dd/yyyy'
											value={challengeObject.startdate}
											onChange={(e) => setChallengeValue('startdate', e)}
											renderInput={(params) => <ThemedTextField {...params} />}
										/>
									</div>
									{challengeObject.strictmode !== '1' ? (
										<div className='px-4 w-full'>
											<ThemeDatePicker
												label='End Date'
												inputFormat='MM/dd/yyyy'
												value={value}
												value={challengeObject.enddate}
												onChange={(e) => setChallengeValue('enddate', e)}
												variant='outlined'
												renderInput={(params) => (
													<ThemedTextField {...params} />
												)}
											/>
										</div>
									) : null}
								</LocalizationProvider>
							</div>
							<div className='font-light flex w-full  p-4'>
								<ThemedToggleButtonGroup
									color='primary'
									value={challengeObject.strictmode}
									exclusive
									onChange={(event, newAlignment) => {
										setChallengeValue('strictmode', newAlignment);
									}}>
									<ThemedToggleButton value='1'>
										<FontAwesomeIcon icon={faHourglass} className='mx-4' />
										STRICT MODE
									</ThemedToggleButton>
									<ThemedToggleButton value='2'>
										<FontAwesomeIcon icon={faCoins} className='mx-4' /> CONCLUDE
										MODE
									</ThemedToggleButton>
									<ThemedToggleButton value='3'>
										<FontAwesomeIcon icon={faBolt} className='mx-4' />
										UNBOLT MODE
									</ThemedToggleButton>
								</ThemedToggleButtonGroup>
							</div>
						</div>
						<div className='flex-1 flex flex-col w-full'>
							<div className='font-light flex w-full  p-4 h-full'>
								<ThemedFeldset className='flex flex-col h-full'>
									<legend>Challenges</legend>
									<div className='flex-1'></div>
									<div className='p-4'>
										<ThemedSecondarySimpleButton
											value='Add'
											onClick={() => setOpenAdd(true)}>
											Add New
										</ThemedSecondarySimpleButton>
									</div>
								</ThemedFeldset>
							</div>
						</div>
					</div>
					<ThemedFooter>
						<ThemedFormSubmitButton onClick={() => onSubmit()}>
							Submit
						</ThemedFormSubmitButton>
					</ThemedFooter>
				</HomeWrapper>
			</div>
			<ThemedDrawer
				anchor={'right'}
				open={openAdd}
				onClose={() => setOpenAdd(false)}>
				<ThemedHeader className='flex'>
					<div className='flex-1'>
						<h1>New Challenge</h1>
					</div>

					<h1>
						<span></span>
					</h1>
				</ThemedHeader>
				<div className='font-light flex w-full  p-4'>
					{/* <ThemedInputLabel id='demo-simple-select-label'>
						Language
					</ThemedInputLabel> */}

					<ThemedToggleButtonGroup
						color='primary'
						value={protocol}
						exclusive
						onChange={(event, newAlignment) => {}}>
						<ThemedToggleButton value='1'>
							<FontAwesomeIcon icon={faCode} className='mx-4' /> CODE CHALLENGE
						</ThemedToggleButton>
						<ThemedToggleButton value='2'>
							<FontAwesomeIcon icon={faJava} className='mx-4' /> QUIZ CHALLENGE
						</ThemedToggleButton>
					</ThemedToggleButtonGroup>
				</div>
				<div className='font-light flex w-full  p-4'>
					<ThemedTextField
						placeholder='[Title your current challenge]'
						label="Today's Title"
						variant='outlined'
					/>
				</div>
				<div className='font-light flex w-full  p-4'>
					<ThemedTextField
						placeholder="[Describe today's challenge]"
						label='Description'
						variant='outlined'
						multiline
						rows={2}
					/>
				</div>
				<div className='font-light flex w-full  p-4'>
					<ThemedTextField
						placeholder='[Problem Statement]'
						label='Problem'
						variant='outlined'
						multiline
						rows={2}
					/>
				</div>
				<div className='font-light flex w-full  p-4'>
					<ThemedTextField
						placeholder='[Default text in editor]'
						label='Default text'
						variant='outlined'
						multiline
						rows={2}
					/>
				</div>
				<div className='font-light flex w-full  p-4'>
					{/* <ThemedInputLabel id='demo-simple-select-label'>
						Language
					</ThemedInputLabel> */}

					<ThemedToggleButtonGroup
						color='primary'
						value={protocol}
						exclusive
						onChange={(event, newAlignment) => {
							setLanguage(newAlignment);
						}}>
						<ThemedToggleButton value='1'>
							<FontAwesomeIcon icon={faJs} size={4} className='mx-4 text-4xl' />
						</ThemedToggleButton>
						<ThemedToggleButton value='2'>
							<FontAwesomeIcon
								icon={faJava}
								size={4}
								className='mx-4 text-4xl'
							/>
						</ThemedToggleButton>
					</ThemedToggleButtonGroup>
				</div>
				<div className='font-light flex w-full  p-4'>
					<ThemedTextField
						placeholder='[Define testcases to run without notice]'
						label='Private Testcases'
						variant='outlined'
						multiline
						rows={2}
					/>
				</div>
				<div className='font-light flex w-full  p-4'>
					<ThemedTextField
						placeholder='[Define testcases engaging user]'
						label='Public Testcases'
						variant='outlined'
						multiline
						rows={2}
					/>
				</div>
				<div className='font-light flex w-full  p-4'>
					<ThemedTextField
						placeholder='[Provide hints, one per line]'
						label='Hints'
						variant='outlined'
						multiline
						rows={2}
					/>
				</div>
			</ThemedDrawer>
		</div>
	);
};

export default DailyChallengeCreate;
