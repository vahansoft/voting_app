import React from "react";

import {
	Row,
	Col,
	Button,
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock
} from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}


const initialState = {
	question: '',
	options: [{
		answer: ''
	}]
};

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.props.poll || initialState;

		this.addOption = this.addOption.bind(this);
		this.updateOption = this.updateOption.bind(this);
		this.removeOption = this.removeOption.bind(this);
		this.save = this.save.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		let poll = nextProps.poll || initialState;
		
    	this.setState(poll);
    }

	addOption() {
		this.setState((prevState) => {
			prevState.options.push({
				answer: ''
			});

			return prevState;
		});
	}

	updateOption(index, value) {
		this.setState((prevState) => {
			prevState.options[index].answer = value;

			return prevState;
		});
	}

	removeOption(index) {
		this.setState((prevState) => {
			prevState.options.splice(index, 1);

			return prevState;
		});
	}

	save() {
		this.props.onSave(this.state);
	}

	render() {
		return (
			<Row>
		    	<Col md={12}>
		    		<FieldGroup
						type="text"
						label="Question"
						placeholder="Enter question here"
						onChange={(e) => this.setState({question: e.target.value})}
				    	defaultValue={this.state.question}
				    />
			    	<Col md={12}>
			    		{ this.renderOptionsList(this.state.options || []) }
				    	
				    	<Button bsStyle="info" onClick={this.addOption}>+ add answer</Button>
			    	</Col>
			    	<Col md={12}>
				    	<Button className="pull-right" bsStyle="success" onClick={this.save}>Save</Button>
			    	</Col>
		    	</Col>
		    </Row>
		)
	}

	renderOptionsList(options) {
		return options.map((option, index) => (
			<Row key={index}>
				<Col md={11}>
					<FieldGroup
						type="text"
						label={"Answer " + (index + 1)}
						placeholder="Enter answer here"
						defaultValue={option.answer || ''}
						onChange={(e) => this.updateOption(index, e.target.value)}
				    />
				</Col>
				<Col md={1}>
			    	<Button bsStyle="danger" bsSize="sm" onClick={(e) => this.removeOption(index)}>X</Button>
				</Col>
			</Row>
		));
	}
}