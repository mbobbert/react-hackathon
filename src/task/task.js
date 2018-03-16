import React from 'react';
import './task.css';
import {Log} from '../log/log.js';


export class TaskForm extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            description: "",
            key:"",
            name:""
		}
    }

    render(){
        return(
        <div className="task-form">
				<label>Task Name:
					<input
						type="text"
						name="name"
						value={this.state.name}
                        onChange={this.dataChanged.bind(this)}/>
				</label>
				<label>Description :
					<input
						type="text"
						name="description"
						value={this.state.description}
                        onChange={this.dataChanged.bind(this)}/>
				</label>
				<button onClick={this.sendPost.bind(this)}>Add</button>
		</div>
        )
    }

    dataChanged(event) {
		var newState = {};
		newState[event.target.name] = event.target.value;
		this.setState(newState);
    }
    sendPost() {
		fetch('http://worklog.podlomar.org/tasks/create',
			{
				mode: 'no-cors',
				method: "POST",
				body: JSON.stringify(this.state),
				headers: {
					"Content-Type": "application/json"
				}
			}
		).then(function(response) {
            location.reload();
		});
	}
}

export class TaskList extends React.Component {

    constructor(props) {
		super(props);

		this.state = {
            loaded: false,

		};
    }


    componentWillMount() {
		fetch('http://worklog.podlomar.org/tasks')
			.then(response => response.json())
			.then(
				(json) => {
					this.setState(
						{
							loaded: true,
							tasks: json
						}
					);
				}
			);
	}



    render() {

        if(!this.state.loaded)
            return <h1>Loading...</h1>;

        return (
            <div className="container">
            {
                this.state.tasks.map(
                    (task) => {
                        return (
                            <Task
                            name={task.name}

                            description={task.description}/>
                        )
                    }
                )
			}
            </div>
        )
    }
}


 class Task extends React.Component {
    render() {
        return (
            <div className = "task">
                <div className = "task-name">
                {this.props.name}
                </div>

                <div className = "task-description">
                {this.props.description}
                </div>
                <button>View more</button>
                <Log />
            </div>
        )
    }
}