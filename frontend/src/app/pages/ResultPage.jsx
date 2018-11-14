import React from "react";

import {
	Grid,
	Row,
	Col,
	ProgressBar,
	Modal
} from 'react-bootstrap';

import { fetchPoll } from '../actions/poll';

export default class ResultPage extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			poll: {},
		}
	}

	async componentDidMount() {
		let id = this.props.match.params.id;

		let poll = await fetchPoll(id);
		console.log("poll", poll);

		this.setState({poll});
	}

	render() {
		if (!this.state.poll._id) {
			return (
				<div>Loading...</div>
			)
		}
		const poll = this.state.poll;
		const totalVotes = Object.values(this.state.poll.results).reduce((s, v) => s + v, 0);

		return (
			<Grid key={0}>
				<Row>
					<form ref="poll">
				    	<Col md={12}>
					    	<Col md={12}>
					    		<h3>{poll.question}</h3>
					    		<p>
					    			<small>total Votes: {totalVotes}</small>
					    		</p>
					    		<div>
					    			{
					    				poll.options.map((option) => (
					    					<Col md={12} key={option._id}>
				    							<span>{option.answer}</span>
						    					<ProgressBar 
						    						now={poll.results[option._id] ? poll.results[option._id] * 100/totalVotes : 0} 
						    						label={poll.results[option._id] || 0}
						    					/>
					    					</Col>
							    		))
					    			}
								</div>
					    	</Col>
				    	</Col>
			    	</form>
			    </Row>
			</Grid>
		)
	}
}