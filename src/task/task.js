import React from 'react';
import './task.css';


let data = [
    {
        task_name: 'Name of task: Clean up code',
        time_spent: 'Time spent: 10 h',
        task_description: 'We have to make sure that we indent properly'
    },
    {
        task_name: 'Name of task: Clean up code',
        time_spent: 'Time spent: 10 h',
        task_description: 'We have to make sure that we indent properly'
    },
    {
        task_name: 'Name of task: Clean up code',
        time_spent: 'Time spent: 10 h',
        task_description: 'We have to make sure that we indent properly'
    }
]

export default class TaskList extends React.Component {
    render() {
        return (
            <div className="container">
            {
                data.map(
                    (task) => {
                        return (
                            <Task
                            task_name={task.task_name}
                            time_spent={task.time_spent}
                            task_description={task.task_description}/>
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
                <div className = "task-name"> {this.props.task_name}
                </div>
                <div className = "time-spent"> {this.props.time_spent}
                </div>
                <div className = "task-description"> {this.props.task_description}
                </div>
            </div>
        )
    }
}