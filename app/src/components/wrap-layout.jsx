import React, { useState, useEffect } from 'react';
import { ActionTypes, StorageKeys } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTachometerAlt,
	faFileSignature,
	faCalendarAlt,
	faArrowsAltH,
	faUserTie,
	faSignOutAlt,
	faCogs,
	faUserShield,
	faHome,
	faQuestion,
	faFileInvoice,
} from '@fortawesome/free-solid-svg-icons';

import {
	ProSidebar,
	Menu,
	MenuItem,
	SubMenu,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
} from 'react-pro-sidebar';
import logo from '../logo.svg';
import 'react-pro-sidebar/dist/css/styles.css';
import uifocuslogo from '../assets/uifocus/logo.png';
import { getAllSchedules } from '../services/daily-challenge';
import ErrorBoundary from '../components/error-boundary';
import { LocalStorage } from '../services';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProfileLogo = styled.div`
	border-top: 5px double #999;
	border-right: 5px double #999;
	border-bottom: 5px double #999;
	border-left: 5px double #999;
	border-radius: 50%;
	height: 70px;
	width: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const MenuMap = [
	{
		name: 'home',
		display: 'Home',
		link: '/home',
		icon: faHome,
	},
	{
		name: 'dashboard',
		display: 'Dashboard',
		link: '/dashboard',
		icon: faTachometerAlt,
		permissions: {
			or: ['c_m'],
		},
	},
	{
		name: 'admincorner',
		display: 'Admin Corner',
		link: '/home',
		icon: faUserTie,
		permissions: {
			or: ['c_m', 'u_m'],
		},
		submenus: [
			{
				name: 'preferrences',
				display: 'Preferrences',
				icon: faUserTie,
				permissions: {
					or: ['c_m'],
				},
				submenus: [
					{
						name: 'theme',
						display: 'Theme',
						link: '/preferences/theme',
						icon: faUserTie,
					},
					{
						name: 'branding',
						display: 'Branding',
						link: '/preferences/branding',
						icon: faUserTie,
					},
				],
			},
			{
				name: 'usermanagement',
				display: 'User Management',
				icon: faUserTie,
				permissions: {
					or: ['u_m'],
				},
				submenus: [
					{
						name: 'createuser',
						display: 'Create User',
						link: '/user/create',
						icon: faUserTie,
					},
					{
						name: 'resetpassword',
						display: 'Reset Password',
						link: '/user/reset',
						icon: faUserTie,
					},
				],
			},
		],
	},
	{
		name: 'challenges',
		display: 'Challenges',
		icon: faFileSignature,
		permissions: {
			or: ['s', 'u_m', 'c_m'],
		},
	},
	{
		name: 'dailychallenges',
		display: 'Daily Challenges',
		icon: faCalendarAlt,
		link: '/dc/home',
		permissions: {
			or: ['s', 'u_m', 'c_m'],
		},
	},
	{
		name: 'quizes',
		display: 'Quizes',
		icon: faQuestion,
		permissions: {
			or: ['s', 'u_m', 'c_m'],
		},
	},
	{
		name: 'tutorials',
		display: 'Tutorials',
		icon: faFileInvoice,
		permissions: {
			or: ['s', 'u_m', 'c_m'],
		},
	},
];

const WrapLayout = ({
	component: Component,
	route,
	routeProps,
	user,
	branding,
	...rest
}) => {
	const [hover, setHover] = useState(false);
	const [isCollapsed, setCollapsed] = useState(false);
	const [menu, setMenu] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadInitialDetails();
	}, [user, branding]);

	const loadInitialDetails = () => {
		// getAllSchedules().then((res) => {
		// 	// setChallenges(res);
		setMenu(prepareMenuObject([]));
		setLoading(false);
		// });
	};

	const prepareMenuObject = (challenges) => {
		const dailychallengesNode = MenuMap.filter((f) => {
			return f.name === 'dailychallenges';
		})[0];
		const submenus = [];
		dailychallengesNode.submenus = [];
		challenges.forEach((ch) => {
			submenus.push({
				name: `${ch.title}`,
				display: `${ch.title}`,
				link: `/challenges/home/${ch._id}`,
				icon: faUserTie,
			});
		});
		dailychallengesNode.submenus = submenus;
		return MenuMap;
	};

	const hasPermission = (menuObject) => {
		let resPerm = true;
		if (menuObject.permissions) {
			if (menuObject.permissions.or) {
				resPerm = userHasPermission(menuObject.permissions.or, false);
			}
			if (resPerm && menuObject.permissions.and) {
				resPerm = userHasPermission(menuObject.permissions.and, true);
			}
		}
		return resPerm;
	};

	const userHasPermission = (permList, isAnd) => {
		let res = true;
		if (!isAnd) {
			let localRes = false;
			user.user.permissions.forEach((up) => {
				if (!localRes) {
					localRes = permList.indexOf(up) > -1;
				}
			});
			res = localRes;
		} else {
			user.user.permissions.forEach((up) => {
				if (res) {
					res = permList.indexOf(up) > -1;
				}
			});
		}
		return res;
	};

	const getMenuElement = () => {
		let res = [];
		menu.forEach((m) => {
			res.push(getNode(m));
			// if(m.submenus && m.submenus.length) {
			//     let sMenus = [];
			//     m.submenus.forEach((sm) => {
			//         sMenus = res.concat(getSubMenuNode(sm));
			//     });
			//     res.push(<SubMenu title={`${m.display}`} icon={<FontAwesomeIcon icon={m.icon} />}>{sMenus}</SubMenu>);
			// }else{
			//     res = res.concat(getMenuNode(m));
			// }
		});
		return res;
	};

	const getNode = (node) => {
		if (hasPermission(node)) {
			if (node.submenus && node.submenus.length) {
				let sMenus = [];
				node.submenus.forEach((mNode) => {
					sMenus = sMenus.concat(getNode(mNode));
				});
				return (
					<SubMenu
						title={`${node.display}`}
						icon={<FontAwesomeIcon icon={node.icon} />}>
						{sMenus}
					</SubMenu>
				);
			} else {
				return (
					<MenuItem icon={<FontAwesomeIcon icon={node.icon} />}>
						<Link style={{ color: 'unset !important' }} to={`${node.link}`}>
							{node.display}{' '}
						</Link>
					</MenuItem>
				);
			}
		}
		return <></>;
	};

	return (
		<ErrorBoundary>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					overflow: 'hidden',
					height: '100%',
					flexBasis: '40%',
				}}>
				{/* <ProSidebar collapsed={isCollapsed} width={230} style={{ height: '100%' }} image={'https://azouaoui-med.github.io/react-pro-sidebar/static/media/bg1.74aaeeb9.jpg'}> */}
				<ProSidebar
					collapsed={isCollapsed}
					width={230}
					style={{ height: '100%' }}
					image={'https://wallpaper.dog/large/9568.jpg'}>
					<SidebarHeader>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: '12px',
							}}>
							<img
								src={isCollapsed ? branding.logosmall : branding.logolarge}
								height='50'
								alt='Brand Logo'
								onClick={() => setCollapsed(!isCollapsed)}
								style={{ cursor: 'pointer' }}
							/>
						</div>
					</SidebarHeader>
					{isCollapsed ? null : <SidebarHeader></SidebarHeader>}
					<SidebarContent style={{ height: '100%' }}>
						<Menu iconShape='circle' style={{ height: '100%' }}>
							<> {loading ? null : <>{getMenuElement()}</>}</>
							{/* <>
                                {user.user.permissions.indexOf('ADMIN') > -1 ? (<MenuItem icon={<FontAwesomeIcon icon={faTachometerAlt} />}><Link style={{ color: 'unset', fontWeight: '100' }} to="/" >Home</Link></MenuItem>) : (null)}

                            </>
                            <>
                                {user.user.permissions.indexOf('ADMIN') > -1 ? (
                                    < SubMenu title="Admin Corner" icon={<FontAwesomeIcon icon={faUserShield} />}>
                                        <MenuItem >Preferrences<a href={`/preferences/home`} /></MenuItem>
                                        <MenuItem >User Management<a href={`/user/management`} /></MenuItem>
                                        <MenuItem >Create User<a href={`/user/create`} /></MenuItem>
                                        <MenuItem >Branding<a href={`/preferences/branding`} /></MenuItem>
                                    </SubMenu>
                                ) : (null)}</>

                            <SubMenu title="Challenges" icon={<FontAwesomeIcon icon={faPenNib} />}>
                                <SubMenu title="Daily Challenges" >
                                    {
                                        challenges.map((ch, chind) => {
                                            return <MenuItem key={chind}>{ch.title}<a href={`/challenges/home/${ch._id}`} /></MenuItem>
                                        })
                                    }

                                </SubMenu>
                            </SubMenu>*/}
						</Menu>
					</SidebarContent>
					<SidebarFooter>
						{isCollapsed ? (
							<Menu iconShape='circle' style={{ height: '100%' }}>
								<MenuItem
									icon={<FontAwesomeIcon icon={faSignOutAlt} />}></MenuItem>
								<MenuItem icon={<FontAwesomeIcon icon={faCogs} />}></MenuItem>
							</Menu>
						) : (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '12px',
								}}>
								<ProfileLogo>
									{user.user.imageUrl ? (
										<img
											src={`${user.user.imageUrl}`}
											alt='user profile'
											className='rounded-full'
											height='50px'
											width='50px'
										/>
									) : (
										<FontAwesomeIcon icon={faUserTie} size='2x' />
									)}
								</ProfileLogo>
								<div
									style={{
										flex: 1,
										display: 'flex',
										flexDirection: 'column',
										height: '80px',
									}}>
									<div
										style={{
											flex: 1,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}>
										{user.user.name}
									</div>
									<div style={{ display: 'flex', fontSize: '8px' }}>
										<div
											style={{
												flex: 1,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												cursor: 'pointer',
											}}
											onClick={() => rest.logoutSuccess()}>
											Logout
										</div>
									</div>
								</div>
							</div>
						)}
					</SidebarFooter>
				</ProSidebar>
				{/* <AppNavBar></AppNavBar> */}
				<Component route={route} {...rest} />
			</div>
		</ErrorBoundary>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user,
		theme: state.themeReducer.theme,
		branding: state.brandingReducer.branding,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logoutSuccess: () => dispatch({ type: ActionTypes.LOGOUT_SUCCESS }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WrapLayout);
