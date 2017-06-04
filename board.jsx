import React from 'react';
import ReactDOM from 'react-dom';

export default class Board extends React.Component {
	constructor(){
		super();
		this.state = {
			playerTile: "X",
			computerTile: "O",
			moves: ["#","#","#","#","#","#","#","#","#"],
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
		var move = this.state.playerTile;
		$('#' + cell.target.id).html(move);
		
		var moves = this.state.moves;
		moves[cell.target.id] = move;
		this.setState({
			moves: moves,
			
		});

		$('#' + cell.target.id).attr('disabled', true);
		
		console.log(cell.target.id);
		var placesLeft = this.state.placesLeft;
		placesLeft.splice(cell.target.id, 1);
	
		console.log(placesLeft);

		// set time out
		//computer makes random move
		var computerMove = placesLeft[Math.floor(Math.random() * placesLeft.length)];
		console.log("computerMove: " + computerMove);
		

		console.log(moves);
		
    	//this.checkWinner();
	}
	/*
	checkWinner() {
		var moves = this.state.moves;
		var winner1 = (moves[0] === moves[1] ) && (moves[1] === moves[2]) ? true : false;
		
		var winner2 = (moves[0] === moves[3] ) && (moves[3] === moves[6]) ? true : false;		
		var winner3 = (moves[0] === moves[4] ) && (moves[4] === moves[8]) ? true : false;

		var winner4 = (moves[4] === moves[1] ) && (moves[1] === moves[7]) ? true : false;
		var winner5 = (moves[4] === moves[2] ) && (moves[2] === moves[6]) ? true : false;
		var winner6 = (moves[4] === moves[3] ) && (moves[3] === moves[5]) ? true : false;

		var winner7 = (moves[8] === moves[5] ) && (moves[5] === moves[2]) ? true : false;
		var winner8 = (moves[8] === moves[7] ) && (moves[7] === moves[6]) ? true : false;
		
		if (winner1 || winner2 || winner3 || winner4 || winner5 || winner6 || winner7 || winner8) {
			$('#tileMessage').hide();
			$('#reset').show();
			var loser = moves[0] === "X" ? "O" : "X";
			$('#modal' + loser).hide();
			$('#winner').text('Winner: ');
			$('button').attr('disabled', true);
			
		}

	}*/

	resetBoard(){
		console.log('reload')
	}

	render() {
		//Board 1
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
		}

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
									    onClick={this.playerMove.bind(this)}/>
								</td>
								<td style={tdStyle}>
									<button id="1"
									    style={buttonStyle}									       
									    onClick={this.playerMove.bind(this)}/>
								</td>
								<td style={tdStyle}>
									<button id="2"
									       style={buttonStyle}									       
									       onClick={this.playerMove.bind(this)}/>
								</td>
							</tr>
							<tr>
								<td style={tdStyle}>
									<button id="3"
									       style={buttonStyle}									       
									       onClick={this.playerMove.bind(this)}/>
								</td>
								<td style={tdStyle}>
									<button id="4"
									       style={buttonStyle}									       
									       onClick={this.playerMove.bind(this)}/>
								</td>
								<td style={tdStyle}>
									<button id="5"
									       style={buttonStyle}									       
									       onClick={this.playerMove.bind(this)}/>
								</td>
							</tr>
							<tr>
								<td style={tdStyle}>
									<button id="6"
									       style={buttonStyle}									       
									       onClick={this.playerMove.bind(this)}/>
								</td>
								<td style={tdStyle}>
									<button id="7"
									       style={buttonStyle}									       
									       onClick={this.playerMove.bind(this)}/>
								</td>
								<td style={tdStyle}>
									<button id="8"
									       style={buttonStyle}									       
									       onClick={this.playerMove.bind(this)}/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
};