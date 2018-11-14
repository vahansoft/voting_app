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

import { fetchMyPoll, storePoll, deleteMyPoll } from '../actions/poll';

import CreatePoll from '../components/Poll/CreatePoll.jsx';

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			poll: null
		};

		this.savePoll = this.savePoll.bind(this);
		this.resetPoll = this.resetPoll.bind(this);
	}

	async componentDidMount() {
		const myPoll = await fetchMyPoll();

		if (myPoll) {
			this.setState({poll: myPoll});
		}
	}


	async resetPoll() {
		const response = await deleteMyPoll(this.state.poll._id);

		this.setState({
			poll: null
		});
	}

	async savePoll(data) {
		const response = await storePoll(data);

		this.setState({poll: response});
	}

	render() {

		return (
			<Grid>
				<Row>
					<Col md={12} className="text-right">
						{this.state.poll && [(
							<Button key={0} bsStyle="info" href={`/polls/${this.state.poll._id}/vote`}>Go To Vote Page</Button>
						), (
							<Button key={1} bsStyle="danger" onClick={this.resetPoll}>Reset Poll</Button>
						)]}
					</Col>
				</Row>
				<CreatePoll poll={this.state.poll} onSave={this.savePoll} />
			</Grid>
		)
	}
}