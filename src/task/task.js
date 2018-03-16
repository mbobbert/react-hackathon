import React from 'react';
import './task.css';
import {Log,LogList} from '../log/log.js';


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
				<label className="label">Task Name:
					<input
						type="text"
						name="name"
						value={this.state.name}
                        onChange={this.dataChanged.bind(this)}/>
				</label>
				<label className="label">Description:
					<input
						type="text"
						name="description"
						value={this.state.description}
                        onChange={this.dataChanged.bind(this)}/>
				</label>
				<button className="button" onClick={this.sendPost.bind(this)}>Add</button>
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



//********************************TASK LIST ------------------------ */

export class TaskList extends React.Component {

    constructor(props) {
		super(props);

		this.state = {
            loaded: false,
            clicked: false,
            openedKey: null
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
                        var opened = false;
                        if(task.key == this.state.openedKey)
                            opened = true;

                        return (
                            <Task
                            name={task.name}
                            opened={opened}
                            description={task.description}
                            onTaskClick ={this.onTaskClick.bind(this)}
                            taskkey={task.key}/>

                        )
                    }
                )
			}
            </div>
        )
    }

    onTaskClick(taskkey) {
        //if the state is true set to false
        if(this.state.clicked){
            this.setState(
                {//if the clicked=true,set it to false, if
                    clicked: false,
                    openedKey:null

                }
            );
            //else set to true
        }else {
            this.setState(
                {
                    clicked: true,
                    openedKey:taskkey
                }
            );

        }
    }

}




//******************************TASK ------------------*/

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
                <button className="button" onClick={this.props.onTaskClick.bind(this,this.props.taskkey)}>View more</button>
                <LogList opened={this.props.opened}
                taskkey={this.props.taskkey}/>
            </div>
        )
    }


}