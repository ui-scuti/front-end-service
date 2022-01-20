import React from 'react';
import ChallengeGround from '../pages/challenge-ground';
import ChallengeHome from '../pages/challenge-home';
import Dashboard from '../pages/dashboard';
import DailyChallengeCreate from '../pages/dailychallenge/create';
import DailyChallengeHome from '../pages/dailychallenge/home';
import Home from '../pages/home';
import Preference from '../pages/preference';
import Branding from '../pages/branding';

// import ConfigForm from '../pages/config';

const getRoutes = () => {
	const res = [];
	res.push({
		path: `/dc/challengess/:id`,
		component: ChallengeHome,
	});
	res.push({
		path: `/challenges/ground/:sid/:cid`,
		component: ChallengeGround,
	});
	res.push({
		path: `/home`,
		component: Home,
	});
	res.push({
		path: `/preferences/home`,
		component: Preference,
	});
	res.push({
		path: `/preferences/branding`,
		component: Branding,
	});
	res.push({
		path: `/dashboard`,
		component: Dashboard,
	});

	res.push({
		path: `/dc/create`,
		component: DailyChallengeCreate,
	});
	res.push({
		path: `/dc/home`,
		component: DailyChallengeHome,
	});
	return res;
};

export const routes = getRoutes;
