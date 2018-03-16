import React from 'react';
import '../task/task.js';
import './log.css';



export class LogList extends React.Component {

    constructor(props) {
		super(props);

		this.state = {
            loaded: false,
		};
    }
    componentWillMount() {
		fetch('http://worklog.podlomar.org/task/'+this.props.taskkey+'/logs')
			.then(response => response.json())
			.then(
				(json) => {
					this.setState(
						{
							loaded: true,
							logs: json
						}
					);
				}
			);
    }

    render() {
        console.log('hi');
        if(this.props.opened) {
            if(!this.state.loaded)
                return <h1>Loading...</h1>;

            return (
                <div className="container">
                {
                    this.state.logs.map(
                        (log) => {
                            return (
                                <Log
                                user={log.user}
                                description={log.description}
                                hours={log.hours}
                                taskkey={this.props.taskkey}
                                />
                            )
                        }
                    )
                }
                </div>
            )
        } else {
            return <div></div>;
        }
    }
}


export class Log extends React.Component {
    render() {
            return (
                <div className="log-overview">
                    <div className="log-name">Username: {this.props.user}
                    </div>

                    <div className="log-description">Description: {this.props.description}
                    </div>
                    <div className="log-time-spent">Time spent: {this.props.hours} hours.
                    </div>

                </div>
            );
    }
}