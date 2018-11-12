import axios from '../services/axios';

export const fetchMyPoll = async () => {
	try {
		const response = await axios.get('/my-poll');

		if (response.status != 200) {
			throw new Error('Polls not loaded as expected');
		}

		return response.data;
	} catch(e) {
		console.log("Error", e);
		return {};
	}
}

export const storePoll = async (data) => {
	try {
		const response = await axios.post('/my-poll', data);

		if (response.status != 200) {
			throw new Error('Polls not loaded as expected');
		}

		return response.data;
	} catch(e) {
		console.log("Error -> ", e);
		return {};
	}
}