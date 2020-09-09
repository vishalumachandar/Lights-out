import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {

  static defaultProps ={
    nrows:5,
    ncols:5,
    chanceLightStartsOn:0.25
  };
  state={
      hasWon:false,
      board:this.createBoard()
  };


  createBoard() {
    let board = [];
    for(let y=0;y<this.props.nrows;y++){
      let row=[];
      for(let x=0;x<this.props.ncols;x++){
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row);
    }
    return board;
  }


  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    //flipping the cell itslef
    flipCell(y,x);
    flipCell(y,x-1);//left
    flipCell(y,x+1);//right
    flipCell(y-1,x);//below
    flipCell(y+1,x);//above
    let count=0;
    for(let i=0;i<this.props.nrows;i++){
      for(let j=0;j<this.props.ncols;j++){
        if (board[i][j]===false){
          count=count+1
        }
      }
      }
      
      if(count === 25){
        this.setState({hasWon:true})
    } 
    this.setState({board:board})
  }

  


  render() {
    if(this.state.hasWon ){
      return(
        <div className="winner">
          <span className='neon-orange'>You</span>
          <span className='neon-blue'>Win</span>
        </div>
      )
    }
    
    let tblBoard=[];
    for(let y=0;y<this.props.nrows;y++){
      let row=[];
      for(let x=0;x<this.props.ncols;x++){
        let coord=`${y}-${x}`
        row.push(<Cell key={coord} isLit={this.state.board[y][x]} flipCellsAroundMe={() =>this.flipCellsAround(coord)}/>)
      }
    tblBoard.push(<tr key={y}>{row}</tr>)
    }
      return(
        <div className='Board-Title'>
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
            <table className="Board"> 
            <tbody>
              {tblBoard }
            </tbody>
          </table>
        </div>
    );
}
}


export default Board;
