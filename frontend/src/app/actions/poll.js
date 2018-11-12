import axios from '../services/axios';

export const fetchPoll = async (id) => {
	try {
		const request = await axios.get(`/polls/${id}`);

		if (request.status == 200) {
			return request.data;
		}

		throw new Error('Polls not loaded as expected');
	} catch(e) {
		console.log("Error", e);
		return {};
	}
}

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

export const votePoll = async (id, data) => {
	try {
		const request = await axios.post(`/polls/${id}/vote`, data);

		if (request.status != 200) {
			throw new Error('Polls not loaded as expected');
		}

		return request.data;
	} catch(e) {
		console.log("Error", e);
		return {};
	}
}