import './Piece.css'

function Piece(props) {
    if (props.value != null) {
        return (
            <div className={'piece ' + props.value} /> 
        ) 
    } else {
        return (
            <div className={'piece'} />
        )
    }
}

export default Piece;