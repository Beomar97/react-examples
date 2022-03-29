import Piece from './Piece'
import './Field.css'

function Field(props) {
    return(
        <button
            className='field'
            onClick={props.onClick}
        >
            <Piece value={props.value} />
        </button>
    )
}

export default Field;