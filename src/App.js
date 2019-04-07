import React, { Component } from 'react';
import './App.css';

//Container
import Form from './containers/Form';

class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Copie bitly</h1>
				<Form />
			</div>
		);
	}
}

export default App;
