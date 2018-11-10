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

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}


export default class HomePage extends React.Component {
	render() {
		return (
			<Grid>
				<Row>
					<Col md={12} className="text-right">
						<Button bsStyle="danger">Reset Poll</Button>
					</Col>
				</Row>
				<Row>
			    	<Col md={12}>
			    		<FieldGroup
							type="text"
							label="Question"
							placeholder="Enter question here"
					    />
				    	<Col md={12}>
				    		<FieldGroup
								type="text"
								label="Answer"
								placeholder="Enter answer here"
						    />
					    	
					    	<Button bsStyle="info">+ add answer</Button>
				    	</Col>
				    	<Col md={12}>
					    	<Button className="pull-right" bsStyle="success">Save</Button>
				    	</Col>
			    	</Col>
			    </Row>
			</Grid>
		)
	}
}