import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import {TaskList,TaskForm} from './task/task.js';
import Log from './log/log.js';



class App extends React.Component {
	render() {
		return (
			<div>
				<h1>To do list</h1>
				<div className="container">
					<TaskForm />
					<TaskList />
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
)
