import { submit } from './request';

export const getAllSchedules = () => {
	return submit('data', 'challenges', 'daily');
};

export const getAllSchedulesChallenges = () => {
	return submit('data', 'challenges', 'daily').then((res) => {
		const promises = [];
		res.forEach((sc) => {
			promises.push(submit('data', 'challenges', 'daily', sc.id));
		});

		return Promise.all(promises);
	});
};

export const getSchedule = (id) => {
	return submit('data', 'challenges', 'daily', id);
};

// /data/challenges/daily/challenges/:id
export const getChallenges = (id) => {
	return submit('data/challenges', 'daily', 'challenges', id);
};

export const createDailyChallenge = (obj) => {
	return submit('data/challenges', 'daily', undefined, undefined, 'post', obj);
};
