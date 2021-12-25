import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './login.css';
import TextField from '@material-ui/core/TextField';
import { LocalStorage, User, ThemeService, getBranding } from '../../services';
import { ActionTypes, StorageKeys } from '../../constants';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import {
	faGoogle,
	faFacebook,
	faGithub,
} from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import LoginGithub from 'react-login-github';

import { IndeterminateLoader } from '../../components/styled';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: 200,
		},
	},
}));
function Login(props) {
	const classes = useStyles();
	const [userName, setUserName] = useState('');
	const [name, setName] = useState('');
	const [sigupPassword, setSigupPassword] = useState('');
	const [sigupConfirmPassword, setSigupConfirmPassword] = useState('');
	const [password, setPassword] = useState('');
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [isRegistering, setIsRegistering] = useState(false);
	const { addToast } = useToasts();

	useEffect(() => {
		// initialize();
	});
	// let getButtons = (e) => e.preventDefault()

	let changeForm = (e) => {
		let switchCtn = document.querySelector('#switch-cnt');
		let switchC1 = document.querySelector('#switch-c1');
		let switchC2 = document.querySelector('#switch-c2');
		let switchCircle = document.querySelectorAll('.switch__circle');
		let switchBtn = document.querySelectorAll('.switch-btn');
		let aContainer = document.querySelector('#a-container');
		let bContainer = document.querySelector('#b-container');
		let allButtons = document.querySelectorAll('.submit');
		switchCtn.classList.add('is-gx');
		setTimeout(function () {
			switchCtn.classList.remove('is-gx');
		}, 1500);

		switchCtn.classList.toggle('is-txr');
		switchCircle[0].classList.toggle('is-txr');
		switchCircle[1].classList.toggle('is-txr');

		switchC1.classList.toggle('is-hidden');
		switchC2.classList.toggle('is-hidden');
		aContainer.classList.toggle('is-txl');
		bContainer.classList.toggle('is-txl');
		bContainer.classList.toggle('is-z200');
	};

	const doSignin = (obj) => {
		if (!obj) {
			obj = {
				username: userName,
				password: password,
			};
		}
		setIsLoggingIn(true);
		User.authenticate(obj)
			.then((res) => {
				const token = res.token;
				LocalStorage.saveInLocalStorage(StorageKeys.LOGIN_TOKEN, token);
				const promises = [];
				promises.push(getBranding());
				promises.push(User.getPermissions());
				return Promise.all(promises).then((resP) => {
					const branding = resP[0];
					let perm = resP[1];
					if (!Array.isArray(perm) || perm.length === 0) {
						perm = ['c'];
					} else {
						res.permissions = perm;
						props.brandingUpdated(branding);
						props.loginSuccess(token, res);
					}
				});
			})
			.finally(() => {
				setIsLoggingIn(false);
			});
	};

	const doRegister = () => {
		if (sigupPassword && sigupConfirmPassword) {
			setIsRegistering(true);
			User.register(userName, name, sigupPassword)
				.then((res) => {})
				.finally(() => {
					setIsRegistering(false);
				});
		}
	};

	const registerWithGoogle = (response) => {
		setIsRegistering(true);
		const userobj = {
			username: response.profileObj.email,
			accessToken: response.accessToken,
			id: response.googleId,
			firstName: response.profileObj.givenName,
			lastName: response.profileObj.familyName,
			imageUrl: response.profileObj.imageUrl,
			name: response.profileObj.name,
			email: response.profileObj.email,
		};
		User.register(userobj).then((res) => {
			setIsRegistering(false);
		});
	};

	const registerWithGithub = (response) => {
		setIsRegistering(true);
		const userobj = {
			username: response.profileObj.email,
			accessToken: response.accessToken,
			id: response.googleId,
			firstName: response.profileObj.givenName,
			lastName: response.profileObj.familyName,
			imageUrl: response.profileObj.imageUrl,
			name: response.profileObj.name,
			email: response.profileObj.email,
		};
		User.register(userobj).then((res) => {
			setIsRegistering(false);
		});
	};

	const loginWithGoogle = (response) => {
		const userobj = {
			accessToken: response.accessToken,
			id: response.googleId,
			firstName: response.profileObj.givenName,
			lastName: response.profileObj.familyName,
			imageUrl: response.profileObj.imageUrl,
			name: response.profileObj.name,
			email: response.profileObj.email,
		};
		doSignin(userobj);
	};

	const responseGoogle = (response) => {
		console.log(response);
	};
	const responseFacebook = (response) => {
		console.log(response);
	};
	return (
		<div className='main-wrapper'>
			<div id='image'>
				<div className='badge'>Beta</div>
			</div>
			<div className='main'>
				<div className='container a-container' id='a-container'>
					<form className='form' id='a-form' method='' action=''>
						<h2 className='form_title title'>Register Yourself</h2>

						<div className='input input-signup grid gap-4 grid-cols-2'>
							<div className='inputBox'>
								<label>Name</label>
								<input
									type='text'
									placeholder='Bob Michel'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className='inputBox'>
								<label>Email</label>
								<input
									type='text'
									placeholder='example@xyz.com'
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
								/>
							</div>
							<div className='inputBox'>
								<label>Password</label>
								<input
									type='password'
									placeholder='password'
									value={sigupPassword}
									onChange={(e) => setSigupPassword(e.target.value)}
								/>
							</div>
							<div className='inputBox'>
								<label>Confirm password</label>
								<input
									type='password'
									placeholder='password'
									value={sigupConfirmPassword}
									onChange={(e) => setSigupConfirmPassword(e.target.value)}
								/>
							</div>
							<div className='inputBox  col-span-2'>
								<input
									type='submit'
									value='Signup'
									onClick={() => doRegister()}
								/>
							</div>

							<div className='flex justify-between items-center mt-3 text-gray-300 col-span-2'>
								<hr className='w-full' />{' '}
								<span className='p-2 text-gray-400 mb-1'>OR</span>
								<hr className='w-full' />
							</div>
							<div className='w-full flex justify-center items-center col-span-2'>
								<GoogleLogin
									clientId='887053189788-btdj1a42i1ej1s6an8fms3n5ihra4qh5.apps.googleusercontent.com'
									render={(renderProps) => (
										<button
											onClick={renderProps.onClick}
											disabled={renderProps.disabled}
											className='button-circle-bottom'>
											<FontAwesomeIcon icon={faGoogle} />
										</button>
									)}
									onSuccess={registerWithGoogle}
									onFailure={responseGoogle}
									cookiePolicy={'single_host_origin'}></GoogleLogin>
								<button className='button-circle-bottom'>
									<FontAwesomeIcon icon={faFacebook} />
								</button>
								<button className='button-circle-bottom'>
									<FontAwesomeIcon icon={faGithub} />
								</button>
							</div>

							<div className='w-full col-span-2'>
								{isRegistering ? (
									<IndeterminateLoader>
										<div />
									</IndeterminateLoader>
								) : null}
							</div>
						</div>
					</form>
				</div>
				<div className='container b-container' id='b-container'>
					<div className='form'>
						<h2>Login</h2>

						<div className='input'>
							<div className='inputBox'>
								<label>Email</label>
								<input
									type='text'
									placeholder='example@xyz.com'
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
								/>
							</div>
							<div className='inputBox'>
								<label>Password</label>
								<input
									type='password'
									placeholder='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className='inputBox'>
								<input
									type='submit'
									value='Signin'
									disabled={isLoggingIn}
									onClick={() => doSignin()}
								/>
							</div>
							<div className='flex justify-between items-center mt-3 text-gray-300'>
								<hr className='w-full' />{' '}
								<span className='p-2 text-gray-400 mb-1'>OR</span>
								<hr className='w-full' />
							</div>
							<div className='w-full flex justify-center items-center'>
								<button className='button-circle-bottom mf-img-button'></button>
								<GoogleLogin
									clientId='887053189788-btdj1a42i1ej1s6an8fms3n5ihra4qh5.apps.googleusercontent.com'
									render={(renderProps) => (
										<button
											onClick={renderProps.onClick}
											disabled={renderProps.disabled}
											className='button-circle-bottom'>
											<FontAwesomeIcon icon={faGoogle} />
										</button>
									)}
									onSuccess={loginWithGoogle}
									onFailure={responseGoogle}
									cookiePolicy={'single_host_origin'}></GoogleLogin>
								<button className='button-circle-bottom'>
									<FontAwesomeIcon icon={faFacebook} />
								</button>
								<button className='button-circle-bottom github'>
									<LoginGithub
										clientId='ef776328a71436f56e69'
										render={(renderProps) => (
											<button
												onClick={renderProps.onClick}
												disabled={renderProps.disabled}
												className='button-circle-bottom'>
												<FontAwesomeIcon icon={faGoogle} />
											</button>
										)}
										onSuccess={registerWithGithub}
										onFailure={responseGoogle}
									/>
									<FontAwesomeIcon icon={faGithub} />
								</button>
							</div>
						</div>
					</div>
					<>
						{isLoggingIn ? (
							<IndeterminateLoader>
								<div />
							</IndeterminateLoader>
						) : null}
					</>
				</div>
				<div className='switch' id='switch-cnt'>
					<div className='switch__circle'></div>
					<div className='switch__circle switch__circle--t'></div>
					<div className='switch__container' id='switch-c1'>
						<h2 className='switch__title title text-gery-700'>Welcome to </h2>
						<h2 className='switch__title title product-name'>The Challenger</h2>
						<p className='switch__description description text-gery-300'>
							Nothing is more powerful than allowing yourself to be truly
							affected by things
						</p>
						<button
							className='switch__button button switch-btn'
							onClick={() => changeForm()}>
							SIGN IN
						</button>
					</div>
					<div className='switch__container is-hidden' id='switch-c2'>
						<h2 className='switch__title title'>No account yet?</h2>
						<p className='switch__description description'>
							Signup and discover the awesomeness{' '}
						</p>
						<button
							className='switch__button button switch-btn'
							onClick={() => changeForm()}>
							SIGN UP
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user,
		theme: state.themeReducer.theme,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginSuccess: (token, user) =>
			dispatch({ type: ActionTypes.LOGIN_SUCCESS, token: token, user: user }),
		brandingUpdated: (branding) =>
			dispatch({ type: ActionTypes.BRANDING_UPDATED, branding: branding }),
		logoutSuccess: (token, role) =>
			dispatch({ type: ActionTypes.LOGOUT_SUCCESS }),
		updateTheme: (theme) =>
			dispatch({ type: ActionTypes.THEME_UPDATED, theme: theme }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
