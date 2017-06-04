import React from 'react';
import ReactDOM from 'react-dom';

import Board from './board.jsx';

class App extends React.Component{
	constructor(){
        super();
        this.state = {};
    }
    render() {   

        return (
            <div className="container">
                <Board />
            </div>
        );
    }

};

// Render the Component
ReactDOM.render(<App />, document.getElementById('app'));
