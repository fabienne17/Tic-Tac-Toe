import React from 'react';
import ReactDOM from 'react-dom';

import Board from './board.jsx';

class App extends React.Component{
	constructor(){
        super();
        this.resetBoard = this.resetBoard.bind(this);
        this.state = {
            board: ()=><Board />
        };
    }
    resetBoard() {
        this.setState({
            board: ()=><Board/>
        });
    }
    render() {   
        const ActiveBoard = this.state.board;
        return (
            <div className="container text-center">
                <ActiveBoard />
                <span id='reset' 
                      type="button"
                      className="btn btn-success"
                      onClick={this.resetBoard}>
                    RESET
                </span>
            </div>
        );
    }

};

// Render the Component
ReactDOM.render(<App />, document.getElementById('app'));
