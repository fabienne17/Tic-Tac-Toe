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
    	console.log("player: " + playerTile);
    	console.log("computer: " + computerTile);
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

		//local copy of player tile and move
		var playerMove = Number(cell.target.id);
		var playerTile = this.state.playerTile;

		//change html at target and disable
		$('#' + playerMove).html(playerTile).attr('disabled', true);		
		
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
		$('#' + computerMove).html(computerTile).attr('disabled', true);

		//keep track of computer moves
		placesLeft.splice(placesLeft.indexOf(computerMove), 1);
		moves[computerMove] = computerTile;
		//console.log(placesLeft);


		//update global variables
		this.setState({
			moves: moves,
			placesLeft: placesLeft
		});

		//console.log(moves);

    	this.checkWinner(placesLeft, moves);
	}
	
	checkWinner(placesLeft, moves) {
		
		var row1, row2, row3, column1, column2, column3, diagonal1, diagonal2, loser;

		//rows
		var row1 = ((moves[0] === moves[1]) && (moves[1] === moves[2]) && (moves[2] === moves[0])) ? [moves[0],true] : false;
		console.log("row1: "+ row1);

		var row2 = ((moves[3] === moves[4]) && (moves[4] === moves[5]) && (moves[5] === moves[3])) ? [moves[3],true] : false;
		console.log("row2: "+ row2);

		var row3 = ((moves[8] === moves[7]) && (moves[7] === moves[6]) && (moves[6] === moves[8])) ? [moves[8],true] : false;
		console.log("row3: "+ row3);

		//diagonals
		var diagnonal1 = ((moves[0] === moves[4]) && (moves[4] === moves[8]) && (moves[8] === moves[0])) ? [moves[0],true] : false;
		console.log("diagnonal1: "+ diagnonal1);

		var diagonal2 = ((moves[2] === moves[4]) && (moves[4] === moves[6]) && (moves[6] === moves[2])) ? [moves[2],true] : false;
		console.log("diagonal2: "+ diagonal2);

		//columns
		var column1 = ((moves[0] === moves[3]) && (moves[3] === moves[6]) && (moves[6] === moves[0])) ? [moves[0],true] : false;
		console.log("column1: "+ column1);

		var column2 = ((moves[1] === moves[4]) && (moves[4] === moves[7]) && (moves[7] === moves[1])) ? [moves[1],true] : false;
		console.log("column2: "+ column2);

		var column3 = ((moves[2] === moves[5]) && (moves[5] === moves[8]) && (moves[2] === moves[8])) ? [moves[2],true] : false;
		console.log("column3: "+ column3);
		
		if (row1 || row2 || row3 || column1 || column2  || column3 || diagonal1  || diagonal2) {

			$('#tileMessage').hide();
			$('#reset').show();
			$('#modal' + loser).hide();
			$('#winner').text('Winner: ');
			loser = ();
			$('button').attr('disabled', true);
		}

	}

	resetBoard(){
		console.log('reload');
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
						<span id='reset'
							  onClick={this.resetBoard}>
							Reset</span>
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