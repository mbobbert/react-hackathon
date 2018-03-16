import React from 'react';
import '../task/task.js';
import './log.css';

export class Log extends React.Component {
    render() {
        return(
            <div>
                <div className="log-name">Jordan Gray
                </div>
                <div className="log-description">Fixing bug
                </div>
                <div className="log-time-spent">6 h
                </div>
            </div>
        )

    }
}