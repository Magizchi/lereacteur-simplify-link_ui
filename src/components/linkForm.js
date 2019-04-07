import React from 'react';

class LinkForm extends React.Component {
	render() {
		return (
			<div>
				<input type="text" value={this.props.lien} name="lien" onChange={this.props.handleChange} />
				<button onClick={() => this.props.handleClick()}>Créer</button>
			</div>
		);
	}
}

export default LinkForm;
