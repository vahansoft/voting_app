import React from "react";

import {
	Grid,
	Row,
	Col,
	Button,
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock
} from 'react-bootstrap';

import { fetchMyPoll, storePoll } from '../actions/poll';

import CreatePoll from '../components/Poll/CreatePoll.jsx';

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			poll: null
		};

		this.savePoll = this.savePoll.bind(this);
		this.deletePoll = this.deletePoll.bind(this);
	}

	async componentDidMount() {
		const myPoll = await fetchMyPoll();

		if (myPoll) {
			this.setState({poll: myPoll});
		}
	}


	deletePoll() {

	}

	async savePoll(data) {
		const response = await storePoll(data);

		this.setState({poll: response});
	}

	render() {
		if (!this.state.poll) {
			return (
				<div>Loading...</div>
			)
		}

		return (
			<Grid>
				<Row>
					<Col md={12} className="text-right">
						<Button bsStyle="info" href={`/polls/${this.state.poll._id}/vote`}>Go To Vote Page</Button>
						<Button bsStyle="danger" onClick={this.deletePoll}>Reset Poll</Button>
					</Col>
				</Row>
				<CreatePoll poll={this.state.poll} onSave={this.savePoll} />
			</Grid>
		)
	}
}