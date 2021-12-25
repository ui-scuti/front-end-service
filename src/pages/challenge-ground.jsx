import React, { useState, useEffect } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import { makeStyles } from '@material-ui/core/styles';
import { getChallenge } from '../services';
import { compile, submitCode } from '../services/test-code';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Loader from '../components/loader/loader';
import Hint from '../components/hint/hint';
import TestResult from '../components/test-result/test-result';
import Panel from '../components/panel/panel';
import Editor from '@monaco-editor/react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
	faCode,
	faQuestion,
	faTerminal,
	faLightbulb,
	faPlay,
	faSave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { LocalStorage } from '../services';
import { ActionTypes, StorageKeys } from '../constants';
import {
	ThemedHeader,
	ThemedPrimaryButton,
	ThemedSecondarySimpleButton,
} from '../components/styled';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const files = {
	javascript: {
		name: 'script.js',
		language: 'javascript',
		value: 'function helloworld(){}',
	},
	css: {
		name: 'style.css',
		language: 'css',
		value: '',
	},
	html: {
		name: 'index.html',
		language: 'html',
		value: '',
	},
};

function ChallengeGround(props) {
	const classes = useStyles();

	const [challenge, setChallenge] = useState([]);
	const [editorValue, setEditorValue] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingTestResult, setLoadingTestResult] = useState(false);
	const [testResults, setTestResults] = useState([]);
	const [codeModified, setCodeModified] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	const history = useHistory();
	useEffect(() => {
		loadInitialDetails();
		setIsAdmin(LocalStorage.getFromLocalStorage(StorageKeys.EXCEL));
	}, []);

	function handleEditorChange(value, event) {
		setEditorValue(value);
		setCodeModified(true);
	}

	function invokeCompile() {
		setCodeModified(false);
		setLoadingTestResult(true);
		compile({
			code: editorValue,
			challenge: props.renderProps.match.params.cid,
		}).then((res) => {
			setTestResults(res);
			setLoadingTestResult(false);
		});
	}

	const invokeSubmit = () => {
		setSubmitting(true);
		submitCode({
			code: editorValue,
			challenge: props.renderProps.match.params.cid,
		}).then((res) => {
			setSubmitting(false);
			history.push(`/challenges/home/${props.renderProps.match.params.sid}`);
		});
	};

	const loadInitialDetails = () => {
		getChallenge(props.renderProps.match.params.cid).then((res) => {
			setChallenge(res);
			setEditorValue(res.defaultText);
			setLoading(false);
		});
	};

	return (
		<div style={{ height: '100%', width: '100%' }}>
			{loading ? (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<div>
						<Loader />
					</div>{' '}
					<div>Loading challenges. please wait</div>
				</div>
			) : (
				<div
					id='challenge-ground-panel'
					className='challenge-ground-panel-wrapper'>
					<div className={classes.root} style={{ height: '50px' }}>
						<ThemedHeader className='flex'>
							<div className='flex-1'>
								<h1>
									{challenge.title}
									<span>{challenge.description}</span>
								</h1>
							</div>
							<div className='flex justify-center items-center'>
								<Button
									color='inherit'
									onClick={() => invokeCompile()}
									disabled={loadingTestResult || submitting}
									style={{ maxWidth: '90px' }}>
									<FontAwesomeIcon
										icon={faPlay}
										style={{ marginRight: '8px' }}
									/>
									Test
								</Button>
								<Button
									color='inherit'
									onClick={() => invokeSubmit()}
									style={{ maxWidth: '90px' }}
									disabled={loadingTestResult || codeModified || submitting}>
									<FontAwesomeIcon
										icon={faSave}
										style={{ marginRight: '8px' }}
									/>
									Submit
								</Button>
							</div>
						</ThemedHeader>
					</div>
					<div style={{ height: '100%', padding: '8px' }} className='p-3'>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Panel title='Editor' icon={faCode}>
									{submitting ? (
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												height: '100%',
												justifyContent: 'center',
												alignItems: 'center',
											}}>
											<div>
												<Loader />
											</div>
											<div>Submitting your answer, please wait</div>
											<div style={{ fontSize: '10px' }}>
												Once done, you will be redirected to challenge home
												page.
											</div>
										</div>
									) : (
										<Editor
											height='100%'
											theme='vs-dark'
											path={files.javascript.name}
											defaultLanguage={challenge.language}
											defaultValue={challenge.defaultText}
											onChange={handleEditorChange}
										/>
									)}
								</Panel>
							</Grid>
							<Grid item xs={6}>
								<Grid container spacing={0}>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											width: '100%',
										}}>
										<Panel
											title='Problem'
											icon={faQuestion}
											style={{ flex: 1 }}>
											<div
												style={{
													wordBreak: 'break-word',
													padding: '8px',
													overflow: 'auto',
													height: '100%',
													textAlign: 'left',
													fontSize: '10px',
												}}>
												{challenge.problem}
											</div>
										</Panel>
										<Panel
											title='Test Result'
											icon={faTerminal}
											style={{ flex: 1 }}>
											{codeModified ? (
												<div
													style={{
														display: 'flex',
														flexDirection: 'column',
														height: '100%',
														justifyContent: 'center',
														alignItems: 'center',
													}}>
													prior to submit, You need to run{' '}
													<Button
														color='inherit'
														onClick={() => invokeCompile()}
														disabled={loadingTestResult}>
														Test
													</Button>{' '}
												</div>
											) : null}

											{loadingTestResult ? (
												<div
													style={{
														display: 'flex',
														flexDirection: 'column',
														height: '100%',
														justifyContent: 'center',
														alignItems: 'center',
													}}>
													<div>
														<Loader />
													</div>
													<div>Runnig test(s), please wait</div>
													<div style={{ fontSize: '10px' }}>
														Taking longer time? No worry, test case running time
														is not considered in chellenge completetion time
													</div>
												</div>
											) : null}

											{!codeModified && !loadingTestResult ? (
												<TestResult
													success={
														testResults.filter((d) => {
															return d.status === 0;
														}).length
													}
													failure={
														testResults.filter((d) => {
															return d.status === 1;
														}).length
													}
												/>
											) : null}
										</Panel>
									</div>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</div>
			)}
		</div>
	);
}

export default ChallengeGround;
