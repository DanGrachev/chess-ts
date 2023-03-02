import React, {FC} from 'react';
import '../App.css'
import {Cell} from "../models/Cell";


interface CellComponentProps {
    cell: Cell;
    selected: boolean;
    selectCell: (cell: Cell) => void;
}

const CellComponent: FC<CellComponentProps> = ({cell, selected, selectCell}) => {
    return (
        <div className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
             style={{background: cell.isAvailable && cell.figure ? '#ff5555' : ''}}
             onClick={() => selectCell(cell)}
        >
            {(cell.isAvailable && !cell.figure) && <div className='available'></div>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt="figure"/>}
        </div>
    );
};

export default CellComponent;