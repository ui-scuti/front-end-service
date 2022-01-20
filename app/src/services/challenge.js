import { submit } from './request';

// /data/challenges/challenge/:id
export const getChallenge = (id) => {
	return submit('data/challenges', 'challenge', 'challenges', id);
};
