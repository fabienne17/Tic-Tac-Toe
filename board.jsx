import React from 'react';
import ReactDOM from 'react-dom';

export default class Board extends React.Component {
	constructor(){
		super();
		this.state = {
			playerTile: "X",
			computerTile: "O",
			moves: ["0","1","2","3","4","5","6","7","8"],
			placesLeft: [0,1,2,3,4,5,6,7,8]
		};
	}

	componentDidMount(){
		$('#reset').hide();
	}
    
    pickTile(tile){
    	var playerTile = tile.target.value;
    	var computerTile = playerTile == "X" ? "O" : "X";
		$('#modalO').attr('disabled', true);		
		$('#modalX').attr('disabled', true);
    	$('#tileMessage').text("You chose: " + playerTile);
    	//console.log("player: " + playerTile);
    	//console.log("computer: " + computerTile);
    	this.setState({
    		playerTile: playerTile,
    		computerTile: computerTile
    	});
    }

	playerMove(cell){
		
		//local copy of moves
		var placesLeft = this.state.placesLeft;
		var moves = this.state.moves;
		//console.log(placesLeft);
		//console.log(moves);

		this.checkWinner(placesLeft, moves);

		//local copy of player tile and move
		var playerMove = Number(cell.target.id);
		var playerTile = this.state.playerTile;

		//change html at target and disable
		$('#' + playerMove).attr('disabled', true);		
		
		//keep track of player moves
		moves[playerMove] = playerTile;
		placesLeft.splice(placesLeft.indexOf(playerMove), 1);
		//console.log("playerMove: " + playerMove);
		//console.log(placesLeft);

		//local copy of computer tile
		var computerTile = this.state.computerTile;

		//random computer move based on places left
		var computerMove = placesLeft[Math.floor(Math.random() * placesLeft.length)];
		//console.log("computerMove: " + computerMove);

		//change html at target and disable
		$('#' + computerMove).attr('disabled', true);

		//keep track of computer moves
		placesLeft.splice(placesLeft.indexOf(computerMove), 1);
		moves[computerMove] = computerTile;
		//console.log(placesLeft);

		//update global variables
		this.setState({
			moves: moves,
			placesLeft: placesLeft
		});

		this.checkWinner(placesLeft, moves);
	}
	
	checkWinner(placesLeft, moves) {
		
		var row1 = false;
		var row2 = false;
		var row3 = false;
		var column1 = false;
		var column2 = false;
		var column3 = false;
		var diagonal1 = false;
		var diagonal2 = false;
		var loser, winner;

		//rows
		if ((moves[0] === moves[1]) && (moves[1] === moves[2]) && (moves[2] === moves[0])) {
			row1 = true;
			winner = moves[0];
		};
		//console.log("row1: "+ row1);

		if ((moves[3] === moves[4]) && (moves[4] === moves[5]) && (moves[5] === moves[3])){
			row2 = true;
			winner = moves[3];
		};
		//console.log("row2: "+ row2);

		if ((moves[8] === moves[7]) && (moves[7] === moves[6]) && (moves[6] === moves[8])){
			row3 = true;
			winner = moves[8];
		};
		//console.log("row3: "+ row3);

		//diagonals
		if ((moves[0] === moves[4]) && (moves[4] === moves[8]) && (moves[8] === moves[0])){
			diagonal1 = true;
			winner = moves[0];
		};
		//console.log("diagnonal1: "+ diagonal1);

		if ((moves[2] === moves[4]) && (moves[4] === moves[6]) && (moves[6] === moves[2])){
			diagonal2 = true;
			winner = moves[2];
		};
		//console.log("diagonal2: "+ diagonal2);

		//columns
		if ((moves[0] === moves[3]) && (moves[3] === moves[6]) && (moves[6] === moves[0])){
			column1 = true;
			winner = moves[0];
		};
		//console.log("column1: "+ column1);

		if ((moves[1] === moves[4]) && (moves[4] === moves[7]) && (moves[7] === moves[1])){
			column2 = true;
			winner = moves[1];
		};
		//console.log("column2: "+ column2);

		if ((moves[2] === moves[5]) && (moves[5] === moves[8]) && (moves[2] === moves[8])){
			column3 = true;
			winner = moves[2];
		};
		//console.log("column3: "+ column3);
		
		if (row1 || row2 || row3 || column1 || column2  || column3 || diagonal1  || diagonal2) {

			loser = winner === "X" ? "O" : "X";
			$('#message').hide();
			$('#reset').show();
			$('#modal' + loser).hide();
			$('#winner').text('Winner: ');
			$('button').attr('disabled', true);
		}
	}

	render() {
		//Board
		const boardStyle = {
			width: "240px",
			height: "240px",
			margin: "auto",
			fontSize: '36px',
		};
		const tdStyle = {
			verticalAlign: "middle",	
		};	
		const buttonStyle = {
			width: '70px',
			height: '70px',
			cursor: 'pointer',
			backgroundColor:"#222222",
			color: "#fff",
			textAlign: "center",
			textTransform: "uppercase"
		};

		return (
			<div className="container text-center">
				<h1>Tic Tac Toe</h1>
				<div>
					<div id='message' className="btn btn-primary">
					    <span id='tileMessage'>Pick a Tile</span>
					</div>
					<div>
						<span id='winner'></span>
						<button className='btn btn-success' 
						        value='X'
						        id='modalX'
						        onClick={this.pickTile.bind(this)}
						        >X</button>
						<button className='btn btn-success' 
								value='O' 
								id='modalO'
								onClick={this.pickTile.bind(this)}>O</button>
					</div>				
				</div>
				
				<div>
					<table className="table table-bordered" style={boardStyle}>
						<tbody>
							<tr>
								<td style={tdStyle}>
									<button id="0"
										style={buttonStyle}
										onClick={this.playerMove.bind(this)}>
									    {this.state.moves[0]}
									</button>
								</td>
								<td style={tdStyle}>
									<button id="1"
									    style={buttonStyle}									       
									    onClick={this.playerMove.bind(this)}>
									    {this.state.moves[1]}
									</button>
								</td>
								<td style={tdStyle}>
									<button id="2"
									       style={buttonStyle}									       
									       onClick={this.playerMove.bind(this)}>
									    {this.state.moves[2]}
									</button>
								</td>
							</tr>
							<tr>
								<td style={tdStyle}>
									<button id="3"
									       style={buttonStyle}									       
									       onClick={this.playerMove.bind(this)}>
									    {this.state.moves[3]}
									</button>
								</td>
								<td style={tdStyle}>
									<button id="4"
									       style={buttonStyle}									       
									       onClick={this.playerMove.bind(this)}>
									    {this.state.moves[4]}
									</button>
								</td>
								<td style={tdStyle}>
									<button id="5"
									       style={buttonStyle}									       
									       onClick={this.playerMove.bind(this)}>
									    {this.state.moves[5]}
									</button>
								</td>
							</tr>
							<tr>
								<td style={tdStyle}>
									<button id="6"
									       style={buttonStyle}									       
									       onClick={this.playerMove.bind(this)}>
									    {this.state.moves[6]}
									</button>
								</td>
								<td style={tdStyle}>
									<button id="7"
									       style={buttonStyle}									       
									       onClick={this.playerMove.bind(this)}>
									    {this.state.moves[7]}
									</button>
								</td>
								<td style={tdStyle}>
									<button id="8"
									       style={buttonStyle}									       
									       onClick={this.playerMove.bind(this)}>
									    {this.state.moves[8]}
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
};