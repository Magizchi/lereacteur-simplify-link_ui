import React from 'react';
import LinkForm from '../components/linkForm';
import axios from 'axios';
class Form extends React.Component {
	state = {
		lien: '',
		liens: [],
		test: false,
		errorMessage: ''
	};

	handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		const statesToUpdate = {};
		statesToUpdate[name] = value;
		this.setState(statesToUpdate);
	};

	handleClick = async () => {
		const { lien, liens } = this.state;
		const httpRegex = /^(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))$/;
		console.log(httpRegex.test(lien));

		if (httpRegex.test(lien)) {
			const response = await axios.post('https://reacteur.herokuapp.com/', {
				lien: lien
			});
			console.log(response.data);
			this.setState({
				liens: [ ...liens, response.data ]
			});
		}
	};

	componentDidMount = async () => {
		const response2 = await axios.get('https://reacteur.herokuapp.com/');
		this.setState({
			liens: response2.data
		});
	};

	// a ajouter dans le BDD
	onClick = async (lien, index) => {
		const { liens } = this.state;
		const response = await axios.post('https://reacteur.herokuapp.com/addCounter', {
			lien: lien
		});
		liens[index] = response.data;
		this.setState({
			liens: liens
		});
	};
	render() {
		const { lien } = this.state;
		return (
			<div>
				<LinkForm
					//state
					lien={lien}
					//function
					handleChange={this.handleChange}
					handleClick={this.handleClick}
				/>
				<p>Exemple : https://www.google.fr</p>
				<div>
					{this.state.liens.map((lien, index) => {
						return (
							<div key={index}>
								<a href={lien.lien} style={{ marginRight: '50px' }}>
									{lien.lien}
								</a>
								<a href={lien.lien} onClick={() => this.onClick(lien.lien, index)}>
									{lien.newLien}
								</a>
								<p>{lien.counter}</p>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Form;
