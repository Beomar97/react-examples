import React from 'react';
import './Board.css';
import Field from './Field';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: Array(42).fill(null),
            redIsNext: true,
        }
    }

    dropPiece(i) {
        const currentPlayer = this.state.redIsNext ? 'red' : 'yellow';
        const fields = this.state.fields.slice();
        const mod = i % 7;
        for (let index = 41; index >= 0; index--) {
            if (index % 7 === mod && fields[index] === null) {
                fields[index] = currentPlayer;
                break;
            }
        }
        this.setState({
            fields: fields,
            redIsNext: !this.state.redIsNext,
        })
    }

    renderCell(i) {
        return (
          <Field
            key={[i]}
            value={this.state.fields[i]}
            onClick={() => this.dropPiece(i)}
          />
        );
    }

    render() {
        return (
            <div className='container'>
                <h1>Next player is: {this.state.redIsNext ? 'red' : 'yellow'}</h1>
                <button className='button' onClick={() => this.setState({ fields: Array(42).fill(null), redIsNext: true })}>
                    Reset
                </button>
                <div className="board">
                    {[...Array(42).keys()].map((i) => this.renderCell(i))}
                </div>
            </div>
        );
    }
}

export default Board;