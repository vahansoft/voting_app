import React from "react";

import {
	Grid,
	Row,
	Col,
	Button,
	ButtonToolbar,
	ToggleButtonGroup,
	ToggleButton,
	ProgressBar,
	Modal
} from 'react-bootstrap';

import { fetchPoll, votePoll } from '../actions/poll';

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			poll: {},
			choosedAnswer: false,
			showSuccessVoteModal: false
		}

		this.vote = this.vote.bind(this);
	}

	async componentDidMount() {
		let id = this.props.match.params.id;

		let poll = await fetchPoll(id);

		this.setState({poll});
	}

	async vote() {
		const pollId = this.state.poll._id;
		const option = this.state.choosedAnswer;

		const response = await votePoll(pollId, {option});

		this.setState({
			showSuccessVoteModal: true
		});
	}

	render() {
		if (!this.state.poll._id) {
			return (
				<div>Loading...</div>
			)
		}

		const poll = this.state.poll

		return (
			<Grid key={0}>
				<Row>
			    	<Col md={12}>
				    	<Col md={12}>
				    		<h3>{poll.question}</h3>
				    		{this.renderOptionsList()}
				    		
				    	</Col>

				    	<Button bsStyle="success" onClick={this.vote} block>Vote</Button>
			    	</Col>
			    </Row>

			    {this.renderModal()}
			</Grid>
		)
	}

	renderOptionsList() {
		const options = this.state.poll.options;

		return (
			<ButtonToolbar>
				<ToggleButtonGroup type="radio" name="options" vertical block onChange={value => this.setState({choosedAnswer: value})}>
					{
						options.map((option) => (
							<ToggleButton key={option._id} value={option._id}>
								{option.answer}
							</ToggleButton>
						))
					}
				</ToggleButtonGroup>
			</ButtonToolbar>
		);
	}

	renderModal() {
		const show = this.state.showSuccessVoteModal;
		const pollId = this.state.poll._id;

		return (
			<Modal show={show}>
			    <Modal.Header>
			      <Modal.Title>Vote Success</Modal.Title>
			    </Modal.Header>

			    <Modal.Body>Thank you for your answer.</Modal.Body>

			    <Modal.Footer>
			      <Button bsStyle="primary" href={`/polls/${pollId}`}>Show Results</Button>
			    </Modal.Footer>
			</Modal>
		)
	}
}