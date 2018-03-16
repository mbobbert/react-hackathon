import React from 'react';
import './task.css';

export class TaskForm extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            description: "",
            key:"",
            name:""

		};

    }
    render(){
        return(
        <div className="task-form">
				<label>Task Name:
					<input
						type="text"
						name="name"
						value={this.state.name}/>
				</label>
				<label>Description :
					<input
						type="text"
						name="description"
						value={this.state.description} />
				</label>
				<button>Add</button>
			</div>
        )
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
            </div>
        )
    }
}